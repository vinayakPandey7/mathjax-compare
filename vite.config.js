import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const pages = [
  'index.html',
  'guides/index.html',
  'guides/mathjax-2-vs-3-vs-4/index.html',
  'guides/mathjax-2-to-3-migration/index.html',
  'guides/mathjax-delimiters/index.html',
  'guides/mhchem-examples/index.html',
];

const layout = () => ({
  name: 'layout',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<!--partial:(\w+)-->/g, (_, name) => readFileSync(`partials/${name}.html`, 'utf8').trim()),
  },
});

const seoFiles = (siteUrl) => ({
  name: 'seo-files',
  generateBundle() {
    const lastmod = new Date().toISOString().slice(0, 10);
    const urls = pages
      .map((file) => `  <url>\n    <loc>${siteUrl}/${file.replace(/index\.html$/, '')}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
      .join('\n');
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    });
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
});

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, process.cwd()).VITE_SITE_URL.replace(/\/$/, '');
  return {
    plugins: [react(), layout(), seoFiles(siteUrl)],
    build: {
      rollupOptions: {
        input: Object.fromEntries(pages.map((file) => [file.replace(/\W+/g, '-'), resolve(file)])),
      },
    },
  };
});
