// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    proxy:{
      // tudo que começar com /api será proxyado
      '/api': {
        target: 'http://localhost',  // onde sua API Laravel está rodando
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), 
        // permanece /api/login no target
      },
      // se seu endpoint de login for fora de /api, adicione também:
      // '/login': { target: 'http://localhost', changeOrigin: true },
      // '/register': { target: 'http://localhost', changeOrigin: true },
    },
  },
  build: {
    sourcemap: mode === 'development',
  },
  base: './',
  // ADICIONE esta seção para o preview do vite (opcional)
  preview: {
    host: true,
    port: 4173,
    // fallback em produção
    historyApiFallback: true,
  },
}));
