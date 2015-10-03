/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');

var surveySectionSchema = mongoose.Schema({
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  html: String,
  survey_id: Number,
  survey_page_id: Number,
  survey_section_id: Number
});
/**
 * Find survey by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
surveySectionSchema.static('load', function (id, aCallback) {
  this.findOne({ survey_section_id : id })
    .exec(aCallback);
});

/**
 * List surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveySectionSchema.static('lookup', function (options, aCallback) {

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
surveySectionSchema.static('itemCount', function (options, aCallback) {
  var criteria = options.criteria || {};
  this.count(criteria)
    .exec(aCallback);
});

surveySectionSchema.statics.surveySectionIdCounter = function(){
  return "survey_section_id";
};

var collectionName = 'surveySections';
var surveySectionModel = mongoose.model('SurveySectionModel', surveySectionSchema, collectionName);
