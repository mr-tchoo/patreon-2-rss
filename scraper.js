const puppeteer = require('puppeteer');
const parseArgs = require('./argParser');
const parseDateTime = require('./dateParser');
const convertToFeed = require('./feedConverter');
const sanitizeTitle = require('./titleSanitizer');
const outputFeed = require('./outputHandler');

const creatorUrl = 'https://www.patreon.com/{creator}/posts';

async function scrapePatreonPosts(creators, options) {

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

  for (const creator of creators) {

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
    feed = convertToFeed(creator, postsData);

    // Output feed
    outputFeed(creator, feed, options['output-type'])
  }

  // Close browser
  await browser.close();
}

[creators, options] = parseArgs();
scrapePatreonPosts(creators, options);