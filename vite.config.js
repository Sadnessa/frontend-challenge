import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/frontend-challenge/',
  build: { outDir: './docs' },
  define: {
    __VUE_PROD_DEVTOOLS__: true
  }
})
