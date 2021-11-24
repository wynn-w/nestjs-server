'use strict';
const fs = require('fs');
const { parse } = require('csv-parse');

async function readAndParseCSV(filePath, parseConfig) {
  const res = [];
  const parser =
      fs.createReadStream(filePath)
        .pipe(
          parse(parseConfig)
        );
  for await (const record of parser) {
    res.push(record);
    await new Promise(resolve => {
      process.nextTick(() => {
        resolve();
      });
    });
  }
  return res;
}
module.exports = {
  readAndParseCSV,
};
