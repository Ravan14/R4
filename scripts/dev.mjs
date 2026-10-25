/* Watch the browser build, refresh the prerendered Pages output, and serve the
 * repository root with production-style extensionless URL resolution. */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const children = new Set();
let rendering = false;
let queued = false;
let previewStarted = false;
let timer;

function run(args, capture = false) {
  const child = spawn(process.execPath, args, {
    cwd: ROOT,
    stdio: capture ? ['inherit', 'pipe', 'pipe'] : 'inherit',
  });
  children.add(child);
  child.once('exit', () => children.delete(child));
  return child;
}

const watcher = run([join(ROOT, 'node_modules/vite/bin/vite.js'), 'build', '--watch'], true);

function prerender() {
  if (rendering) {
    queued = true;
    return;
  }
  rendering = true;
  const child = run(['scripts/prerender.mjs']);
  child.once('exit', (code) => {
    rendering = false;
    if (code === 0 && !previewStarted) {
      previewStarted = true;
      run(['scripts/serve.mjs']);
    }
    if (queued) {
      queued = false;
      prerender();
    }
  });
}

watcher.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  if (!String(chunk).includes('built in')) return;
  clearTimeout(timer);
  timer = setTimeout(prerender, 100);
});
watcher.stderr.on('data', (chunk) => process.stderr.write(chunk));
watcher.once('exit', (code) => {
  if (code && code !== 0) process.exitCode = code;
});

function shutdown() {
  clearTimeout(timer);
  for (const child of children) child.kill('SIGTERM');
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
