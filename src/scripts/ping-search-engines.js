const https = require('https');
const url = require('url');

const siteUrl = 'https://apollolisting.com';
const sitemapUrl = `${siteUrl}/sitemap.xml`;

// List of search engines to ping
const searchEngines = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  `http://www.webmaster.yandex.ru/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
];

/**
 * Ping a search engine with the sitemap URL
 * @param {string} engineUrl The URL to ping
 * @returns {Promise<void>}
 */
function pingSearchEngine(engineUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(engineUrl);
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      method: 'GET'
    };
    
    const req = https.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`Successfully pinged ${parsedUrl.hostname}`);
        resolve();
      } else {
        console.error(`Failed to ping ${parsedUrl.hostname}: Status ${res.statusCode}`);
        resolve(); // Resolve anyway to continue with other engines
      }
    });
    
    req.on('error', (error) => {
      console.error(`Error pinging ${parsedUrl.hostname}: ${error.message}`);
      resolve(); // Resolve anyway to continue with other engines
    });
    
    req.end();
  });
}

/**
 * Ping all search engines
 */
async function pingAllSearchEngines() {
  console.log('Pinging search engines with sitemap...');
  
  for (const engine of searchEngines) {
    await pingSearchEngine(engine);
  }
  
  console.log('Finished pinging all search engines.');
}

// Run the ping function
pingAllSearchEngines().catch(error => {
  console.error('Error in pingAllSearchEngines:', error);
}); 