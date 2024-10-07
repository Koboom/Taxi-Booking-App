const path = require('path');
const fs = require('fs');

// URL'lerinizi buraya ekleyin
const urls = [
  { loc: '/', lastmod: '2024-08-31', changefreq: 'daily', priority: '1.0' },
  { loc: '/cv', lastmod: '2024-08-30', changefreq: 'monthly', priority: '0.8' },
  { loc: '/work', lastmod: '2024-08-29', changefreq: 'monthly', priority: '0.8' },
];

const generateSitemap = () => {
  const urlset = urls.map(url => `
    <url>
      <loc>https://yukselsoftware.de${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlset}
  </urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemap);
};

module.exports = {
  devServer: {
    host: '0.0.0.0',  // Tüm IP adreslerinden erişime izin verir
    port: 8080,        // Port numarası
    disableHostCheck: true, // Güvenlik nedeniyle bazı durumlarda gerekli olabilir
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  chainWebpack: config => {
    // Build aşamasında sitemap oluşturulacak
    config.plugin('generate-sitemap')
      .use({
        apply: (compiler) => {
          compiler.hooks.done.tap('Generate Sitemap', () => {
            generateSitemap();
          });
        }
      });
  }
};
