import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/',
    plugins: [react()],
    build: {
        // Add these options for better Vercel compatibility
        outDir: 'dist',
        emptyOutDir: true,
    }
});
