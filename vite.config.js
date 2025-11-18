import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      // Disable Linux native Rollup module
      external: ['@rollup/rollup-linux-x64-gnu']
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
})
