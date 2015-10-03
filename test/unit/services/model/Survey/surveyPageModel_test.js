/**
 * Created by a on 10/3/2015.
 */
'use strict';

var mongoose = require('mongoose');
require('../../../../../services/model/sequenceModel');
require('../../../../../services/model/Survey/SurveyPageModel');
// development auxiliary
var testDBUrl = 'mongodb://automaticTestUser:automaticPassword@localhost:27017/testDB';
console.log("Connecting ..." + testDBUrl);
mongoose.connect(testDBUrl); 	// connect to mongoDB database on modulus.io

var surveyPageModel = mongoose.model('SurveyPageModel');
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
    survey_id: 1,
    name: 'Survey 1',
    text: 'Survey 1 - text',
    label: 'Survey 1 - label',
    html: '<label ngInclude="/surveys/pages/1"></label>'
  };
  //{{name: }
  var queryOptions = {
  criteria: {name: {$regex: /^Survey/i}}
  };
  checkState(surveyPageModel.surveyPageIdCounter()) // needed only if first time at all
    .then(function(result){
      ct1 = Date.now();
      console.log("checkState id " + id);
      return surveyPageModel.getSurveyPageSavePromise(dataInstance);
    })
    .then(function(result){
      id = result[surveyPageModel.surveyPageIdCounter()];
      ct2 = Date.now();
      console.log("obtained id " + id);
      console.log("check " + (ct1 - ct0) + " get " + (ct2 - ct1));
      return surveyPageModel.getSurveyPageLoadPromise(id);
    })
    .then(function(result){
      console.log("loaded " + result);
      return surveyPageModel.getSurveyPageLookupPromise(queryOptions);
    })
    .then(function(result){
      console.log("Queried " + result);
    })
    .catch(function(error){
      console.error("Error" + error);
    });
};

testInitSurveySequence();

