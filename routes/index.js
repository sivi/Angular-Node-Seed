/*
 * GET home page.
 */
"use strict";

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.partialsSubfolder = function (req, res) {
  var name = req.params.name;
  var subfolder = req.params.subfolder;
  res.render('partials/' + subfolder + '/' + name);
};