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
    // elements display condition
    vm.editingElementDisplayCondition = {};
    // auxiliary set of sections for page selected in condition
    vm.conditionSelectorSections = []; // a copy of {section.key, section.surveyPageId} pairs
    // auxiliary set of questions for section selected in condition
    vm.conditionSelectorQuestions = []; // a copy of {section.key, section.surveyPageId} pairs
    // auxiliary set of valueOPtions for question selected in condition
    vm.conditionSelectorValueOptions = [];

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

      // re/establish selected page (id has been changed by add / delete)
      if (vm.currentPageId !== null) {

        vm.currentPage =
            _.find(vm.pages, {surveyPageId: vm.currentPageId.surveyPageId});

        vm.currentlyDisplayedPage =
            _.findIndex(vm.pages, {surveyPageId: vm.currentPageId.surveyPageId});

        // if current page has any section, make first one as selected
        if (vm.currentPage.sections.length > 0) {
          vm.currentSectionId = {key: vm.currentPage.sections[0].key,
            surveySectionId: vm.currentPage.sections[0].surveySectionId};

        }
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
        // re/establish selected section (id has been changed by add / delete, or page change)
        if (vm.currentSectionId !== null) {
          vm.currentSection = _.find(vm.currentPage.sections,
              {surveySectionId: vm.currentSectionId.surveySectionId});

          // if current page has any section, make first one as selected
          if (vm.currentSection !== null && vm.currentSection.questions.length > 0) {
            vm.currentQuestionId = {key: vm.currentSection.questions[0].key,
              surveyQuestionId: vm.currentSection.questions[0].surveyQuestionId};
          }
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

      // re/establish selected section (id has been changed by add / delete, or page change)
      if (vm.currentQuestionId !== null) {
        vm.currentQuestion = _.find(vm.currentSection.questions,
            {surveyQuestionId: vm.currentQuestionId.surveyQuestionId});
      }

      console.log('EXIT propagateQuestionChange ' +
          JSON.stringify(vm.currentQuestion));
    };
    //
    //  -----------------
    //
    vm.pageSelectorChange = function() {
      console.log('pageSelectorChange vm.currentPageId ' +
          JSON.stringify(vm.currentPageId));
      //var page = _.find(vm.pages, {surveyPageId: parseInt(vm.currentPageId)});
      //vm.currentPage = page;
      vm.propagatePageChange();
    };
    //
    //  -----------------
    //
    vm.sectionSelectorChange = function() {
      console.log('sectionSelectorChange');
      //console.log("--currentSectionId " +JSON.stringify(vm.currentSectionId));
      //var section = _.find(vm.currentPage.sections,
      // { surveySectionId: parseInt(vm.currentSectionId)});
      //vm.currentSection = section;
      vm.propagateSectionChange();
    };
    //
    //  -----------------
    //
    vm.questionSelectorChange = function() {
      console.log('questionSelectorChange ' + JSON.stringify(vm.currentSection.questions) +
          ' vm.currentQuestionId ' + JSON.stringify(vm.currentQuestionId));
      //var question = _.find(vm.currentSection.questions,
      // { surveyQuestionId: parseInt(vm.currentQuestionId)});
      //vm.currentQuestion = question;
      vm.propagateQuestionChange();
    };
    //
    //  -----------------
    //
    vm.getNewPageIndex = function() {
      var index = -1;
      for (var i = 0; i < vm.pages.length; i++) {
        if (vm.pages[i].surveyPageId > index) {
          index = vm.pages[i].surveyPageId;
        }
      }
      return index + 1;
    };
    //
    //  -----------------
    //
    vm.getNewSectionIndex = function() {
      var index = -1;
      for (var i = 0; i < vm.currentPage.sections.length; i++) {
        if (vm.currentPage.sections[i].surveySectionId > index) {
          index = vm.currentPage.sections[i].surveySectionId;
        }
      }
      return index + 1;
    };
    //
    //  -----------------
    //
    vm.getNewQuestionIndex = function() {
      var index = -1;
      for (var i = 0; i < vm.currentSection.questions.length; i++) {
        if (vm.currentSection.questions[i].surveyQuestionId > index) {
          index = vm.currentSection.questions[i].surveyQuestionId;
        }
      }
      return index + 1;
    };

  };
  return {
    init: init
  };
})();

