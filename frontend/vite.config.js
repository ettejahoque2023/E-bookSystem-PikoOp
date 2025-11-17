import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // change if your backend runs on 4000/8080
        changeOrigin: true,
      },
    },
  },
})
