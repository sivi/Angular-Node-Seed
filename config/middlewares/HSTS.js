/**
 * Created by a on 9/19/2015.
 */
// Force using Strict-Transport-Security
"use strict";
module.exports = function hsts(req, res, next) {
  res.setHeader("Strict-Transport-Security", "max-age=31536000");
  next();
};
