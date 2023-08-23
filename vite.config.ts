import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx({ baseUrl: '/blog' })],
  server: {
    port: 3000
  }
})
