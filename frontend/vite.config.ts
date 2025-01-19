import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/server/todo-app': {
        target: 'https://taskmanager-60036587353.development.catalystserverless.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server\/todo-app/, '/server/todo-app'),
        secure: false,
      },
    },
  },
})
