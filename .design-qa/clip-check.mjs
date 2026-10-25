/* Does the fitted subject stay inside the plate? Pure geometry, no pixels:
   the img's post-transform box, inset by its scaled padding, letterboxed to the
   intrinsic ratio, compared against the plate's border box.

     node .design-qa/clip-check.mjs [width] */
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import WebSocket from 'ws';

const W = Number(process.argv[2] || 1440);
const H = 900;
const PAGES = ['technology', 'applications', 'defence', 'civil', 'company', 'investors', 'careers', 'contact'];
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9349;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--user-data-dir=' + join(process.cwd(), '.design-qa', 'chrome-profile-clip'),
  '--no-default-browser-check', '--disable-gpu', '--force-device-scale-factor=1', 'about:blank',
], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 80 && !wsUrl; i += 1) {
  await wait(250);
  try {
    const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = l.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {}
}
const ws = new WebSocket(wsUrl);
const pending = new Map();
let id = 0;
await new Promise((r) => ws.once('open', r));
ws.on('message', (raw) => {
  const m = JSON.parse(raw.toString());
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  }
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id;
  pending.set(i, { res, rej });
  ws.send(JSON.stringify({ id: i, method, params }));
});
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
  return r.result.value;
};

await send('Page.enable');
await send('Emulation.setEmulatedMedia', {
  media: 'screen', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Runtime.enable');

const PROBE = `(() => {
  const plate = document.querySelector('.page-hero-visual');
  const img = document.querySelector('.page-hero-media');
  if (!plate || !img || getComputedStyle(plate).display === 'none') return null;
  const p = plate.getBoundingClientRect();
  const b = img.getBoundingClientRect();          // includes the variant transform
  const cs = getComputedStyle(img);
  const fit = cs.objectFit;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  // Padding is inside the transformed box, so it scales with the same factor.
  const pad = parseFloat(cs.paddingLeft) * (b.width / plate.clientWidth);
  const cwpad = parseFloat(cs.paddingTop) * (b.height / plate.clientHeight);
  const cw = b.width - pad * 2, ch = b.height - cwpad * 2;
  const scale = Math.min(cw / iw, ch / ih);       // what object-fit: contain does
  const sw = iw * scale, sh = ih * scale;
  const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
  const s = { left: cx - sw / 2, right: cx + sw / 2, top: cy - sh / 2, bottom: cy + sh / 2 };
  return {
    plate: [Math.round(p.left), Math.round(p.top), Math.round(p.right), Math.round(p.bottom)],
    subject: [Math.round(s.left), Math.round(s.top), Math.round(s.right), Math.round(s.bottom)],
    overflow: [
      Math.round(Math.max(0, p.left - s.left)), Math.round(Math.max(0, p.top - s.top)),
      Math.round(Math.max(0, s.right - p.right)), Math.round(Math.max(0, s.bottom - p.bottom)),
    ],
    fit, transform: cs.transform === 'none' ? 'none' : cs.transform.slice(0, 40),
  };
})()`;

const rows = [];
for (const page of PAGES) {
  await send('Page.navigate', { url: `http://127.0.0.1:8080/${page}` });
  await wait(900);
  const r = await evalJs(PROBE);
  rows.push([page, r]);
}

console.log(`viewport ${W}x${H}`);
let bad = 0;
for (const [page, r] of rows) {
  if (!r) { console.log(`${page.padEnd(13)} no plate`); continue; }
  const o = r.overflow;
  const total = Math.max(...o);
  if (total > 0) bad += 1;
  console.log(
    `${page.padEnd(13)} plate ${r.plate.join(',')}  subject ${r.subject.join(',')}` +
    `  clipped L${o[0]} T${o[1]} R${o[2]} B${o[3]}  ${r.transform}`,
  );
}
console.log(`\n${bad} of ${rows.length} pages clip the subject at ${W}px.`);
ws.close();
chrome.kill();
