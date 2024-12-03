import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
