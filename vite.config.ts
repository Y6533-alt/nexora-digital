import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative asset paths work both on a GitHub Pages subpath and on a custom domain
  base: './',
  plugins: [react(), tailwindcss()],
})
