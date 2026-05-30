import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Force a single instance of three so React Three Fiber's instanceof checks
  // don't break when transitive deps request a different three version.
  resolve: {
    dedupe: ['three', 'react', 'react-dom'],
  },
});
