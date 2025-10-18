import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// ✅ this fixes asset and routing paths for GitHub Pages
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: '/Portfolio/', // <- this is your repo name!
})
