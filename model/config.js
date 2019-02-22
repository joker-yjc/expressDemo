/**
 *  使用sequelize初始化设置连接池，所以如果从单个进程连接到数据库，最好每个数据库只创建一个实例。
 *  如果要从多个进程连接到数据库，则必须为每个进程创建一个实例。
 **/

const Sequelize = require("sequelize");

const sequelize = new Sequelize("demo", "root", "201401", {
  host: "118.126.114.250",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 测试链接
sequelize
  .authenticate()
  .then(() => {
    console.log("数据库链接成功！！");
  })
  .catch(err => {
    console.err("不能连接到数据库，", err);
  });

module.exports = sequelize;
