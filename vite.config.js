import { defineConfig } from 'vite';

export default defineConfig({
    base: '',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        }
    },
    server: {
        watch: {
            usePolling: true
        },
        host: true,
        strictPort: true,
        port: 5173
    },
    publicDir: 'assets'
});
