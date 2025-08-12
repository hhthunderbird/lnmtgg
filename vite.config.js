import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                },
            },
        },
    },
    server: {
        port: 3000,
        open: true,
        // ADICIONE ESTA SEÇÃO AQUI 👇
        headers: {
            'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googlesyndication.com https://*.google.com https://*.googleadservices.com https://cdn.tiny.cloud"
        }
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
    },
});
