/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');
var dbAuxiliary = require('../../../toolbox/DBAuxiliary');

var surveyPageID = "survey_page_id";
var surveyPageModelName = 'SurveyPageModel';
var collectionName = 'surveyPages';

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
 * Pre-save hook
 */
surveyPageSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  var thisInstance = this;
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new SurveyPage before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(surveyPageID)
    .then(function(result){
      thisInstance.survey_page_id = result;
      next();
    })
    .catch(function(err){
      next(new Error(err));
    });
});

/**
 * Find survey page by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
surveyPageSchema.static('load', function (id, aCallback) {
  dbAuxiliary.load(this, surveyPageID, id, aCallback);
});

/**
 * List survey pages
 *
 * @param {Object} options
 *                  object with members:
 *                  criteria (http://docs.mongodb.org/manual/reference/operator/query/),
 *                  select,
 *                  perPage (nuber of results per pae),
 *                  page (nuber of pages to skip from beginning)
 * @param {Function} aCallback
 */
surveyPageSchema.static('lookup', function (options, aCallback) {
  dbAuxiliary.lookup(this, options, aCallback);
});
/**
 * Count survey pages
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveyPageSchema.static('itemCount', function (options, aCallback) {
  dbAuxiliary.itemCount(this, options, aCallback);
});

surveyPageSchema.statics.surveyPageIdCounter = function(){
  return surveyPageID;
};
/**
 * Obtain Promise for load by ID
 *
 * @param id
 */
surveyPageSchema.statics.getSurveyPageLoadPromise = function(id){
  return dbAuxiliary.getLoadPromise(mongoose, surveyPageModelName, id);
};
/**
 * Obtain Promise for query by options.
 * NOTE:
 *      result is always result set, stored in an array
 *      (which is empty if no result can be located) !!!
 *
 * @param options
 */
surveyPageSchema.statics.getSurveyPageLookupPromise = function(options){
  return dbAuxiliary.getLookupPromise(mongoose, surveyPageModelName, options);
};
/**
 *
 * @param surveyPageData
 */
surveyPageSchema.statics.getSurveyPageSavePromise = function(surveyPageData){
  return dbAuxiliary.getSavePromise(mongoose, surveyPageModelName, surveyPageData);
};
/**
 *
 * @param options
 * @returns {Promise}
 */
surveyPageSchema.statics.getSurveyPageCountPromise = function(options){
  return dbAuxiliary.getItemCountPromise(mongoose, surveyPageModelName, options);
};
/**
 *
 * @type {Aggregate|Model|{findElementsOverride, toString}|*}
 */

var surveyPageModel = mongoose.model(surveyPageModelName, surveyPageSchema, collectionName);
