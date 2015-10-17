/**
 * Created by a on 10/3/2015.
 */
(function() {

'use strict';
var mongoose = require('mongoose');
var dbAuxiliary = require('../../../toolbox/DBAuxiliary');

var surveyID = 'surveyId';
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
  surveyId: Number
});
/**
 * Pre-save hook
 */
surveySchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }
  var thisInstance = this;
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(surveyID)
    .then(function(result) {
      thisInstance.surveyId = result;
      next();
    })
    .catch(function(err) {
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
  dbAuxiliary.load(this, surveyID, id, aCallback);
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
  dbAuxiliary.itemCount(this, options, aCallback);
});
/**
 *
 * @returns {string}
 */
surveySchema.statics.surveyIdCounter = function() {
  return surveyID;
};
/**
 * Obtain Promise for load by ID
 *
 * @param {number} id
 */
surveySchema.statics.getSurveyLoadPromise = function(id) {
  return dbAuxiliary.getLoadPromise(mongoose, surveyModelName, id);
};
/**
 * Obtain Promise for query by options.
 * NOTE:
 *      result is always result set, stored in an array
 *      (which is empty if no result can be located) !!!
 *
 * @param {object} options
 */
surveySchema.statics.getSurveyLookupPromise = function(options) {
  return dbAuxiliary.getLookupPromise(mongoose, surveyModelName, options);
};
/**
 *
 * @param {object} surveyData
 */
surveySchema.statics.getSurveySavePromise = function(surveyData) {
  return dbAuxiliary.getSavePromise(mongoose, surveyModelName, surveyData);
};
/**
 *
 * @param {object} options
 * @returns {Promise}
 */
surveySchema.statics.getSurveyCountPromise = function(options) {
  return dbAuxiliary.getItemCountPromise(mongoose, surveyModelName, options);
};
/**
 *
 * @type {Aggregate|Model|{findElementsOverride, toString}|*}
 */
var surveyModel = mongoose.model(surveyModelName, surveySchema, collectionName);
})();
