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
      var newPath = path.join(path.dirname(oldPath), files.file.name);
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log(newPath);
        res.send({ data: `localhost:3000/images/${files.file.name}` });
      });
    } else {
      files.file.forEach((el) => {
        var oldPath = el.path;
        var newPath = path.join(path.dirname(oldPath), el.name);
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
          console.log(newPath);
          res.send({ data: `localhost:3000/images/${el.name}` });
        });
      });
    }
  });
});

module.exports = router;
