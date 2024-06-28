import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // Plugin for Vue.js support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for the src directory
    },
  },
  // server: {
  //   proxy: {
  //     '': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //     }
  //   }
  // }
});