import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permet d'accéder au serveur à partir d'autres appareils sur le réseau
    port: 3000, // Spécifiez le port sur lequel votre app sera servie
  },
});
