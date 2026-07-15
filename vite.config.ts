import {readFileSync, readdirSync} from 'node:fs';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

const virtualRuntimeId = 'virtual:nexa-runtime';
const resolvedVirtualRuntimeId = `\0${virtualRuntimeId}`;

function nexaRuntimePlugin(): Plugin {
  return {
    name: 'nexa-runtime',
    resolveId(id) {
      return id === virtualRuntimeId ? resolvedVirtualRuntimeId : null;
    },
    load(id) {
      if (id !== resolvedVirtualRuntimeId) return null;

      const directory = fileURLToPath(new URL('./materialize/', import.meta.url));
      const encoded = readdirSync(directory)
        .filter((name) => name.startsWith('app-runtime.b64.part'))
        .sort()
        .map((name) => readFileSync(new URL(`./materialize/${name}`, import.meta.url), 'utf8'))
        .join('');

      return Buffer.from(encoded, 'base64').toString('utf8');
    },
  };
}

export default defineConfig({
  plugins: [react(), nexaRuntimePlugin()],
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
