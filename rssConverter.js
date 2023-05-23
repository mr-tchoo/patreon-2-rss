const fs = require('fs');

function convertToRss(creator, posts) {
  // Create an RSS feed object
  const rssFeed = {
    title: `${creator}'s Patreon feed`,
    description: `This is the Patreon feed of creator ${creator}`,
    items: posts
  };
  
  // Construct the RSS XML string
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${rssFeed.title}</title>
      <description>${rssFeed.description}</description>
      ${rssFeed.items
        .map(
          item => `
        <item>
          <title>${item.title}</title>
          <pubDate>${item.pubDate}</pubDate>
        </item>`
        )
        .join('')}
    </channel>
  </rss>`;
  
  // Write the XML to a file
  fs.writeFile(`${creator}.xml`, xml, err => {
    if (err) {
      console.error('Error writing RSS feed:', err);
    } else {
      console.log('RSS feed written successfully!');
    }
  });
}

module.exports = convertToRss;