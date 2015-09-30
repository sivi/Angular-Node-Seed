/**
 * Module dependencies
 */
"use strict";

var fs = require('fs');
var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose'); 					// mongoose for mongodb
var favicon = require('serve-favicon');
var passport = require('passport');
var config = require('config'); // see https://github.com/lorenwest/node-config/wiki/Configuration-Files

var app = express();

/**
 * Connect DB
 */
// connect to mongoDB database on modulus.io
// Connect to mongodb
var connectDB = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  console.log("Connecting ..." + config.db);
  mongoose.connect(config.db, options);
};
connectDB();

mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', connectDB);

/**
 * Configuration
 */
// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/expressConfig')(app, passport);

// Bootstrap routes
require('./config/routesConfig')(app, passport);


module.exports = app;
