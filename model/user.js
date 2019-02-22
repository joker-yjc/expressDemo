const Sequelize = require("sequelize");
const sequelize = require("./config");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    //   不添加时间戳属性（updatedAt, createdAt）
    timestamps: false,
    // 定义表的名称
    tableName: "user"
  }
);

User.findAll().then(user => {
  user.forEach(el => {
    console.log(el.dataValues);
  });
});
