/**
 * Created by a on 10/3/2015.
 */
'use strict';

var mongoose = require('mongoose');
require('../../../../../services/model/sequenceModel');
require('../../../../../services/model/Survey/SurveySectionModel');
var utils = require('../../../../../toolbox/utils');
// development auxiliary
var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
console.log("Connecting ..." + testDBUrl);
mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io

var surveySectionModel = mongoose.model('SurveySectionModel');
var sequenceModel = mongoose.model('CounterModel');

var id;

var checkState = function(sequencerName){
  return sequenceModel.checkInitialStatePromise(sequencerName);
};
var getId = function(sequencerName){
  console.log("getId " + sequencerName);
  return sequenceModel.getIdPromise(sequencerName);
};


var testInitSurveySequence = function(){
  var ct0 = Date.now();
  var ct1;
  var ct2;
  //startdate: Date.now(),
  //  enddate: Date.now(),
  var dataInstance = {
    name: 'Survey 1',
    text: 'Survey 1 - text',
    label: 'Survey 1 - label',
    html: '<label ngInclude="/surveys/pages/1"></label>'
  };
  //{{name: }
  var queryOptions = {
  criteria: {name: {$regex: /^Survey/i}}
  };
  checkState(surveySectionModel.surveySectionIdCounter()) // needed only if first time at all
    //.then(function(result){
    //  console.log("checkState id " + id);
    //  return utils.getTimeoutPromise(3000);
    //})
    .then(function(result){
      ct1 = Date.now();
      return surveySectionModel.getSurveySectionSavePromise(dataInstance);
    })
    .then(function(result){
      id = result[surveySectionModel.surveySectionIdCounter()];
      ct2 = Date.now();
      console.log("obtained id " + id);
      console.log("check " + (ct1 - ct0) + " get " + (ct2 - ct1));
      return surveySectionModel.getSurveySectionLoadPromise(id);
    })
    .then(function(result){
      console.log("loaded " + result);
      return surveySectionModel.getSurveySectionLookupPromise(queryOptions);
    })
    .then(function(result){
      console.log("Queried " + result);
    })
    .catch(function(error){
      console.error("Error" + error);
    });
};

testInitSurveySequence();

