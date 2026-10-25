/* Throwaway QA harness: drives the served site in headless Chrome and writes
   interaction screenshots + assertions into .design-qa/browser/. Not part of
   the build — delete with the .design-qa folder. */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import WebSocket from 'ws';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = 'http://127.0.0.1:8080';
const OUT = join(process.cwd(), '.design-qa', 'browser');
const PORT = 9344;
mkdirSync(OUT, { recursive: true });

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
  const send = (method, params = {}) => {
    const mid = ++id;
    return new Promise((resolve, reject) => {
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  };
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
    const page = list.find((t) => t.type === 'page');
    if (page) wsUrl = page.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) throw new Error('no CDP endpoint');
const { send, onOpen, close } = session(wsUrl);
await onOpen;
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});

async function viewport(w, h) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: h, deviceScaleFactor: 1, mobile: w < 700,
  });
}
async function go(path) {
  await send('Page.navigate', { url: ORIGIN + path });
  await wait(900);
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto'`);
}
async function evaluate(expression) {
  const { result } = await send('Runtime.evaluate', {
    expression, awaitPromise: true, returnByValue: true,
  });
  if (result.subtype === 'error') throw new Error(result.description);
  return result.value;
}
async function shot(name) {
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(data, 'base64'));
  return join(OUT, `${name}.png`);
}

const report = [];
const note = (label, value) => report.push(`${label}: ${value}`);

/* 1 — desktop hero */
await viewport(1440, 900);
await go('/');
await wait(400);
note('desktop hero shot', await shot('01-home-hero-1440'));
note('home hero poster loaded', await evaluate(`(() => {
  const img = document.querySelector('.hero-poster');
  return img.complete && img.naturalWidth > 0 ? 'yes ' + img.naturalWidth : 'NO';
})()`));

/* 2 — mission story: sticky panel + lazy photograph */
await evaluate(`window.scrollTo({ top: document.querySelector('.mission-story-section').offsetTop + 600, behavior: 'instant' })`);
await wait(1200);
note('mission story shot', await shot('02-home-mission-1440'));
note('sticky panel top while scrolled', await evaluate(`(() => {
  const el = document.querySelector('.mission-stage-wrap');
  return Math.round(el.getBoundingClientRect().top);
})()`));
note('mission photo loaded', await evaluate(`(() => {
  const img = document.querySelector('.mission-story-step .media-frame img');
  return img.complete && img.naturalWidth > 0 ? 'yes ' + img.naturalWidth : 'NO';
})()`));

/* 3 — desktop dropdown */
await evaluate('window.scrollTo(0,0)');
await wait(300);
await evaluate(`document.querySelector('[data-dropdown-toggle]').click()`);
await wait(500);
note('dropdown shot', await shot('03-nav-dropdown-1440'));
note('dropdown rect', await evaluate(`(() => {
  const r = document.querySelector('.dropdown-menu').getBoundingClientRect();
  return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)].join(' x ');
})()`));
await evaluate(`document.querySelector('[data-dropdown-toggle]').click()`);

/* 4 — careers explorer row selection */
await go('/careers');
await evaluate(`(() => {
  const rows = document.querySelectorAll('.explorer-select');
  rows[2].scrollIntoView({ block: 'center', behavior: 'instant' });
  rows[2].click();
})()`);
await wait(900);
note('explorer shot', await shot('04-careers-explorer-1440'));
note('explorer selection', await evaluate(`(() => {
  const rows = [...document.querySelectorAll('.explorer-select')];
  const idx = rows.findIndex((r) => r.getAttribute('aria-selected') === 'true');
  const panel = document.querySelector('.explorer-panel:not([hidden])');
  return 'selected=' + idx + ' panel=' + (panel ? panel.id : 'none') + ' rail=' +
    getComputedStyle(rows[idx]).boxShadow;
})()`));

