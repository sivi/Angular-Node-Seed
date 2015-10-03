/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');

var surveyPageSchema = mongoose.Schema({
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  html: String,
  survey_id: Number,
  survey_page_id: Number
});
/**
 * Find survey by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
surveyPageSchema.static('load', function (id, aCallback) {
  this.findOne({ survey_page_id : id })
    .exec(aCallback);
});

/**
 * List surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveyPageSchema.static('lookup', function (options, aCallback) {

  console.log("options " + JSON.stringify(options));

  var criteria = options.criteria || {};

  var query = this.find(criteria);
  if(options.select){
    query.select(options.select);
  }
  if(options.sort){
    query.sort(options.sort); // sort by date
  }
  if(options.perPage){
    query.limit(options.perPage);
  }
  if(options.page){
    query.skip(options.perPage * options.page);
  }
  query.exec(aCallback);
});
/**
 * Count surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveyPageSchema.static('itemCount', function (options, aCallback) {
  var criteria = options.criteria || {};
  this.count(criteria)
    .exec(aCallback);
});

surveyPageSchema.statics.surveyPageIdCounter = function(){
  return "survey_page_id";
};

var collectionName = 'surveyPages';
var surveyPageModel = mongoose.model('SurveyModel', surveyPageSchema, collectionName);
