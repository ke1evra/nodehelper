var express = require('express');
var router = express.Router();
var readCsv = require('../processing/readCsv');
var explore = require('../processing/explore');
var fs = require('fs');

let data = readCsv('my1.csv','win1251');
let info ={};
// let data = [];


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('обращение');
  // let data = readCsv('my2.csv','win1251');
  info = explore(data);
  // console.log(data);

  res.render('csv', {
    data: data,
    info: info
  });
});

router.get('/', function(req, res, next) {
  console.log('обращение');
  // let data = readCsv('my2.csv','win1251');
  info = explore(data);
  // console.log(data);

  res.render('csv', {
    data: data,
    info: info
  });
});

router.post('/config/create', function(req, res, next) {
  console.log('создаем конфиг файл');
  let getHeaders = (data)=>{
    let r = [];
    for(let header in data[0]){
      r.push({
        name: header,
      });
    }
    return r;
  }
  let headers = getHeaders(data);
  let json = JSON.stringify(headers, null, 4);
  fs.writeFileSync('config/csv.json', json, 'utf8');


  // let data = readCsv('my2.csv','win1251');
  info.message = 'Типа создаем файл'
  res.redirect('/confi/edit');
  // res.render('csv', {
  //   data: data,
  //   info: info
  // });
});
//
module.exports = router;
