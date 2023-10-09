import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression({ algorithm: 'brotliCompress', deleteOriginalAssets: true, skipIfLargerOrEqual: true,  })],
  server: {
    port: 3000
  },
  ssr: {
    format: 'esm',
  }
})