/* 5 — civil dossier disclosure */
await go('/civil');
await evaluate(`(() => {
  const rows = document.querySelectorAll('.disclosure-record');
  rows[1].scrollIntoView({ block: 'center', behavior: 'instant' });
  rows[1].querySelector('summary').click();
})()`);
await wait(900);
note('dossier shot', await shot('05-civil-dossier-1440'));
note('dossier open rows', await evaluate(`[...document.querySelectorAll('.disclosure-record')]
  .map((d, i) => (d.open ? i : null)).filter((v) => v !== null).join(',')`));

/* 6 — keyboard focus */
await go('/technology');
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
for (let i = 0; i < 4; i += 1) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
}
await wait(300);
note('focus shot', await shot('06-focus-1440'));
note('focused element', await evaluate(`(() => {
  const el = document.activeElement;
  const cs = getComputedStyle(el);
  return (el.textContent || el.tagName).trim().slice(0, 30) + ' | outline=' + cs.outlineStyle + ' ' +
    cs.outlineWidth + ' ' + cs.outlineColor;
})()`));

/* 7 — mobile home + menu + submenu */
await viewport(390, 844);
await go('/');
await wait(500);
note('mobile hero shot', await shot('07-home-390'));
note('mobile hero image top', await evaluate(`Math.round(document.querySelector('.hero-poster').getBoundingClientRect().top)`));
await evaluate(`document.querySelector('[data-menu-toggle]').click()`);
await wait(400);
await evaluate(`document.querySelector('[data-dropdown-toggle]').click()`);
await wait(500);
note('mobile menu shot', await shot('08-mobile-menu-390'));
note('mobile submenu rect', await evaluate(`(() => {
  const r = document.querySelector('.nav-dropdown.open .dropdown-menu').getBoundingClientRect();
  return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)].join(' x ');
})()`));
note('mobile page overflow', await evaluate(`document.documentElement.scrollWidth + ' vs 390'`));

/* 8 — mobile contact form */
await go('/contact');
await evaluate(`document.querySelector('.contact-form').scrollIntoView({ block: 'center', behavior: 'instant' })`);
await wait(700);
note('mobile form shot', await shot('09-contact-390'));
note('mobile form overflow', await evaluate(`document.documentElement.scrollWidth + ' vs 390'`));

/* 9 — mobile sticky mission panel (stacked layout) */
await go('/');
await evaluate(`window.scrollTo({ top: document.querySelector('.mission-story-section').offsetTop + 400, behavior: 'instant' })`);
await wait(900);
note('mobile mission shot', await shot('10-home-mission-390'));

/* 10 — search field + 404 + chrome details */
await viewport(1440, 900);
await go('/404.html');
note('404 shot', await shot('11-404-1440'));
note('404 numeral size', await evaluate(`getComputedStyle(document.querySelector('h1')).fontSize`));

await go('/company');
await evaluate(`document.querySelector('[data-search-input]').scrollIntoView({ block: 'center', behavior: 'instant' })`);
await evaluate(`(() => {
  const input = document.querySelector('[data-search-input]');
  input.focus();
  input.value = 'fire';
  input.dispatchEvent(new Event('input', { bubbles: true }));
})()`);
await wait(600);
note('faq search shot', await shot('12-company-search-1440'));
note('faq visible after search', await evaluate(`[...document.querySelectorAll('[data-search-list] > details')]
  .filter((d) => !d.hidden).map((d) => d.querySelector('summary').textContent.trim().slice(0, 28)).join(' | ')`));

await go('/');
note('progress bar', await evaluate(`(() => {
  const el = document.querySelector('.reading-progress');
  const cs = getComputedStyle(el);
  return cs.height + ' ' + cs.backgroundColor;
})()`));
note('back to top size', await evaluate(`(() => {
  const r = document.querySelector('.back-to-top').getBoundingClientRect();
  return Math.round(r.width) + 'x' + Math.round(r.height);
})()`));

console.log(report.join('\n'));
close();
chrome.kill();
process.exit(0);
