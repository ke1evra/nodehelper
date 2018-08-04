var express = require('express');
var router = express.Router();
var readCsv = require('../processing/readCsv');
var explore = require('../processing/explore');
var fs = require('fs');

let data = readCsv('my2.csv','win1251');
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

router.get('/config/edit', function(req, res, next) {
  console.log('обращение');
  let config = {};
  config.csv = JSON.parse(fs.readFileSync("config/csv.json", "utf8"));
  config.fields = JSON.parse(fs.readFileSync("config/fields.json", "utf8"));

  let options = [{
    name: 'Не использовать',
    value: 'unused'
  }];
  for(let item of config.csv){
    let value = 'unused';
    for(let field of config.fields){
      if(item.name === field.name){
        value = field.field;
        break;
      }
    }
    if(value!='unused'){
      options.push({
        name: item.name,
        value: value
      });
    }
  }
  config.options = options;

  res.render('configcsv', {
    data: config,
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

  info.message = 'Типа создаем файл'
  res.redirect('/csv/config/edit');

});

router.post('/config/save', function(req, res, next) {

    console.log('Редактируем конфиг файл');
    // console.log(req.body);
    let data = req.body;
    let setHeaders = (data)=>{
      let r = [];
      for(let item in data){
        r.push({
          name: item,
          header: data[item]
        })
      };
      return r;
    }
    let headers = setHeaders(data);
    let json = JSON.stringify(headers, null, 4);
    fs.writeFileSync('config/csv.json', json, 'utf8');
    // console.log(r);
    res.redirect('/csv/config/edit');
  

});
//



module.exports = router;
