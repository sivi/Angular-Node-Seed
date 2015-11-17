/**
 * Created by a on 11/17/2015.
 */

'use strict';
var SurveyStructureEditor = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    //alert('init');
    vm = surveyEditor;

    // constants
    var aPAGE = 'page';
    var aSECTION = 'section';
    var aQUESTION = 'question';
    var aHTML = 'HTML';
    var aVALUEOPTIONS = 'valueOptions';

    //
    //  -----------------
    //
    vm.addPage = function() {
      console.log('addPage');
      var page = {
        surveyPageId: vm.getNewPageIndex(),
        sections: [],
        key: vm.currentPageKey.trim(),
        html: ''
      };
      if (page.key === '') {
        page.key = 'P' + page.surveyPageId;
      }
      vm.pagesCount++;
      vm.pages.push(page);
      vm.currentPageId = {key: page.key, surveyPageId: page.surveyPageId};
      vm.propagatePageChange();
    };
    //
    //  -----------------
    //
    vm.editPage = function() {
      console.log('editPage');
      vm.editingElement = aPAGE;
      // what is edited HTML/valueOptions
      vm.currentlyEditing = aHTML;
      // element's key value
      vm.editingElementKeyValue = vm.currentPage.key;
      // element's HTML value (if appropriate)
      vm.editingElementHTMLValue = vm.currentPage.html;

    };
    //
    //  -----------------
    //
    vm.removePage = function() {
      if (vm.pages.length === 0) {
        return;
      }
      var pageIndex = _.findIndex(vm.pages, {surveyPageId: vm.currentPageId.surveyPageId});
      console.log('removePage ' + pageIndex);
      vm.pages.splice(pageIndex, 1);
      if (vm.pages.length === 0)
      {
        vm.currentPage = null;
        vm.currentPageId = null;
      }
      else {
        if (vm.pages.length === pageIndex) {
          pageIndex--;
        }
        vm.currentPage = vm.pages[pageIndex];
        vm.currentPageId = {key: vm.currentPage.key,
          surveyPageId: vm.currentPage.surveyPageId};
      }
      vm.propagatePageChange();
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
    vm.addSection = function() {
      console.log('addSection');
      var section = {
        surveySectionId: vm.getNewSectionIndex(),
        questions: [],
        key: vm.currentSectionKey.trim(),
        html: ''
      };
      if (section.key === '') {
        section.key = 'S' + section.surveySectionId;
      }
      vm.sectionCount++;
      vm.currentPage.sections.push(section);
      vm.currentSectionId = {key: section.key, surveySectionId: section.surveySectionId};

      vm.propagateSectionChange();
    };
    //
    //  -----------------
    //
    vm.editSection = function() {
      console.log('editSection');
      vm.editingElement = aSECTION;
      // what is edited HTML/valueOptions
      vm.currentlyEditing = aHTML;
      // element's key value
      vm.editingElementKeyValue = vm.currentSection.key;
      // element's HTML value (if appropriate)
      vm.editingElementHTMLValue = vm.currentSection.html;

    };
    //
    //  -----------------
    //
    vm.removeSection = function() {
      console.log('removeSection');
      if (vm.currentPage === null || vm.currentPage.sections.length === 0) {
        return;
      }
      var sectionIndex = _.findIndex(vm.currentPage.sections,
          {surveySectionId: vm.currentSectionId.surveySectionId});
      vm.currentPage.sections.splice(sectionIndex, 1);
      if (vm.currentPage.sections.length === 0)
      {
        vm.currentSection = null;
        vm.currentSectionId = null;
      }
      else {
        if (vm.currentPage.sections.length === sectionIndex) {
          sectionIndex--;
        }
        vm.currentSection = vm.currentPage.sections[sectionIndex];
        vm.currentSectionId = {key: vm.currentSection.key,
          surveySectionId: vm.currentSection.surveySectionId};
      }
      vm.propagateSectionChange();
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
    vm.addQuestion = function() {
      console.log('addQuestion');
      var question = {
        surveyQuestionId: vm.getNewQuestionIndex(),
        valueOptions: [],
        valueOptionsIsMultivalued: true,
        valueOptionsValueUIType: 'text',
        key: vm.currentQuestionKey.trim(),
        html: ''
      };
      if (question.key === '') {
        question.key = 'Q' + question.surveyQuestionId;
      }
      vm.questionCount++;
      vm.currentSection.questions.push(question);
      vm.currentQuestionId = {key: question.key,
        surveyQuestionId: question.surveyQuestionId};

      vm.propagateQuestionChange();
    };
    //
    //  -----------------
    //
    vm.editQuestion = function() {
      console.log('editQuestion');
      vm.editingElement = aQUESTION;
      // what is edited HTML/valueOptions
      vm.currentlyEditing = aHTML;
      // element's key value
      vm.editingElementKeyValue = vm.currentQuestion.key;
      // element's HTML value (if appropriate)
      vm.editingElementHTMLValue = vm.currentQuestion.html;
    };
    //
    //  -----------------
    //
    vm.removeQuestion = function() {
      if (vm.currentSection === null || vm.currentSection.questions.length === 0) {
        return;
      }
      var questionIndex = _.findIndex(vm.currentSection.questions,
          {surveyQuestionId: vm.currentQuestionId.surveyQuestionId});
      vm.currentSection.questions.splice(questionIndex, 1);
      if (vm.currentSection.questions.length === 0)
      {
        vm.currentQuestion = null;
        vm.currentQuestionId = null;
      }
      else {
        if (vm.currentSection.questions.length === questionIndex) {
          questionIndex--;
        }
        vm.currentQuestion = vm.currentSection.questions[questionIndex];
        vm.currentQuestionId = {key: vm.currentQuestion.key,
          surveyQuestionId: vm.currentQuestion.surveyQuestionId};
      }

      console.log('removeQuestion ' + questionIndex +
          ' currentSection.questions ' + JSON.stringify(vm.currentSection.questions));
      vm.propagateQuestionChange();
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
    vm.valueOptionSelectorChange = function() {
      console.log('valueOptionSelectorChange');
      var valueOption = _.find(vm.currentQuestion.valueOptions,
          {surveyQuestionId: parseInt(vm.currentQuestionId)});
      vm.currentValueOption = valueOption;
      //vm.propagateQuestionChange();
    };
    //
    //  -----------------
    //
    vm.editValueOptions = function() {
      vm.currentlyEditing = aVALUEOPTIONS;
      if (vm.currentQuestion.valueOptions.length === 0) {
        vm.addValueOption();
      }
      else {
        vm.valueOptionsBackup = JSON.parse(
            JSON.stringify(vm.currentQuestion.valueOptions));
      }
    };
    //
    //  -----------------
    //
    vm.addValueOption = function() {
      if (vm.currentQuestion.valueOptionsValueUIType === 'text') {
        vm.addText();
      }
      if (vm.currentQuestion.valueOptionsValueUIType === 'radio') {
        vm.addRadio();
      }
    };
    //
    //  -----------------
    //
    vm.removeValueOptions = function() {
    };
    //
    //  -----------------
    //
    vm.saveEdit = function() {
      console.log('saveEdit ' + vm.currentlyEditing + ' ' + vm.editingElement);
      // what is edited HTML/valueOptions
      var displayId = null;

      if (vm.currentlyEditing === aHTML) {
        if (vm.editingElement === aPAGE) {
          vm.currentPage.key = vm.editingElementKeyValue;
          vm.currentPage.html = vm.editingElementHTMLValue;
          // update display value as well
          displayId = _.find(vm.selectorPages,
              {surveyPageId: vm.currentPageId.surveyPageId});
          displayId.key = vm.editingElementKeyValue;
          console.log('saveEdit P id ' + vm.currentPage.surveyPageId);
        }
        if (vm.editingElement === aSECTION) {
          vm.currentSection.key = vm.editingElementKeyValue;
          vm.currentSection.html = vm.editingElementHTMLValue;

          // update display value as well
          displayId = _.find(vm.selectorSections,
              {surveySectionId: vm.currentSectionId.surveySectionId});
          displayId.key = vm.editingElementKeyValue;
          console.log('saveEdit S id ' + vm.currentSection.surveySectionId);
        }
        if (vm.editingElement === aQUESTION) {
          vm.currentQuestion.key = vm.editingElementKeyValue;
          vm.currentQuestion.html = vm.editingElementHTMLValue;

          // update display value as well
          displayId = _.find(vm.selectorQuestions,
              {surveyQuestionId: vm.currentQuestionId.surveyQuestionId});
          displayId.key = vm.editingElementKeyValue;
          console.log('saveEdit Q id ' + vm.currentQuestion.surveyQuestionId);
        }
      }
      // this will close editing dialog
      vm.currentlyEditing = '';
    };
    //
    //  -----------------
    //
    vm.cancelEdit = function() {
      // this will close editing dialog
      if (vm.currentlyEditing === aVALUEOPTIONS) {
        vm.currentQuestion.valueOptions = vm.valueOptionsBackup;
      }
      vm.currentlyEditing = '';
      vm.valueOptionsBackup = [];
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

