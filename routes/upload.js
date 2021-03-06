var express = require("express");
var router = express.Router();
const fs = require("fs"),
  formidable = require("formidable"),
  path = require("path");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("photos/upload", {
    title: "上传图片文件"
  });
});

router.post("/", function(req, res) {
  let newpath = path.resolve(__dirname,'../public/images')
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = newpath;
  form.parse(req, function(err, fields, files) {
    if (err) throw err;
    // console.log(fields, files);
    if (files.inputfile.name != "" && files.inputfile.size) {
      var oldPath = files.inputfile.path;
      var newPath = path.join(path.dirname(oldPath), files.inputfile.name);
      fs.rename(oldPath, newPath, err => {
        if (err) throw err;
        console.log(newPath);
        res.redirect("/photos");
      });
    } else {
      files.inputfile.forEach(el => {
        var oldPath = el.path;
        var newPath = path.join(path.dirname(oldPath), el.name);
        fs.rename(oldPath, newPath, err => {
          if (err) throw err;
          console.log(newPath);
        });
      });
      
      res.redirect("/photos");
    }
  });
});

module.exports = router;
