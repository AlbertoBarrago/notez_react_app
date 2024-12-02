import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: '404.html',
                    dest: '.'
                }
            ]
        })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
