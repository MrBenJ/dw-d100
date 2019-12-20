const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const promisify = require('util').promisify;
const express = require('express');

const readDir = promisify(fs.readdir);
const router = express.Router();
const hash = crypto.createHash('sha256');

hash.on('readable', () => {
  const data = hash.data;
  console.log(data.toString('hex'));
});

async function getNumberFromSeed(seed) {
  
}

async function getTypes() {
  const types = await readDir(
    path.resolve(__dirname, 'data')
  );
  return types.map( name => name.split('.')[0] );
}

async function getDataForType(type) {
  const data = require(`./data/${type}.json`);
  return data;
}

router.get('/generate/:type', async (req, res) => {
  const { type } = req.params;
  let { seed } = req.query;
  if (seed && !isNaN(+seed)) {
    // TODO: If not a number, use this string to generate a number
    seed = undefined;
  }

  if (!type) {
    res.status(400).send({
      error: ':type parameter invalid.'
    });
    return;
  }

  const types = await getTypes();
  if (!types.includes(type)) {
    res.status(400).send({
      error: `:type ${type} does not exist.`
    });
  }

  const data = await getDataForType(type);
  const result = data[
    Math.floor(Math.random() * data.length)
  ];
  // TODO: Implement Seed
  
  res.status(200).send(result);

});
module.exports = router;
