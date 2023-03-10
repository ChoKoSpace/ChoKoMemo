var createError = require('http-errors');
var express = require('express');
const ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');
var authState = require('./middlewares/authState');
var errorhandler = require('./middlewares/errorHandler');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var memoListRouter = require('./routes/memoList');
var createMemoRouter = require('./routes/createMemo');
var updateMemoRouter = require('./routes/updateMemo');

var app = express();

// view engine setup (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authState);


app.use('/', indexRouter);
app.use('/account', accountRouter)
app.use('/memo', memoListRouter);
app.use('/createMemo', createMemoRouter)
app.use('/updateMemo', updateMemoRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorhandler);

module.exports = app;