/**
 * Created by a on 10/3/2015.
 */
'use strict';

var mongoose = require('mongoose');
require('../../../../../services/model/sequenceModel');
require('../../../../../services/model/Survey/SurveyModel');
// development auxiliary
var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
console.log("Connecting ..." + testDBUrl);
mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io

var surveyModel = mongoose.model('SurveyModel');
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
  checkState(surveyModel.surveyIdCounter()) // needed only if first time at all
    .then(function(result){
      ct1 = Date.now();
      console.log("checkState id " + id);
      return surveyModel.getSurveySavePromise(dataInstance);
    })
    .then(function(result){
      id = result[surveyModel.surveyIdCounter()];
      ct2 = Date.now();
      console.log("obtained id " + id);
      console.log("check " + (ct1 - ct0) + " get " + (ct2 - ct1));
      return surveyModel.getSurveyLoadPromise(id);
    })
    .then(function(result){
      console.log("loaded BEFORE update" + result);
      var updatedDataInstance = result;
      updatedDataInstance.label = updatedDataInstance.label + ' MODIFIED';
      return surveyModel.getSurveySavePromise(updatedDataInstance);
    })
    .then(function(result){
      console.log("loaded AFTER update" + result);
      return surveyModel.getSurveyLookupPromise(queryOptions);
    })
    .then(function(result){
      console.log("Queried " + result);
    })
    .catch(function(error){
      console.error("Error" + error);
    });
};

testInitSurveySequence();

