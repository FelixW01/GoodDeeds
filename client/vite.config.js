import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the backend
    proxy: {
      '/api': 'http://localhost:3000', 
    },
  },
  test: {
    globals: true,
    // Required for testing React components
    environment: 'jsdom',
  },
})