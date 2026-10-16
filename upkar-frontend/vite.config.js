import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static landing page in public/landing-pages; without this the SPA fallback serves the React app.
const landingPages = () => {
  const rewrite = (req, _res, next) => {
    const [path, query] = req.url.split('?')
    if (path === '/landing-pages' || path === '/landing-pages/') {
      req.url = '/landing-pages/index.html' + (query ? `?${query}` : '')
    }
    next()
  }

  return {
    name: 'landing-pages',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [landingPages(), react()],
})
