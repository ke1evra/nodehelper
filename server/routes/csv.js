var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var iconv = require('iconv-lite');


let parsedData = [];






let stream = fs.createReadStream("my2.csv");
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
    console.log("done");
  });
stream
  .pipe(iconv.decodeStream('win1251'))
  .pipe(csvStream);

let data = {
  name: "test",
  id: "1",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

/* GET users listing. */
router.get('/', function(req, res, next) {


  console.log(parsedData);

  res.render('test', {
    data: parsedData
  });
});
//
module.exports = router;