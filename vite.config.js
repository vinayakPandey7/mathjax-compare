import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const seoFiles = (siteUrl) => ({
  name: 'seo-files',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    });
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
    });
  },
});

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, process.cwd()).VITE_SITE_URL.replace(/\/$/, '');
  return { plugins: [react(), seoFiles(siteUrl)] };
});
