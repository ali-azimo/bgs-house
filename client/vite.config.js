import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://bgs-house-back.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
