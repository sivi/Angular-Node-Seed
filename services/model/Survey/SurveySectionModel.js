/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');
var dbAuxiliary = require('../../../toolbox/DBAuxiliary');

var surveySectionID = "survey_section_id";
var surveySectionModelName = 'SurveySectionModel';
var collectionName = 'surveySections';


var surveySectionSchema = mongoose.Schema({
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  html: String,
  order: Number,
  survey_id: Number,
  survey_page_id: Number,
  survey_section_id: Number
});
/**
 * Pre-save hook
 */
surveySectionSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  var thisInstance = this;
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(surveySectionID)
    .then(function(result){
      thisInstance.survey_section_id = result;
      next();
    })
    .catch(function(err){
      next(new Error(err));
    });
});
/**
 * Find survey section by id
 *
 * @param {ObjectId} id restaurant_id
 * @param {Function} aCallback caller's function
 */
surveySectionSchema.static('load', function (id, aCallback) {
  dbAuxiliary.load(this, surveySectionID, id, aCallback);
});

/**
 * List survey sections
 *
 * @param {Object} options
 *                  object with members:
 *                  criteria (http://docs.mongodb.org/manual/reference/operator/query/),
 *                  select,
 *                  perPage (nuber of results per pae),
 *                  page (nuber of pages to skip from beginning)
 * @param {Function} aCallback
 */
surveySectionSchema.static('lookup', function (options, aCallback) {
  dbAuxiliary.lookup(this, options, aCallback);
});
/**
 * Count survey sections
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveySectionSchema.static('itemCount', function (options, aCallback) {
  dbAuxiliary.itemCount(this, options, aCallback);
});
/**
 *
 * @returns {string}
 */
surveySectionSchema.statics.surveySectionIdCounter = function(){
  return surveySectionID;
};

/**
 * Obtain Promise for load by ID
 *
 * @param id
 */
surveySectionSchema.statics.getSurveySectionLoadPromise = function(id){
  return dbAuxiliary.getLoadPromise(mongoose, surveySectionModelName, id);
};
/**
 * Obtain Promise for query by options.
 * NOTE:
 *      result is always result set, stored in an array
 *      (which is empty if no result can be located) !!!
 *
 * @param options
 */
surveySectionSchema.statics.getSurveySectionLookupPromise = function(options){
  return dbAuxiliary.getLookupPromise(mongoose, surveySectionModelName, options);
};
/**
 *
 * @param surveyData
 */
surveySectionSchema.statics.getSurveySectionSavePromise = function(surveySectionData){
  return dbAuxiliary.getSavePromise(mongoose, surveySectionModelName, surveySectionData);
};
/**
 *
 * @param options
 * @returns {Promise}
 */
surveySectionSchema.statics.getSurveySectionCountPromise = function(options){
  return dbAuxiliary.getItemCountPromise(mongoose, surveySectionModelName, options);
};
/**
 *
 * @type {Aggregate|Model|{findElementsOverride, toString}|*}
 */
var surveySectionModel = mongoose.model(surveySectionModelName, surveySectionSchema, collectionName);
