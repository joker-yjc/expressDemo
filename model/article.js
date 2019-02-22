const Sequelize = require("sequelize");
const sequelize = require("./config");

const Article = sequelize.define(
  "article",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.TEXT
    },
    author: {
      type: Sequelize.STRING
    },
    createTime: Sequelize.STRING,
    content: Sequelize.TEXT
  },
  {
    //   不添加时间戳属性（updatedAt, createdAt）
    timestamps: false,
    // 定义表的名称
    tableName: "article"
  }
);

// Article.getById = function(id) {
//   return Article.findOne({
//     where: { id }
//   });
// };

// Article.getAll = function(obj) {
//   if (obj) {
//     if (obj.page <= 0) obj.page = 1;
//     return Article.findAndCountAll({
//       offset: (obj.page - 1) * obj.pageSize || 0,
//       limit: obj.pageSize || 10,
//       attributes: ["id", "author", "title", "createTime"]
//     });
//   } else {
//     return Article.findAndCountAll({
//       attributes: ["id", "author", "title", "createTime"]
//     });
//   }
// };

// Article.addOne = function(obj) {
//   return Article.create(obj);
// };
module.exports = Article;
