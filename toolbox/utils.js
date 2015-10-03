"use strict";

var http = require("http");

var statusCodeByName = {};
for ( var number in http.STATUS_CODES ) {
  statusCodeByName[http.STATUS_CODES[number]] = number;
}

exports.getStatusCodeByName = function(name){
  return statusCodeByName[name];
};

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function (errors) {
  var keys = Object.keys(errors);
  var errs = [];

  // if there is no validation error, just display a generic error
  if (!keys) {
    return ['Oops! There was an error'];
  }

  keys.forEach(function (key) {
    if (errors[key]) errs.push(errors[key].message);
  });

  return errs;
};

/**
 * Index of object within an array
 *
 * @param {Array} arr
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.indexof = function (arr, obj) {
  var index = -1; // not found initially
  var keys = Object.keys(obj);
  // filter the collection with the given criterias
  var result = arr.filter(function (doc, idx) {
    // keep a counter of matched key/value pairs
    var matched = 0;

    // loop over criteria
    for (var i = keys.length - 1; i >= 0; i--) {
      if (doc[keys[i]] === obj[keys[i]]) {
        matched++;

        // check if all the criterias are matched
        if (matched === keys.length) {
          index = idx;
          return idx;
        }
      }
    }
  });
  return index;
};

/**
 * Find object in an array of objects that matches a condition
 *
 * @param {Array} arr
 * @param {Object} obj
 * @param {Function} cb - optional
 * @return {Object}
 * @api public
 */

exports.findByParam = function (arr, obj, cb) {
  var index = exports.indexof(arr, obj);
  if (~index && typeof cb === 'function') {
    return cb(undefined, arr[index]);
  } else if (~index && !cb) {
    return arr[index];
  } else if (!~index && typeof cb === 'function') {
    return cb('not found');
  }
  // else undefined is returned
};

exports.getTimeoutPromise = function(timeoutPeriod){
  var loadPromise = new Promise(function(resolve, reject){
    setTimeout(function(err, result) {
      if (err)
        reject(err);
      else
        resolve(result);
    },timeoutPeriod);
  });
  return loadPromise;
};
