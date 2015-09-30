/**
 * Module dependencies.
 */
"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../toolbox/utils');
require('./model/sequenceModel');

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

/**
 * Create user
 */

exports.create = function (req, res) {
  //console.error("user create AA "+JSON.stringify(req.body.user));
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  var saveTask = function(user){
    var promise = new Promise(function(resolve, reject){
      // insert userid from counter
      mongoose.model('CounterModel').getIdPromise(User.userIdCounter())
        .then(function(result){
          user.userid = result;
          user.save(function (err) {
            //console.log("saveUser --" + JSON.stringify(user));
            if (err)
              reject(err);
            else
              resolve(user.userid);
          });
        })
        .catch(function(err){
          console.err("counter FAILED --" + JSON.stringify(err));
          reject(err);
        });
    });
    return promise;
  };

  var user = new User(req.body.user);
  user.provider = 'local';
  saveTask(user)
    .then(function(result){
      //console.log("saveTask --" + JSON.stringify(user) + " id " + result );
      res.json({
        userid: result,
        result: "OK",
        errors: null});
    })
    .catch(function(err){
      console.log("saveTask FAILED" + JSON.stringify(err ));
      res.json({
        result: "FAILED",
        errors: utils.errors(err.errors)
      });
    });
};

exports.updateUser = function(req, res){
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  var loadTask = function(id){
    var promise = new Promise(function(resolve, reject){
      var options = {
        criteria: { userid : id },
        select: 'userid firstname lastname email username'
      };
      User.load(options, function (err, user) {
        if (err)
          reject(err);
        else
        if (!user)
          reject('Failed to load User ' + id);
        else
        resolve(user);
      });
    });
    return promise;
  };
  var userUpdate = req.body.user;
  var updateResult = {
    result: 'OK',
    errors: ''
  };

  var userId = req.body.userIid || req.params.userId || req.query.userId;

  loadTask(userId)
    .then(function(user){
      if(userUpdate.username)
        user.username = userUpdate.username;
      if(userUpdate.email)
        user.email = userUpdate.email;
      user.firstname = userUpdate.firstname;
      user.lastname = userUpdate.lastname;
      if(userUpdate.password)
        user.password = userUpdate.password;
      user.save(function(err){
        if(err){
          updateResult.result = 'FAILED';
          updateResult.errors = utils.errors(err);
        }
      });
    })
    .catch(function(err){
      updateResult.result = 'FAILED';
      updateResult.errors = utils.errors(err);
    });
  res.json({updateResult:updateResult});
};

exports.getUser = function(req, res){
  var result = 'OK';
  var errors = '';
  var userId = req.body.userIid || req.params.userId || req.query.userId;

  var options = {
    criteria: { userid : userId },
    select: 'userid firstname lastname email username'
  };
  User.load(options, function (err, user) {
    if (err || !user){
      result = 'FAILED';
      if(err)
        errors = utils.errors(err);
      if (!user){
        errors = 'Failed to load User ' + req.body.userid;
      }
      res.json({result:result, errors:errors});
    }
    else
      res.json({result:result, user:user});
  });
};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  var result = {
    result: "OK",
    errors: null
  };
  res.json(result);
};

exports.loginFail = function (req, res) {
  console.error("loginFail " + JSON.stringify(req.session.messages));
  req.logout();
  var result = {
    result: "FAIL",
    errors: req.session.messages[0]
  };
  res.json(result);
};

/**
 * Session
 */

exports.loginLocal = function (req, res) {
  var options = {
    criteria: { username : req.body.username },
    select: 'userid firstname lastname email username'
  };
  User.load(options, function (err, user) {
    if (err)
      res.json({
        result: 'FAIL',
        errors: utils.errors(err)});
    else
    if (!user)
      res.json({
        result: 'FAIL',
        errors: 'Failed to load User ' + req.body.username});
    else{
      req.profile = user;
      res.json({
        result: 'OK',
        userid: user.userid});
    }
  });
};

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
