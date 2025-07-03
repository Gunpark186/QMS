import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const PORT = 3000;

  const isDev = mode === 'development';

  return {
    server: {
  open: true,
  port: PORT,
  host: true,
  watch: {
    usePolling: true,       // 👈 Add this line
    interval: 100           // 👈 Optional: how often to poll (ms)
  }
},
    build: {
      chunkSizeWarningLimit: 1600,
      outDir: 'dist'
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: {
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs'
      }
    },
    
    base:  '/free/pages/login' ,
    plugins: [react(), jsconfigPaths()]
  };
});
