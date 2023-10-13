var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { dbConnect } = require('./utils/dbConnect');

var app = express();

let PORT = 8080 || process.env.PORT;

dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;

app.listen(PORT, () => {
    console.log("Application up and running on port: " + PORT);
});