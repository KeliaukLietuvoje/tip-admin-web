import { default as react } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import { manifestForPlugIn } from './manifest';

export default () => {
  const env = loadEnv('all', process.cwd());

  return defineConfig({
    plugins: [react(), VitePWA(manifestForPlugIn as Partial<VitePWAOptions>)],
    base: env.VITE_BASE_URL,
    server: {
      open: env.VITE_BASE_URL,
      proxy: {
        '/admin/api': {
          target: env.VITE_PROXY_TIP_ADMIN_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin\/api/, ''),
        },
        '/api': {
          target: env.VITE_PROXY_TIP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    assetsInclude: ['**/*.png'],
  });
};
