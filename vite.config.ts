import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';

const virtualRuntimeId = 'virtual:nexa-runtime';
const resolvedVirtualRuntimeId = `\0${virtualRuntimeId}`;
const expectedRuntimeHash = '73632bd31fcae142c661ff3777c5e213e03226a703f6d9221e449172df1deb3d';

function nexaRuntimePlugin(): Plugin {
  return {
    name: 'nexa-runtime-v3',
    resolveId(id) {
      return id === virtualRuntimeId ? resolvedVirtualRuntimeId : null;
    },
    load(id) {
      if (id !== resolvedVirtualRuntimeId) return null;

      const directory = fileURLToPath(new URL('./runtime-v3/', import.meta.url));
      const source = readdirSync(directory)
        .filter((name) => name.startsWith('App.part') && name.endsWith('.tsx'))
        .sort()
        .map((name) => readFileSync(new URL(`./runtime-v3/${name}`, import.meta.url), 'utf8'))
        .join('');
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
