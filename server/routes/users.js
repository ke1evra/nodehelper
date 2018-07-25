var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var iconv = require('iconv-lite');
// var Buffer = require('buffer');
// var Iconv  = require('iconv').Iconv();
// var iconv = new Iconv('windows-1252', 'UTF8');

let parsedData = [];


//, {encoding: "utf8"}
  let stream = fs.createReadStream("my1.csv", { encoding: 'binary' });
  let csvStream = csv
      .parse({delimiter:';'})
      .on("data", function(data){
           // console.log(data);
           parsedData.push(data);
           let dataBinary = iconv.decode(data, "binary");
           let dataWin1252 = iconv.decode(dataBinary, "win1251");
           console.log(dataWin1252);

      })
      .on("end", function(){
           console.log("done");
           // console.log(parsedData);
      });
  stream.pipe(csvStream);
  // console.log(`csvStream ${JSON.stringify(csvStream)}`);





let data = {
  name: "test",
  id: "1",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

/* GET users listing. */
router.get('/', function(req, res, next) {


  console.log(parsedData);

  res.render('test', {data: parsedData});
});
//
module.exports = router;
