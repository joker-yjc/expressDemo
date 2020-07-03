var express = require('express');
var router = express.Router();
const fs = require('fs'),
  formidable = require('formidable'),
  path = require('path');

router.post('/', function (req, res) {
  let newpath = path.resolve(__dirname, '../public/images');
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = newpath;
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    console.log(fields, files);
    if (files.file.name != '' && files.file.size) {
      var oldPath = files.file.path;
      let newName = Date.now() + '_' + files.file.name;
      var newPath = path.join(path.dirname(oldPath), newName);
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log(newPath);
        res.send({ location: `http://localhost:3000/images/${newName}` });
      });
    } else {
      files.file.forEach((el) => {
        var oldPath = el.path;
        let newName = Date.now() + '_' + el.name;
        var newPath = path.join(path.dirname(oldPath), newName);
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
          console.log(newPath);
          // res.status(500);
          // res.end();
          res.send({ location: `http://localhost:3000/images/${newName}` });
        });
      });
    }
  });
});

module.exports = router;
