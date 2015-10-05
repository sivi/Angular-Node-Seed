/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');
var dbAuxiliary = require('../../../toolbox/DBAuxiliary');

var surveyQuestionID = "survey_question_id";
var surveyQuestionModelName = 'SurveyQuestionModel';
var collectionName = 'surveyQuestions';

var surveyQuestionSchema = mongoose.Schema({
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  order: Number,
  questionFormType: String,
  questionRowOptions: String,
  questionColOptions: String,
  questionOptionLabes: String,
  html: String,
  survey_id: Number,
  survey_page_id: Number,
  survey_section_id: Number,
  survey_question_id: Number
});
/**
 * Pre-save hook
 */
surveyQuestionSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  var thisInstance = this;
  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(surveyQuestionID)
    .then(function(result){
      thisInstance.survey_question_id = result;
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
surveyQuestionSchema.static('load', function (id, aCallback) {
  dbAuxiliary.load(this, surveyQuestionID, id, aCallback);
});

/**
 * List survey questions
 *
 * @param {Object} options
 *                  object with members:
 *                  criteria (http://docs.mongodb.org/manual/reference/operator/query/),
 *                  select,
 *                  perPage (nuber of results per pae),
 *                  page (nuber of pages to skip from beginning)
 * @param {Function} aCallback
 */
surveyQuestionSchema.static('lookup', function (options, aCallback) {
  dbAuxiliary.lookup(this, options, aCallback);
});
/**
 * Count surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveyQuestionSchema.static('itemCount', function (options, aCallback) {
  dbAuxiliary.itemCount(this, options, aCallback);
});

surveyQuestionSchema.statics.surveyQuestionIdCounter = function(){
  return surveyQuestionID;
};
/**
 * Obtain Promise for load by ID
 *
 * @param id
 */
surveyQuestionSchema.statics.getSurveyQuestionLoadPromise = function(id){
  return dbAuxiliary.getLoadPromise(mongoose, surveyQuestionModelName, id);
};
/**
 * Obtain Promise for query by options.
 * NOTE:
 *      result is always result set, stored in an array
 *      (which is empty if no result can be located) !!!
 *
 * @param options
 */
surveyQuestionSchema.statics.getSurveyQuestionLookupPromise = function(options){
  return dbAuxiliary.getLookupPromise(mongoose, surveyQuestionModelName, options);
};
/**
 *
 * @param surveyData
 */
surveyQuestionSchema.statics.getSurveyQuestionSavePromise = function(surveyQuestionData){
  return dbAuxiliary.getSavePromise(mongoose, surveyQuestionModelName, surveyQuestionData);
};
/**
 *
 * @param options
 * @returns {Promise}
 */
surveyQuestionSchema.statics.getSurveyQuestionCountPromise = function(options){
  return dbAuxiliary.getItemCountPromise(mongoose, surveyQuestionModelName, options);
};
/**
 *
 * @type {Aggregate|Model|{findElementsOverride, toString}|*}
 */
var surveySectionModel = mongoose.model(surveyQuestionModelName, surveyQuestionSchema, collectionName);
