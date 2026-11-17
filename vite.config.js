import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// The base path matches the GitHub Pages project site: /<repo-name>/
export default defineConfig({
  base: '/argasus/',
  plugins: [react()],
})
