import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      // Astryx 0.1.5 package files are emitted with react/jsx-dev-runtime.
      // This compatibility alias keeps production builds working with React 19.
      'react/jsx-dev-runtime': fileURLToPath(
        new URL('./src/astryx-jsx-dev-runtime-shim.ts', import.meta.url),
      ),
    },
  },
});
