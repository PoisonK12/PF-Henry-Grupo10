import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rewriteAllPlugin from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),rewriteAllPlugin()],
})
