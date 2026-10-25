/* Minimal viewport capture: node .design-qa/shot.mjs <page> <w> <h>
   Screenshots what the viewport shows at scroll 0, into .design-qa/browser/. */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import WebSocket from 'ws';

const [, , PAGE, W, H] = process.argv;
const VIEW = { w: Number(W || 1440), h: Number(H || 900) };
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9347;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run', '--user-data-dir=' + join(process.cwd(), '.design-qa', 'chrome-profile'),
  '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu',
  '--force-device-scale-factor=1', 'about:blank',
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

await send('Page.enable');
await send('Emulation.setEmulatedMedia', {
  media: 'screen', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});
await send('Emulation.setDeviceMetricsOverride', {
  width: VIEW.w, height: VIEW.h, deviceScaleFactor: 1, mobile: VIEW.w < 500,
});
await send('Runtime.enable');
await send('Page.navigate', { url: `http://127.0.0.1:8080/${PAGE === 'index' ? '' : PAGE}` });
await wait(1200);
if (process.env.OVERRIDE) {
  await send('Runtime.evaluate', { expression: `(() => {
    const s = document.createElement('style');
    s.textContent = ${'`'}${process.env.OVERRIDE}${'`'};
    document.head.append(s);
  })()` });
  await wait(250);
}
const { data } = await send('Page.captureScreenshot', { format: 'png' });
const out = join(process.cwd(), '.design-qa', 'browser', `${PAGE}-${VIEW.w}${process.env.TAG ? '-' + process.env.TAG : ''}.png`);
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(out);
ws.close();
chrome.kill();
