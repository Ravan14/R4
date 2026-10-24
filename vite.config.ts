import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The published site is the repository root: GitHub Pages serves it directly
// with no build configuration. So the build writes to dist/, and
// scripts/prerender.mjs emits the nine finished HTML documents plus assets/
// into the root, overwriting the hand-maintained files they replace.
//
// Media stays where it always was — at the repository root, original
// filenames, no subdirectory — because ASSET-MANIFEST.txt requires it and
// because duplicating 600 KB of images into public/ to satisfy a bundler
// would be the tail wagging the dog. publicDir is therefore off.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    // The manifest is how scripts/prerender.mjs learns the hashed JS and CSS
    // filenames without hardcoding them.
    manifest: true,
    rollupOptions: {
      input: 'app/index.html',
    },
  },
});
