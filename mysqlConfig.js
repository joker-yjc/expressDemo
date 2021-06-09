/*
 * @Date: 2020-06-05 10:28:19
 * @LastEditors: joker_yjc
 * @LastEditTime: 2021-06-09 15:27:50
 * @Desciption:
 */
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yjc123456',
  database: 'demo',
});
connection.connect(function (err) {
  err && console.err('连结出错', err);
  console.log('数据库连接成功！');
});

connection.query('select * from flowerinfo', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(res)
    console.log(res[1]);
  }
});