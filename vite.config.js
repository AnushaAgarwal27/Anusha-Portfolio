import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/data/content.js'

// Fills the %TITLE% style placeholders in index.html from src/data/content.js
// so the page title and link preview stay editable in one place.
const siteMeta = () => ({
  name: 'site-meta',
  transformIndexHtml(html) {
    const base = (site.url || '').replace(/\/$/, '')
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
    return html
      .replaceAll('%TITLE%', esc(site.title))
      .replaceAll('%DESCRIPTION%', esc(site.description))
      .replaceAll('%URL%', esc(base || '/'))
      .replaceAll('%OG_IMAGE%', esc(`${base}/og.png`))
  },
})

export default defineConfig({
  plugins: [react(), siteMeta()],
})
