import { defineConfig } from 'vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
})
