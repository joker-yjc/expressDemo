var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require("./routes/users");
var photosRouter = require('./routes/photo');
var uploadRouter = require('./routes/upload');
// var articleRouter = require("./routes/article");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 输出有颜色区分的日志，以便于开发调试
app.use(logger('dev'));
// express内置的中间件，只在4.16.x可用，将请求解析成json格式
app.use(express.json());
// express内置的中间件，只在4.16.x可用，解析请求的主体
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header(
    'Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS,PATCH'
  );
  console.log(req.path);
  next();
});
// 提供./public下的静态文件
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// app.use("/users", usersRouter);
app.use('/photos', photosRouter);
app.use('/upload', uploadRouter);
// app.use("/article", articleRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
