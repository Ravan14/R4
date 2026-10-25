/* Verify the Instrument Grade design-token pairs that carry text, controls, or
   meaningful marks (WCAG 1.4.3 / 1.4.11). Palette: paper #FCFCFD, paper-2 /
   mist #F4F5F7, raised #FFFFFF, blueprint #F7F8FA, ink scale #0B0C0F/#191B21/
   #4E525C/#6B7079, accent #2447C9 with accent-soft #EEF1FC, the on-ink set
   (#F7F7F8/#A9AEB8/#A6B8FF) and the form-control hairline #8B919D. */
const pairs = [
  ['ink on paper', '#0B0C0F', '#FCFCFD', 4.5],
  ['ink-2 on raised', '#191B21', '#FFFFFF', 4.5],
  ['body on paper', '#4E525C', '#FCFCFD', 4.5],
  ['body on paper-2', '#4E525C', '#F4F5F7', 4.5],
  ['body on raised', '#4E525C', '#FFFFFF', 4.5],
  ['faint on paper', '#6B7079', '#FCFCFD', 4.5],
  ['faint on paper-2', '#6B7079', '#F4F5F7', 4.5],
  ['faint on raised', '#6B7079', '#FFFFFF', 4.5],
  ['accent on paper', '#2447C9', '#FCFCFD', 4.5],
  ['accent on paper-2', '#2447C9', '#F4F5F7', 4.5],
  ['accent on raised', '#2447C9', '#FFFFFF', 4.5],
  ['accent on accent-soft', '#2447C9', '#EEF1FC', 4.5],
  ['accent on blueprint', '#2447C9', '#F7F8FA', 4.5],
  ['ink on accent-soft', '#0B0C0F', '#EEF1FC', 4.5],
  ['accent-deep on paper', '#1B37A0', '#FCFCFD', 4.5],
  ['field hairline on raised', '#8B919D', '#FFFFFF', 3],
  ['accent hairline on paper', '#2447C9', '#FCFCFD', 3],
  ['on-dark on ink', '#F7F7F8', '#0B0C0F', 4.5],
  ['on-dark-mut on ink', '#A9AEB8', '#0B0C0F', 4.5],
  ['accent-on-dark on ink', '#A6B8FF', '#0B0C0F', 4.5],
  ['ink on on-dark', '#0B0C0F', '#F7F7F8', 4.5],
];

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function ratio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

let failed = 0;
for (const [name, foreground, background, minimum] of pairs) {
  const actual = ratio(foreground, background);
  const ok = actual >= minimum;
  if (!ok) failed += 1;
  console.log(`${ok ? 'ok' : 'FAIL'}  ${name.padEnd(28)} ${actual.toFixed(2)}:1 (minimum ${minimum}:1)`);
}

if (failed) {
  console.error(`\n${failed} design-token contrast pair(s) failed.`);
  process.exit(1);
}
console.log(`\n${pairs.length} design-token contrast pairs passed.`);
