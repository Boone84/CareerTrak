import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // other Vite config
  server: {
    proxy: {
      '/auth': 'http://localhost:3005' // replace 3000 with your Express server port
    }
  }
});

