/**
 * Created by a on 11/17/2015.
 */

'use strict';
var SurveyValueEntryFieldEditor = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    //alert('init');
    vm = surveyEditor;
    //
    //  -----------------
    //
    vm.addRadio = function() {
      console.log('addRadio');
      var valueOptionCount = vm.currentQuestion.valueOptions.length + 1;
      var valueOption = {
        optionEntries: [],
        label: 'Radio',
        key: 'Radio.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionCount,
        htmlName: 'Radio.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionCount,
        userValue: '',
        isRequired: false,
        surveyValueOptionId: vm.getNewValueOptionIndex()
      };
      vm.currentQuestion.valueOptions.push(valueOption);
    };
    //
    //  -----------------
    //
    vm.addText = function() {
      console.log('addText');
      var valueOptionIndex = vm.getNewValueOptionIndex();

      var valueOption = {
        label: 'Text',
        key: 'Text.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionIndex,
        htmlName: 'Text.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionIndex,
        userValue: '',
        isRequired: false,
        surveyValueOptionId: valueOptionIndex
      };
      vm.currentQuestion.valueOptions.push(valueOption);
    };
    //
    //  -----------------
    //
    vm.addStarRating = function() {
      console.log('addStarRating');
      var valueOptionIndex = vm.getNewValueOptionIndex();

      var valueOption = {
        label: 'StarRating',
        key: 'StarRating.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionIndex,
        htmlName: 'StarRating.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionIndex,
        userValue: 0,
        maxStarsValue: 10,
        isRequired: false,
        surveyValueOptionId: valueOptionIndex
      };
      vm.currentQuestion.valueOptions.push(valueOption);
    };
    //
    //  -----------------
    //
    vm.deleteValueOption = function(surveyValueOptionId) {
      var valueOptionIndex = _.findIndex(vm.currentQuestion.valueOptions,
          {surveyValueOptionId: surveyValueOptionId});
      vm.currentQuestion.valueOptions.splice(valueOptionIndex, 1);
    };
    //
    //  -----------------
    //
    vm.addEntryOption = function(surveyValueOptionId) {
      // console.log(JSON.stringify(vm.currentQuestion));
      var valueOption = _.find(vm.currentQuestion.valueOptions,
          {surveyValueOptionId: surveyValueOptionId});
      var entryOptionIndex =  vm.getNewEntryOptionIndex(valueOption);
      var entryOption = {
        key: 'ReplaceMe' + '.' + entryOptionIndex,
        label: 'Select' + '.' + entryOptionIndex,
        htmlName: valueOption.htmlName + '.' + entryOptionIndex,
        entryOptionId: entryOptionIndex
      };
      valueOption.optionEntries.push(entryOption);
    };
    //
    //  -----------------
    //
    vm.deleteEntryOption = function(surveyValueOptionId, entryOptionId) {
      var valueOption = _.find(vm.currentQuestion.valueOptions,
          {surveyValueOptionId: surveyValueOptionId});
      var entryIndex = _.findIndex(valueOption.optionEntries, {entryOptionId: entryOptionId});
      valueOption.optionEntries.splice(entryIndex, 1);
    };
    //
    //  -----------------
    //
    vm.getNewValueOptionIndex = function() {
      var index = -1;
      for (var i = 0; i < vm.currentQuestion.valueOptions.length; i++) {
        if (vm.currentQuestion.valueOptions[i].surveyValueOptionId > index) {
          index = vm.currentQuestion.valueOptions[i].surveyValueOptionId;
        }
      }
      return index + 1;
    };
    //
    //  -----------------
    //
    vm.getNewEntryOptionIndex = function(valueOption) {
      var index = -1;
      for (var i = 0; i < valueOption.optionEntries.length; i++) {
        if (valueOption.optionEntries[i].entryOptionId > index) {
          index = valueOption.optionEntries[i].entryOptionId;
        }
      }
      return index + 1;
    };
  };
  return {
    init: init
  };
})();
