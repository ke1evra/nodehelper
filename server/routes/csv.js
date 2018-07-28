var express = require('express');
var router = express.Router();
var readCsv = require('../processing/readCsv');
var explore = require('../processing/explore');

let data = readCsv('my2.csv','win1251');
// let data = [];


router.use(function(req, res, next){
  getData = () => {
    console.log('123');
    return readCsv('my2.csv','win1251');

  }
  // data = getDxata();
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('обращение');
  // let data = readCsv('my2.csv','win1251');
  let info = explore(data); 
  // console.log(data);

  res.render('test', {
    data: data,
    info: info
  });
});
//
module.exports = router;
