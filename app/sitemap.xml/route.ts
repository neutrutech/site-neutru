import { projects } from '@/lib/projects';

export async function GET() {
  const baseUrl = 'https://neutru.io';
  const staticUrls = ['/', '/projects', '/services', '/processos', '/contact'];

  const urls = staticUrls
    .map((u) => ({ loc: `${baseUrl}${u}`, lastmod: new Date().toISOString().split('T')[0] }))
    .concat(
      projects.map((p) => ({ loc: `${baseUrl}/projects/${p.slug}`, lastmod: new Date().toISOString().split('T')[0] }))
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((u) => {
        return `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
      })
      .join('\n')}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
