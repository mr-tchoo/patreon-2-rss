# patreon-2-rss 

Scrapes patreon.com creators using puppeteer and converts posts into a RSS feed which can be imported into readers such as [RSS Guard](https://github.com/martinrotter/rssguard/).

## Requirements

- [Node.js](https://nodejs.org/en)

## Usage

1. `npm install`

2. `node scraper creator [creator] [output-type=xml,stdout]`

The script will scrape the creators `/posts` page and dump the information into a `creator.xml` file in RSS 2.0 format. 

`creator` will be replaced by the command line argument passed to the script. If multiple arguments were specified, multiple files will be created.

## RSS Guard Usage

I recommend symlinking the folder to which you cloned this repo (e.g. `patreon-2-rss`) to a `scripts` folder in the RSS Guard [%data%](https://github.com/martinrotter/rssguard/blob/master/resources/docs/Documentation.md#userd) directory, which you will have to create yourself.

There are two ways of using the script for RSS Guard:

1. **Generate and import .xml files** *1
    - On Windows: 
        1. `node '%data%\scripts\patreon-2-rss\scraper' creator [creator]` (Task scheduler) 
        2. `powershell "cat '%data%\scripts\patreon-2-rss\creator.xml'"` (RSS Guard)
<br/><br/>
2. **Use script output** *2
    - On Windows: `node "%data%\scripts\patreon-2-rss\scraper" creator --output-type=stdout` (RSS Guard)

<br/><br/>

*1 **Do this if you have MANY creators you want to check on.** Specify which creator you want to import, by replacing `creator` in `creator.xml` according to the file the script generated. Use a Task scheduler of your choice, e.g. Windows Task Scheduler (Windows), Cron (Linux), etc. 

*2 **Do this if you have a FEW creators you want to check on.** I do not recommend this if you have lots of creators you want to check on, since the script is creating a browser instance for each feed/creator and it may take a long time for the whole process to finish.