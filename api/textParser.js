const path = require('path');
const fs = require('fs');

fs.readFile(
  path.resolve(__dirname, 'data/curse-raw.json'),
  (error, data) => {
    if (error) {
      return error;
    }

    const rawString = data.toString();
    const json = JSON.parse(rawString);

    const parsed = json.map( text => {
      return {
        text
      };
    });

    fs.writeFile(
      path.resolve(__dirname, 'data/curses.json'), 
      JSON.stringify(parsed, '\n', 2),
      (error) => {
        if (error) {
          return error;
        }
      }
    );

  }
);