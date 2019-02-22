var express = require("express");
var router = express.Router();
const ArticleModel = require("../model/article");
/* GET home page. */
router.get("/", function(req, res, next) {
  var getData = ArticleModel.findAll({
    attributes: ["id", "title", "author", "createTime"]
  });
  getData.then(data => {
    var resData = data.map(el => el.dataValues);
    console.log(resData);
    res.render("article/list", { resData });
  });
});
router.get("/:id", function(req, res, next) {
  var getData = ArticleModel.find({ where: { id: req.params.id } });
  getData.then(data => {
    console.log(data.dataValues);
    res.render("article/article", { obj: data.dataValues });
  });
});
module.exports = router;
