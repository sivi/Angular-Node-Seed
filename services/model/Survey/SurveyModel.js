/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');
var dbAuxiliary = require('../../../toolbox/DBAuxiliary');

var surveyID = "survey_id";
var surveyModelName = 'SurveyModel';
var collectionName = 'surveys';

var surveySchema = mongoose.Schema({
  startdate: {$date: Date},
  enddate: {$date: Date},
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  html: String,
  survey_id: Number
});
/**
 * Pre-save hook
 */
surveySchema.pre('save', function(next) {
  if (!this.isNew) return next();
  var thisInstance = this;
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(surveyID)
    .then(function(result){
      thisInstance.survey_id = result;
      next();
    })
    .catch(function(err){
      next(new Error(err));
    });
});

/**
 * Find survey by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
surveySchema.static('load', function (id, aCallback) {
  dbAuxiliary.load(this, id, aCallback);
});

/**
 * List surveys
 *
 * @param {Object} options
 *                  object with members:
 *                  criteria (http://docs.mongodb.org/manual/reference/operator/query/),
 *                  select,
 *                  perPage (nuber of results per pae),
 *                  page (nuber of pages to skip from beginning)
 * @param {Function} aCallback
 */
surveySchema.static('lookup', function (options, aCallback) {
  dbAuxiliary.lookup(this, options, aCallback);
});
/**
 * Count surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveySchema.static('itemCount', function (options, aCallback) {
  var criteria = options.criteria || {};
  this.count(criteria)
    .exec(aCallback);
});
/**
 *
 * @returns {string}
 */
surveySchema.statics.surveyIdCounter = function(){
  return surveyID;
};
/**
 * Obtain Promise for load by ID
 *
 * @param id
 */
surveySchema.statics.getSurveyLoadPromise = function(id){
  return dbAuxiliary.getLoadPromise(mongoose, surveyModelName, id);
};
/**
 * Obtain Promise for query by options.
 * NOTE:
 *      result is always result set, stored in an array
 *      (which is empty if no result can be located) !!!
 *
 * @param options
 */
surveySchema.statics.getSurveyLookupPromise = function(options){
  return dbAuxiliary.getLookupPromise(mongoose, surveyModelName, options);
};
/**
 *
 * @param surveyData
 */
surveySchema.statics.getSurveySavePromise = function(surveyData){
  return dbAuxiliary.getSavePromise(mongoose, surveyModelName, surveyData);
};
/**
 *
 * @type {Aggregate|Model|{findElementsOverride, toString}|*}
 */
var surveyModel = mongoose.model(surveyModelName, surveySchema, collectionName);