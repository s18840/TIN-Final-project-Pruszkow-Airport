var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const KlientRouter = require('./routes/KlientRoute');
const planeRouter = require('./routes/planeRoute');
const ticketRouter = require('./routes/ticketRoute');
const KlientApiRouter = require('./routes/api/KlientApiRoute');
const planeApiRouter = require('./routes/api/PlaneApiRoute');
const ticketApiRouter = require('./routes/api/TicketApiRoute');



const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Klient', KlientRouter);
app.use('/plane', planeRouter);
app.use('/ticket', ticketRouter);
app.use('/api/Klients', KlientApiRouter);
app.use('/api/planes', planeApiRouter);
app.use('/api/tickets', ticketApiRouter);
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
