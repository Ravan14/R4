/*
 * scripts/measure-design.mjs — rendered evidence for the design review.
 *
 * The three complaints ("not minimalist colour", "no rich experience",
 * "scrolling is worst") are subjective, so they get answered with numbers from
 * a real browser at stated viewports: how tall each page is, how much of it is
 * each surface colour, whether any rule can animate anything on scroll, what
 * type sizes actually render, and how many sections carry no visual at all.
 *
 *   npm run serve &        # the Pages-faithful preview has to be up
 *   node scripts/measure-design.mjs
 *
 * Writes .design-qa/actual/<page>-<viewport>.png (GitHub Pages ignores
 * dot-directories, so captures can sit at the repo root without publishing)
 * and .design-qa/metrics.json.
 */

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import WebSocket from 'ws';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = process.env.ORIGIN || 'http://127.0.0.1:8080';
const ROOT = process.cwd();
const OUT = join(ROOT, '.design-qa', 'actual');
const PORT = 9333;

const PAGES = ['index', 'technology', 'applications', 'defence', 'civil', 'company', 'investors', 'careers', 'contact'];
const SIZES = [{ w: 1440, h: 900 }, { w: 390, h: 844 }];

/* Runs inside the page. Only the top-level bands of <main> are treated as
 * colour sections, which is exactly the unit a reader perceives while
 * scrolling, so the paint share is honest rather than element-counted. */
const MEASURE = () => {
  const cs = (el) => getComputedStyle(el);
  const main = document.querySelector('main');
  const bands = [...document.querySelectorAll('body > header, body > footer')].concat(
    main ? [...main.children] : [],
  );
  const rows = bands.map((b) => {
    const s = cs(b);
    const rect = b.getBoundingClientRect();
    return {
      tag: b.tagName.toLowerCase(),
      id: b.id || null,
      cls: (b.className || '').toString().slice(0, 44) || null,
      h: Math.round(rect.height),
      padTop: s.paddingTop,
      padBottom: s.paddingBottom,
      bg: s.backgroundColor,
      visuals: b.querySelectorAll('img,svg,canvas,video,iframe').length,
      textLen: (b.innerText || '').replace(/\s+/g, ' ').trim().length,
    };
  });
  const sections = rows.filter((r) => r.tag === 'section' || /section/.test(r.cls || '') || r.id);
  const totalH = sections.reduce((n, r) => n + r.h, 0) || 1;
  const share = {};
  for (const r of sections) share[r.bg] = (share[r.bg] || 0) + r.h;
  for (const k in share) share[k] = Math.round((100 * share[k]) / totalH) + '%';

  const sizes = [...new Set(
    [...document.querySelectorAll('h1,h2,h3,p,a,td,th,li,span,strong,button')]
      .map((e) => Math.round(parseFloat(cs(e).fontSize) * 10) / 10),
  )].sort((a, b) => a - b);

  let keyframes = 0;
  let revealRules = 0;
  let transitionRules = 0;
  let scrollSnap = 0;
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      if (rule.type === CSSRule.KEYFRAMES_RULE) keyframes += 1;
      const t = rule.cssText || '';
      if (/\.reveal/.test(t)) revealRules += 1;
      if (/transition\s*:/.test(t)) transitionRules += 1;
      if (/scroll-snap|animation-timeline/.test(t)) scrollSnap += 1;
    }
  }

  const animated = [...document.querySelectorAll('*')].filter((e) => {
    const a = cs(e).animationName;
    return a && a !== 'none';
  }).length;
  const sticky = [...new Set(
    [...document.querySelectorAll('*')]
      .filter((e) => ['sticky', 'fixed'].includes(cs(e).position))
      .map((e) => (e.className || e.tagName).toString().split(/\s+/).slice(0, 2).join('.')),
  )];

  return {
    page: location.pathname,
    viewport: [innerWidth, innerHeight],
    pageHeight: document.scrollingElement.scrollHeight,
    screens: Math.round((10 * document.scrollingElement.scrollHeight) / innerHeight) / 10,
    sectionCount: sections.length,
    maxSectionH: sections.length ? Math.max(...sections.map((r) => r.h)) : 0,
    paintShare: share,
    sections: rows,
    fontSizes: sizes,
    imgsTotal: document.querySelectorAll('img').length,
    animated,
    sticky,
    css: { keyframes, revealRules, transitionRules, scrollSnap },
    scrollProgressEl: !!document.querySelector('[class*="progress"],[id*="progress"]'),
    h1Count: document.querySelectorAll('h1').length,
  };
};

