#! /bin/node
const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');
const promisify = require('util').promisify;
const writeFile = promisify(fs.writeFile);

const args = minimist(process.argv.slice(2));

async function init() {
  const { query, url, name, dry } = args;
  if (!query || !url || !name) {
    return showHelp();
  }
  try {
    const resp = await fetch(url);
    const html = await resp.text();
    const $ = cheerio.load(html);
    const results = [];
    
    $(query).each( (idx, el) => {
      results.push({
        text: $(el).html()
      });
    });

    const json = JSON.stringify(results, '\n', 2);
    if (!dry) {
      await writeFile(
        path.resolve(__dirname, 'data', `${name.replace(/\s+/g, '_')}.json`),
        json
      );
      console.log(`Wrote ${name.replace(/\s+/g, '_')}.json!`);
      return;
    }

    console.log(json);
    

  } catch (error) {
    throw error;
  }


}

function showHelp() {
  console.log(`
d100 Scraper help
--url (REQUIRED) - The URL to scrape
--query (REQUIRED) - DomString Query that will get everything
--name (REQUIRED) - Name of JSON file to write
--dry - If passed in, No file will be written and the results array will be printed to the console

NOTE: The query to run will be passed to a jQuery-like parser. Each new d100 item to add needs to be in plain HTML text"

`);
}



init();