import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    include: ['firebase/auth', 'firebase/firestore', 'firebase/app']
  }
});
