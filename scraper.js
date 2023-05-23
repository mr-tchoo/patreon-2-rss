const puppeteer = require('puppeteer');
const parseDateTime = require('./dateParser');
const convertToRss = require('./rssConverter');
const sanitizeTitle = require('./titleSanitizer');

const creatorUrl = 'https://www.patreon.com/{creator}/posts';
const customArgs = process.argv.slice(2);

if (customArgs.length == 0) {
  console.log("Please pass creators as command line arguments: node scraper.js creator ...");
  process.exit(0); 
}

async function scrapePatreonPosts() {

  // Launch puppeteer (in Chrome's new headless mode)
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  // Open new page
  const page = await browser.newPage();

  // Set the 'Accept-Language'-header to be served the 'en' version
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en'
  });

  for (const creator of customArgs) {

    // Navigate to the creators post page
    await page.goto(creatorUrl.replace("{creator}", creator), { waitUntil: 'networkidle0' });

    // Extract the post titles
    const postTitles = await page.$$eval('span[data-tag=post-title]', (elements) =>
      elements.map((el) => el.textContent)
    );

    // Extract the post dates
    const postDates = await page.$$eval('a[data-tag=post-published-at]', (elements) =>
      elements.map((el) => el.textContent)
    );

    // Combine post titles and post dates into an array of objects
    const postsData = postTitles.map((title, index) => ({
      title: sanitizeTitle(title),
      pubDate: parseDateTime(postDates[index])
    }));

    // Convert data to RSS feed in XML
    convertToRss(creator, postsData);
  }

  // Close browser
  await browser.close();
}

scrapePatreonPosts();