async function targetList() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  return res.json();
}

function session(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const onOpen = new Promise((res) => ws.once('open', res));
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg);
    pending.delete(msg.id);
  });
  const send = async (method, params = {}, sessionId) => {
    await onOpen;
    const mid = ++id;
    const done = new Promise((res) => pending.set(mid, res));
    ws.send(JSON.stringify(sessionId ? { id: mid, method, params, sessionId } : { id: mid, method, params }));
    const out = await done;
    if (out.error) throw new Error(`${method}: ${out.error.message}`);
    return out.result;
  };
  return { send };
}

if (!existsSync(CHROME)) {
  console.error(`chrome not found at ${CHROME} — set CHROME=/path/to/chrome`);
  process.exit(2);
}

mkdirSync(OUT, { recursive: true });
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--disable-gpu', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const results = {};

try {
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i += 1) {
    try {
      const list = await targetList();
      const page = list.find((t) => t.type === 'page');
      if (page) wsUrl = page.webSocketDebuggerUrl;
    } catch { await wait(250); continue; }
    if (!wsUrl) await wait(250);
  }
  if (!wsUrl) throw new Error('chrome did not expose a CDP endpoint');

  const { send } = session(wsUrl);
  for (const size of SIZES) {
    const label = `${size.w}x${size.h}`;
    results[label] = [];
    for (const key of PAGES) {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      await send('Emulation.setDeviceMetricsOverride', {
        width: size.w, height: size.h, deviceScaleFactor: 1, mobile: false,
      }, sessionId);
      /* Full-page captures must not freeze off-screen reveals mid-transition. */
      await send('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
      }, sessionId);
      await send('Page.navigate', { url: `${ORIGIN}/${key === 'index' ? '' : key}` }, sessionId);
      await wait(1200);
      /* Step through the document once so `loading="lazy"` photographs are
         fetched before the full-page capture, then return to the top. */
      await send('Runtime.evaluate', {
        expression: `(async () => {
          const step = innerHeight * 0.8;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            scrollTo({ top: y, behavior: 'instant' });
            await new Promise((r) => setTimeout(r, 90));
          }
          scrollTo({ top: 0, behavior: 'instant' });
          await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
        })()`,
        awaitPromise: true,
      }, sessionId);
      await wait(400);
      const ev = await send('Runtime.evaluate', {
        expression: `(${MEASURE.toString()})()`, returnByValue: true,
      }, sessionId);
      if (ev.exceptionDetails) throw new Error(`${key}: ${ev.exceptionDetails.text}`);
      const value = ev.result.value;
      results[label].push(value);
      const shot = await send('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true, optimizeForSpeed: true,
      }, sessionId);
      writeFileSync(join(OUT, `${key}-${label}.png`), Buffer.from(shot.data, 'base64'));
      await send('Target.closeTarget', { targetId });
      console.log(
        `${label}  ${key.padEnd(13)} ${String(value.pageHeight).padStart(6)}px  ` +
        `${value.screens} screens  max section ${value.maxSectionH}px  ` +
        `${value.css.keyframes} keyframes  ${value.animated} animated`,
      );
    }
  }
  writeFileSync(join(ROOT, '.design-qa', 'metrics.json'), JSON.stringify(results, null, 2));
  console.log(`\nartifacts: .design-qa/actual/*.png and .design-qa/metrics.json`);
} finally {
  chrome.kill();
}
