var express = require('express');
var router = express.Router();
var readCsv = require('../processing/readCsv');

let data = readCsv('my2.csv','win1251');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('обращение');


  console.log(data);

  res.render('test', {
    data: data
  });
});
//
module.exports = router;
