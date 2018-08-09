var express = require('express');
var router = express.Router();
var readCsv = require('../processing/readCsv');
var explore = require('../processing/explore');
var fs = require('fs');
var colors = require('colors');

let data = readCsv('my2.csv','win1251');
let info ={};
// let data = [];
// set DEBUG=myapp:* & nodemon --ignore './config/' --exec npm start


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('обращение');
  // let data = readCsv('my2.csv','win1251');

  // console.log(data);
  fs.stat('config/csv.json', function(err, stat) {
    if(err == null) {
        console.log('File exists');
        info.headers = JSON.parse(fs.readFileSync("config/csv.json", "utf8"));
        info.props = [];
        info.mods = [];
        info.vals = [];
        // console.log(info);
        let split = (str) =>{
          var newstring = str.split("№");
          return newstring;
        }
        for (let header of info.headers){
          if (header.header == 'prop_name'){

            console.log(`Найден prop_name - ${header.name.cyan}`);
            info.props.push({
              header: header.header,
              name: split(header.name)[0]
            });
            
          }
          else if (header.header == 'prop_value'){
            console.log(`Найден prop_value - ${header.name.cyan}`);
            info.props.push({
              header: header.header,
              name: split(header.name)[0]
            });
          }
          else if (header.header == 'mod_name'){
            console.log(`Найден mod_name - ${header.name.cyan}`);
            info.props.push({
              header: header.header,
              name: split(header.name)[0]
            });
          }
          else if (header.header == 'mod_value'){
            console.log(`Найден mod_value - ${header.name.cyan}`);
            info.props.push({
              header: header.header,
              name: split(header.name)[0]
            });
          }

          if (header.header == 'unused'){
            for(let property of info.props){
              if (header.name.indexOf(property.name)!=-1){
                console.log(`Найден ${property.header.yellow} - ${header.name.cyan}`);
              }
            }


          }
          // console.log(header.header);
        }
        res.render('csv', {
          data: data,
          info: info,
          config: true
        });
    } else if(err.code == 'ENOENT') {
        console.log('file does not exist');
        info = explore(data);
        console.log(info);
        res.render('csv', {
          data: data,
          info: info,
          config: false
        });
    } else {
        console.log('Some other error: ', err.code);
    }
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
    res.redirect('/csv');


});
//



module.exports = router;
