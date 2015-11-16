/**
 * Created by a on 11/16/2015.
 */

'use strict';
var SurveyEditorNavigation = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    //alert('init');
    vm = surveyEditor;

    vm.selectorPages = [];   // a copy of {page.key, page.surveyPageId} pairs
    vm.currentPage = null;
    vm.currentPageId = null; // contains page.surveyPageId
    vm.selectorSections = []; // a copy of {section.key, section.surveyPageId} pairs
    vm.currentSection = null;
    vm.currentSectionId = null; // contains section.surveySectionId
    vm.selectorQuestions = []; // a copy of {question.key, question.surveyPageId} pairs
    vm.currentQuestion = null;
    vm.currentQuestionId = null; // contains question.surveyQuestionId
    vm.currentValueOption = null;
    vm.currentPageKey = '';
    vm.currentSectionKey = '';
    vm.currentQuestionKey = '';
    vm.valueOptionsBackup = []; // fall back of value options if user cancels edit

    vm.pagesCount = 0;
    vm.sectionCount = 0;
    vm.questionCount = 0;
    //
    // which of the current page/section/question/valueOptions is edited?
    vm.editingElement = '';
    // what is edited HTML/valueOptions
    vm.currentlyEditing = '';
    // element's key value
    vm.editingElementKeyValue = '';
    // element's HTML value (if appropriate)
    vm.editingElementHTMLValue = '';

    //
    //  -----------------
    //
    vm.propagatePageChange = function() {
      console.log('propagatePageChange');
      // page has changed, so section must be anew
      vm.currentSectionId = null;
      vm.currentSection = null;
      // populate pages to display
      vm.selectorPages = [];
      for (var i = 0; i < vm.pages.length; i++) {
        var page = vm.pages[i];
        vm.selectorPages.push({key: page.key, surveyPageId: page.surveyPageId});
      }
      //console.log("Pages " +JSON.stringify(vm.pages));
      //console.log("selectorPages " +JSON.stringify(vm.selectorPages));
      //console.log("currentPageId " +JSON.stringify(vm.currentPageId));

      // re/establish selected page (id has been changed by add / delete)
      if (vm.currentPageId !== null) {
        //vm.currentPage =
        // _.find(vm.pages, { surveyPageId: parseInt(vm.currentPageId)});
        vm.currentPage =
            _.find(vm.pages, {surveyPageId: vm.currentPageId.surveyPageId});

        vm.currentlyDisplayedPage =
            _.findIndex(vm.pages, {surveyPageId: vm.currentPageId.surveyPageId});

        // if current page has any section, make first one as selected
        if (vm.currentPage.sections.length > 0) {
          vm.currentSectionId = {key: vm.currentPage.sections[0].key,
            surveySectionId: vm.currentPage.sections[0].surveySectionId};

        }
        /*
         else {
         vm.currentSectionId = null;
         vm.currentSection = null;
         }
         */
        //console.log("---------- BEFORE SECTION PROPAGATE  ");
        //console.log("currentPage " +JSON.stringify(vm.currentPage));
      }
      vm.propagateSectionChange();
    };
    //
    //  -----------------
    //
    vm.propagateSectionChange = function() {
      console.log('propagateSectionChange');
      // question must be established anew
      vm.currentQuestionId = null;
      vm.currentQuestion = null;

      vm.selectorSections = [];
      if (vm.currentPage !== null) {
        for (var i = 0; i < vm.currentPage.sections.length; i++) {
          var section = vm.currentPage.sections[i];
          vm.selectorSections.push({key: section.key,
            surveySectionId: section.surveySectionId});
        }
        //console.log("Sections " +JSON.stringify(vm.currentPage.sections));
        //console.log("selectorSections " +JSON.stringify(vm.selectorSections));
        //console.log("currentSectionId " +JSON.stringify(vm.currentSectionId));
        // re/establish selected section (id has been changed by add / delete, or page change)
        if (vm.currentSectionId !== null) {
          vm.currentSection = _.find(vm.currentPage.sections,
              {surveySectionId: vm.currentSectionId.surveySectionId});

          // if current page has any section, make first one as selected
          if (vm.currentSection !== null && vm.currentSection.questions.length > 0) {
            vm.currentQuestionId = {key: vm.currentSection.questions[0].key,
              surveyQuestionId: vm.currentSection.questions[0].surveyQuestionId};
          }
          //console.log("-----??----- BEFORE QUESTION PROPAGATE  ");
          //console.log("currentPage " +JSON.stringify(vm.currentPage));
          //console.log("currentSection " +JSON.stringify(vm.currentSection));
        }
      }
      vm.propagateQuestionChange();
    };
    //
    //  -----------------
    //
    vm.propagateQuestionChange = function() {
      console.log('propagateQuestionChange ' + JSON.stringify(vm.currentQuestion));

      vm.currentValueOption = null;
      vm.selectorQuestions = [];
      if (vm.currentSectionId !== null) {
        for (var i = 0; i < vm.currentSection.questions.length; i++) {
          var question = vm.currentSection.questions[i];
          vm.selectorQuestions.push({key: question.key,
            surveyQuestionId: question.surveyQuestionId});
        }
      }

      if (vm.currentSectionId !== null) {
        //console.log("Questions " +JSON.stringify(vm.currentSection.questions));
        //console.log("selectorQuestions " +JSON.stringify(vm.selectorQuestions));
        //console.log("currentQuestionId " +JSON.stringify(vm.currentQuestionId));
      }
      // re/establish selected section (id has been changed by add / delete, or page change)
      if (vm.currentQuestionId !== null) {
        vm.currentQuestion = _.find(vm.currentSection.questions,
            {surveyQuestionId: vm.currentQuestionId.surveyQuestionId});
      }

      console.log('EXIT propagateQuestionChange ' +
          JSON.stringify(vm.currentQuestion));
    };

  };
  return {
    init: init
  };
})();

