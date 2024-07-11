import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: baseUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
