const fs = require('fs');
const path = require('path');

// This script would normally fetch data from your database or API
// Here we'll simulate some data for demonstration purposes
const siteUrl = 'https://apollolisting.com';

function generateSitemap() {
  // In a real-world scenario, this data would come from your database or API
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/listings', changefreq: 'daily', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  ];

  // Simulate property listings
  const listings = [
    { id: '1', slug: 'modern-apartment-downtown' },
    { id: '2', slug: 'luxury-villa-beachfront' },
    { id: '3', slug: 'cozy-suburban-home' },
  ];

  // Add each listing to the sitemap
  listings.forEach(listing => {
    pages.push({
      url: `/listing/${listing.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  // Simulate blog posts
  const blogPosts = [
    { id: '1', slug: 'top-10-property-investment-tips' },
    { id: '2', slug: 'how-to-stage-your-home-for-selling' },
    { id: '3', slug: 'real-estate-market-trends-2023' },
  ];

  // Add each blog post to the sitemap
  blogPosts.forEach(post => {
    pages.push({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  // Create the XML sitemap
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add each page to the sitemap
  pages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Write the sitemap to a file
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap(); 