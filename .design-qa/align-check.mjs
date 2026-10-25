/* Alignment audit: does every page put its content on the same vertical grid?
   Compares the left edge of the header brand, the hero headline, the body
   sections and the footer, plus the right edge of the hero plate against the
   section edge. Also flags any hero plate sitting on top of hero text.
   Throwaway tooling - lives with the captures, not the build. */
import { spawn } from 'node:child_process';
import WebSocket from 'ws';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = 'http://127.0.0.1:8080';
const PORT = 9345;
const PAGES = ['index', 'technology', 'applications', 'defence', 'civil', 'company', 'investors', 'careers', 'contact', '404'];
const VIEWS = [{ w: 1920, h: 1000 }, { w: 1440, h: 900 }, { w: 1080, h: 900 }, { w: 390, h: 844 }];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function session(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const onOpen = new Promise((res) => ws.once('open', res));
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  return { send, onOpen, close: () => ws.close() };
}

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu',
  '--force-device-scale-factor=1', 'about:blank',
], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 80 && !wsUrl; i += 1) {
  await wait(250);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) throw new Error('no CDP endpoint');
const { send, onOpen, close } = session(wsUrl);
await onOpen;
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', {
  media: 'screen', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});

const MEASURE = `(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left), right: Math.round(r.right), y: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width) };
  };
  const pad = (el) => parseFloat(getComputedStyle(el).paddingLeft) || 0;
  const containers = [...document.querySelectorAll('main .container, footer .container')]
    .filter((el) => !el.closest('.home-hero'));
  const sections = containers
    .map((el) => Math.round(el.getBoundingClientRect().left + pad(el)));
  const shown = (sel) => { const b = box(sel); return b && b.w ? b : null; };
  const plate = shown('.page-hero-visual') || shown('.home-hero .hero-poster');
  const h1 = box('.hero-copy h1') || box('.home-hero h1') || box('main h1');
  const copyEdge = (() => {
    const el = document.querySelector('.hero-copy > *, .home-hero .container > *');
    return el ? Math.round(el.getBoundingClientRect().left) : null;
  })();
  const overlap = plate && h1
    ? !(plate.x + plate.w <= h1.x || h1.x + h1.w <= plate.x
        || plate.y + plate.h <= h1.y || h1.y + h1.h <= plate.y)
    : false;
  return {
    vw: innerWidth,
    brand: box('header .brand') || box('header a'),
    nav: box('header nav'),
    h1,
    plate,
    overlap,
    heroCopy: box('.hero-copy') || box('.home-hero .container'),
    copyEdge,
    sectionLeft: sections.length ? Math.min(...sections) : null,
    sectionRight: (() => {
      const rs = containers
        .filter((el) => el.closest('main'))
        .map((el) => Math.round(el.getBoundingClientRect().right - pad(el)));
      return rs.length ? Math.min(...rs) : null;
    })(),
    cta: box('.cta-panel'),
    footer: box('footer .container') && (() => {
      const el = document.querySelector('footer .container');
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + pad(el)), right: Math.round(r.right - pad(el)) };
    })(),
  };
})()`;

const fmt = (v) => (v === null || v === undefined ? '   -  ' : String(v).padStart(5));
const rows = [];
for (const view of VIEWS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: view.w, height: view.h, deviceScaleFactor: 1, mobile: view.w < 500,
  });
  for (const page of PAGES) {
    await send('Page.navigate', { url: `${ORIGIN}/${page === 'index' ? '' : page}` });
    await wait(700);
    const { result } = await send('Runtime.evaluate', { expression: MEASURE, returnByValue: true });
    rows.push({ view: `${view.w}`, page, ...result.value });
  }
}

console.log('page          vw   brand  h1    sectL  sectR  plateR  footL  overlap');
let bad = 0;
for (const r of rows) {
  const brand = r.brand?.x ?? null;
  const sectL = r.sectionLeft;
  const drift = [r.copyEdge, sectL, r.footer?.x, r.cta?.x ?? sectL].filter((v) => v !== null && v !== undefined);
  const spread = drift.length ? Math.max(...drift) - Math.min(...drift) : 0;
  const plateMiss = r.plate && r.sectionRight !== null && r.view !== '390'
    ? r.plate.right - r.sectionRight : 0;
  if (spread > 2 || r.overlap || Math.abs(plateMiss) > 2) bad += 1;
  console.log(
    r.page.padEnd(13),
    fmt(r.vw), fmt(brand), fmt(r.copyEdge), fmt(sectL), fmt(r.sectionRight),
    fmt(r.plate?.right), fmt(r.footer?.x),
    `${r.overlap ? 'OVERLAP' : 'no'}${plateMiss ? `  plateΔ${plateMiss > 0 ? '+' : ''}${plateMiss}` : ''}${spread > 2 ? `  spread=${spread}` : ''}`,
  );
}
console.log(`\n${bad} page/viewport combinations off the grid.`);

close();
chrome.kill();
