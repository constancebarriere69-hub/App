import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Base en /App/ uniquement pour le build de production (GitHub Pages sert
// ce repo sous https://<user>.github.io/App/) ; le serveur de dev reste à
// la racine pour ne rien changer aux habitudes locales.
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/App/' : '/',
}))
