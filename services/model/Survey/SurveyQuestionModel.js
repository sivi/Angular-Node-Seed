/**
 * Created by a on 10/3/2015.
 */
"use strict";
var mongoose = require('mongoose');
require('../sequenceModel');

var surveyQuestionSchema = mongoose.Schema({
  name: String,
  text: String,
  image: String,
  video: String,
  label: String,
  questionType: String,
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

  //
  //  create Promise which will retrieve new ID from counter
  //  and insert into new User before saving to DB
  //
  mongoose.model('CounterModel').getIdPromise(this.surveyQuestionIdCounter())
    .then(function(result){
      this.survey_question_id = result;
      next();
    })
    .catch(function(err){
      console.err("counter FAILED --" + JSON.stringify(err));
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
  this.findOne({ survey_question_id : id })
    .exec(aCallback);
});

/**
 * List surveys
 *
 * @param {Object} options
 * @param {Function} aCallback
 */
surveyQuestionSchema.static('lookup', function (options, aCallback) {

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
surveyQuestionSchema.static('itemCount', function (options, aCallback) {
  var criteria = options.criteria || {};
  this.count(criteria)
    .exec(aCallback);
});

surveyQuestionSchema.statics.surveyQuestionIdCounter = function(){
  return "survey_question_id";
};

var collectionName = 'surveyQuestions';
var surveySectionModel = mongoose.model('SurveyQuestionModel', surveyQuestionSchema, collectionName);
