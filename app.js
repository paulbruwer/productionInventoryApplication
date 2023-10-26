var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// define routes
var indexRouter = require('./routes/index');
var receivingRouter = require('./routes/receiving');
var productionRouter = require('./routes/production');
var dispatchRouter = require('./routes/dispatch');
var adminRouter = require("./routes/admin");

// connect to database
const { dbConnect } = require('./utils/dbConnect');

// import middleware
const { checkJWTToken, checkReceivingPermission, checkProductionPermission, checkDispatchPermission, checkAdminPermission } = require('./routes/middelware');

var app = express();

let PORT = 8080 || process.env.PORT;

dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// define route behavior
app.use('/', indexRouter);
app.use('/receiving', checkJWTToken, checkReceivingPermission, receivingRouter);
app.use('/production', checkJWTToken, checkProductionPermission, productionRouter);
app.use('/dispatch', checkJWTToken, checkDispatchPermission, dispatchRouter);
app.use('/admin', checkJWTToken, checkAdminPermission, adminRouter);

module.exports = app;

app.listen(PORT, () => {
    console.log("Application up and running on port: " + PORT);
});