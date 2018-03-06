var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',function(req,res){
      // parse a file upload
      var form = new formidable.IncomingForm();

      form.parse(req, function(err, fields, files) {
          console.log('===========');
          console.log(fields);
          console.log(files);
          fs.writeFile(path.join(__dirname,'../out/out.jpg'), files.picture, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
          });
      });

});

module.exports = router;
