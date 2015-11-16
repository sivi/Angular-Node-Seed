/**
 * Created by a on 11/16/2015.
 */
'use strict';
var SurveyDisplay = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    vm = surveyEditor;
    vm.currentlyDisplayedPage = 0;
    vm.showDBDatapreview = false;

    //
    //  -----------------
    //
    vm.displayThisPage = function(page) {
      var pageCandidate = _.findIndex(vm.pages, {surveyPageId: page.surveyPageId});
      if (pageCandidate === vm.currentlyDisplayedPage) {
        return true;
      }
      return false;
    };
    //
    //  -----------------
    //
    vm.nextPage = function() {
      vm.currentlyDisplayedPage++;
    };
    //
    //  -----------------
    //
    vm.previousPage = function() {
      vm.currentlyDisplayedPage--;
    };
    //
    //  -----------------
    //
    vm.showDBDataPreview = function() {
      vm.showDBDatapreview = true;
      vm.surveyDBDataLayout = [];
      for (var iPage = 0; iPage < vm.pages.length; iPage++) {
        var aPage = vm.pages[iPage];
        for (var iSection = 0; iSection < aPage.sections.length; iSection++) {
          var aSection = aPage.sections[iSection];
          for (var iQuestion = 0; iQuestion < aSection.questions.length; iQuestion++) {
            var aQuestion = aSection.questions[iQuestion];
            var rowEntry = {
              pageKey: aPage.key,
              sectionKey: aSection.key,
              questionKey: aQuestion.key,
              valueOptionsIsMultivalued: aQuestion.valueOptionsIsMultivalued
            };
            var valueOutput = [];
            for (var iOption = 0; iOption < aQuestion.valueOptions.length; iOption++) {
              var aValueOption = aQuestion.valueOptions[iOption];
              var valOption = {
                key: aValueOption.key,
                value: aValueOption.userValue
              };
              valueOutput.push(valOption);
            }
            rowEntry.valueOutput = valueOutput;
            vm.surveyDBDataLayout.push(rowEntry);
          }
        }
      }
    };
    //
    //  -----------------
    //
    vm.closeDBDataPreview = function() {
      vm.showDBDatapreview = false;
      vm.surveyDBDataLayout = [];
    };
  };
  return {
    init: init
  };
})();

