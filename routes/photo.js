var express = require("express");
var router = express.Router();
const fs = require("fs"),
  path = require("path"),
  os = require("os");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var photos = [];
  var road = path.resolve(__dirname, "../public/images");
  fs.readdir(road, function(err, files) {
    if (err) console.log(err);
    files.forEach(el => {
      photos.push({
        name: el,
        path: "http://localhost:3000/images/" + el
      });
    });
    res.render("photos", { title: "photos list", photos: photos });
  });
});

module.exports = router;
