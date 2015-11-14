/**
 * Created by a on 10/4/2015.
 */
(function() {
'use strict';
angular.module('SurveyCreator', []);

angular.module('SurveyCreator').
  controller('SurveyCreateCtrl',
  ['$rootScope', '$routeParams', '$location', 'CsrfService',
    function ($rootScope, $routeParams, $location, CsrfService) {

      var vm = this;

      // constants
      var aPAGE = 'page';
      var aSECTION = 'section';
      var aQUESTION = 'question';
      var aHTML = 'HTML';
      var aVALUEOPTIONS = 'valueOptions';

      vm.pages = [];
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

      var pagesCount = 0;
      var sectionCount = 0;
      var questionCount = 0;
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
      var propagatePageChange = function() {
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
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      var propagateSectionChange = function() {
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
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      var propagateQuestionChange = function() {
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
      //
      //  -----------------
      //
      vm.addPage = function() {
        console.log('addPage');
        var page = {
          surveyPageId: pagesCount,
          sections: [],
          key: vm.currentPageKey.trim(),
          html: ''
        };
        if (page.key === '') {
          page.key = 'P' + page.surveyPageId;
        }
        pagesCount++;
        vm.pages.push(page);
        vm.currentPageId = {key: page.key, surveyPageId: page.surveyPageId};
        propagatePageChange();
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
        propagatePageChange();
      };
      //
      //  -----------------
      //
      vm.pageSelectorChange = function() {
        console.log('pageSelectorChange vm.currentPageId ' +
            JSON.stringify(vm.currentPageId));
        //var page = _.find(vm.pages, {surveyPageId: parseInt(vm.currentPageId)});
        //vm.currentPage = page;
        propagatePageChange();
      };
      //
      //  -----------------
      //
      vm.addSection = function() {
        console.log('addSection');
        var section = {
          surveySectionId: sectionCount,
          questions: [],
          key: vm.currentSectionKey.trim(),
          html: ''
        };
        if (section.key === '') {
          section.key = 'S' + section.surveySectionId;
        }
        sectionCount++;
        vm.currentPage.sections.push(section);
        vm.currentSectionId = {key: section.key, surveySectionId: section.surveySectionId};

        propagateSectionChange();
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
        propagateSectionChange();
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
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      vm.addQuestion = function() {
        console.log('addQuestion');
        var question = {
          surveyQuestionId: questionCount,
          valueOptions: [],
          valueOptionsIsMultivalued: true,
          valueOptionsValueUIType: 'text',
          key: vm.currentQuestionKey.trim(),
          html: ''
        };
        if (question.key === '') {
          question.key = 'Q' + question.surveyQuestionId;
        }
        questionCount++;
        vm.currentSection.questions.push(question);
        vm.currentQuestionId = {key: question.key,
          surveyQuestionId: question.surveyQuestionId};

        propagateQuestionChange();
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
        propagateQuestionChange();
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
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      vm.valueOptionSelectorChange = function() {
        console.log('valueOptionSelectorChange');
        var valueOption = _.find(vm.currentQuestion.valueOptions,
            {surveyQuestionId: parseInt(vm.currentQuestionId)});
        vm.currentValueOption = valueOption;
        //propagateQuestionChange();
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
          //vm.addRadio();
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
          userValue: '',
          surveyValueOptionId: valueOptionCount
        };
        vm.currentQuestion.valueOptions.push(valueOption);
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

    }]);

})();
