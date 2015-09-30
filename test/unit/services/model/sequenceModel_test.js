/**
 * Created by a on 9/15/2015.
 */
'use strict';

var mongoose = require('mongoose');
require('../../../../services/model/sequenceModel');
// development auxiliary
var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
console.log("Connecting ..." + testDBUrl);
mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io

var sequenceModel = mongoose.model('CounterModel');

var id;

var checkState = function(sequencerName){
  return sequenceModel.checkInitialStatePromise(sequencerName);
};
var getId = function(sequencerName){
  console.log("getId " + sequencerName);
  return sequenceModel.getIdPromise(sequencerName);
};

var ct0 = Date.now();
var ct1;
var ct2;

var testWithInititial = function(){
  var ct0 = Date.now();
  var ct1;
  var ct2;
  checkState("userid_2") // needed only if first time at all
    .then(function(result){
      ct1 = Date.now();
      return getId("userid_2");
    })
    .then(function(result){
      id = result;
      ct2 = Date.now();
      console.log("obtained id " + id);
      console.log("check " + (ct1 - ct0) + " get " + (ct2 - ct1));
    })
    .catch(function(error){
      console.error(error);
    });
};

var testWithoutInititial = function(){
  var ct0 = Date.now();
  var ct2;
  getId("userid_2")
    .then(function(result){
      id = result;
      ct2 = Date.now();
      console.log("obtained id " + id);
      console.log(" get " + (ct2 - ct0));
    })
    .catch(function(error){
      console.error(error);
    });
};
testWithInititial();
testWithoutInititial();
