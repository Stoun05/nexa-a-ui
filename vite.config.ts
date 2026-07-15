import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

const virtualRuntimeId = 'virtual:nexa-runtime';
const resolvedVirtualRuntimeId = `\0${virtualRuntimeId}`;
const expectedRuntimeHash = 'c19470b794df83bbf0084c46909915744339bd87403163c50ee01d5cccedc055';

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
      const source = Buffer.from(encoded, 'base64').toString('utf8');
      const runtimeHash = createHash('sha256').update(source).digest('hex');

      if (runtimeHash !== expectedRuntimeHash) {
        throw new Error(`Nexa A UI runtime integrity check failed: ${runtimeHash}`);
      }

      return source;
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
