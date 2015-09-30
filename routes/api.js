/*
 * Serve JSON to our AngularJS client
 */
"use strict";

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.csrf = function (req, res) {
  //console.log("_csrf:"+JSON.stringify(req.csrfToken()));
  res.json({_csrf: req.csrfToken()});
};