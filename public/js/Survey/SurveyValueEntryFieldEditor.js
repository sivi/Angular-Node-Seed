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
        selected: false,
        userValue: '',
        surveyValueOptionId: valueOptionCount
      };
      vm.currentQuestion.valueOptions.push(valueOption);
    };
    //
    //  -----------------
    //
    vm.addText = function() {
      console.log('addText');
      var valueOptionCount = vm.currentQuestion.valueOptions.length + 1;
      var valueOption = {
        label: 'Text',
        key: 'Text.' + vm.currentPage.surveyPageId + '.' +
        vm.currentSection.surveySectionId + '.' +
        vm.currentQuestion.surveyQuestionId + '.' + valueOptionCount,
        selected: false,
        htmlBindPath: '',
        userValue: '',
        surveyValueOptionId: valueOptionCount
      };
      vm.currentQuestion.valueOptions.push(valueOption);
    };
  };
  return {
    init: init
  };
})();
