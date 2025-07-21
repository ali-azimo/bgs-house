import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'localhost:4000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
