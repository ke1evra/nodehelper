var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var iconv = require('iconv-lite');

let readCsv = (filename, encoding) => {
  let parsedData = [];
  let message = 'Пусто';

  let stream = fs.createReadStream(filename);
  let csvStream = csv
    .parse({
      delimiter: ';',
      headers: true
    })
    .on("data", function(data) {
      // console.log(data);
      parsedData.push(data);

    })
    .on("end", function() {
      console.log(`parsedData.length = ${parsedData.length}`);
      console.log("done");
    });
  stream
    .pipe(iconv.decodeStream(encoding))
    .pipe(csvStream);

  return parsedData;
};


module.exports = readCsv;
