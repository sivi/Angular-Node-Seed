/**
 * Created by a on 10/4/2015.
 */

'use strict';

angular.module('myApp.controllers').
  controller('SurveyCreateCtrl',
  ['$rootScope', '$scope', '$routeParams', '$location', 'CsrfService',
    function ($rootScope, $scope, $routeParams, $location, CsrfService) {

      // constants
      var aPAGE = 'page';
      var aSECTION = 'section';
      var aQUESTION = 'question';
      var aHTML = 'HTML';
      var aVALUEOPTIONS = 'valueOptions';

      $scope.pages = [];
      $scope.selectorPages = [];   // a copy of {page.key, page.surveyPageId} pairs
      $scope.currentPage = null;
      $scope.currentPageId = null; // contains page.surveyPageId
      $scope.selectorSections = []; // a copy of {section.key, section.surveyPageId} pairs
      $scope.currentSection = null;
      $scope.currentSectionId = null; // contains section.surveySectionId
      $scope.selectorQuestions = []; // a copy of {question.key, question.surveyPageId} pairs
      $scope.currentQuestion = null;
      $scope.currentQuestionId = null; // contains question.surveyQuestionId
      $scope.currentValueOption = null;
      $scope.currentPageKey = '';
      $scope.currentSectionKey = '';
      $scope.currentQuestionKey = '';
      $scope.valueOptionsBackup = []; // fall back of value options if user cancels edit

      var pagesCount = 0;
      var sectionCount = 0;
      var questionCount = 0;
      //
      // which of the current page/section/question/valueOptions is edited?
      $scope.editingElement = '';
      // what is edited HTML/valueOptions
      $scope.currentlyEditing = '';
      // element's key value
      $scope.editingElementKeyValue = '';
      // element's HTML value (if appropriate)
      $scope.editingElementHTMLValue = '';

      //
      //  -----------------
      //
      var propagatePageChange = function() {
        console.log('propagatePageChange');
        // page has changed, so section must be anew
        $scope.currentSectionId = null;
        $scope.currentSection = null;
        // populate pages to display
        $scope.selectorPages = [];
        for (var i = 0; i < $scope.pages.length; i++) {
          var page = $scope.pages[i];
          $scope.selectorPages.push({key: page.key, surveyPageId: page.surveyPageId});
        }
        //console.log("Pages " +JSON.stringify($scope.pages));
        //console.log("selectorPages " +JSON.stringify($scope.selectorPages));
        //console.log("currentPageId " +JSON.stringify($scope.currentPageId));

        // re/establish selected page (id has been changed by add / delete)
        if ($scope.currentPageId !== null) {
          //$scope.currentPage =
          // _.find($scope.pages, { surveyPageId: parseInt($scope.currentPageId)});
          $scope.currentPage =
              _.find($scope.pages, {surveyPageId: $scope.currentPageId.surveyPageId});

          // if current page has any section, make first one as selected
          if ($scope.currentPage.sections.length > 0) {
            $scope.currentSectionId = {key: $scope.currentPage.sections[0].key,
              surveySectionId: $scope.currentPage.sections[0].surveySectionId};

          }
          /*
          else {
            $scope.currentSectionId = null;
            $scope.currentSection = null;
          }
          */
          //console.log("---------- BEFORE SECTION PROPAGATE  ");
          //console.log("currentPage " +JSON.stringify($scope.currentPage));
        }
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      var propagateSectionChange = function() {
        console.log('propagateSectionChange');
        // question must be established anew
        $scope.currentQuestionId = null;
        $scope.currentQuestion = null;

        $scope.selectorSections = [];
        for (var i = 0; i < $scope.currentPage.sections.length; i++) {
          var section = $scope.currentPage.sections[i];
          $scope.selectorSections.push({key: section.key,
              surveySectionId: section.surveySectionId});
        }
        //console.log("Sections " +JSON.stringify($scope.currentPage.sections));
        //console.log("selectorSections " +JSON.stringify($scope.selectorSections));
        //console.log("currentSectionId " +JSON.stringify($scope.currentSectionId));
        // re/establish selected section (id has been changed by add / delete, or page change)
        if ($scope.currentSectionId !== null) {
          $scope.currentSection = _.find($scope.currentPage.sections,
                {surveySectionId: $scope.currentSectionId.surveySectionId});

          // if current page has any section, make first one as selected
          if ($scope.currentSection.questions.length > 0) {
            $scope.currentQuestionId = {key: $scope.currentSection.questions[0].key,
              surveyQuestionId: $scope.currentSection.questions[0].surveyQuestionId};
          }
          //console.log("-----??----- BEFORE QUESTION PROPAGATE  ");
          //console.log("currentPage " +JSON.stringify($scope.currentPage));
          //console.log("currentSection " +JSON.stringify($scope.currentSection));
        }
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      var propagateQuestionChange = function() {
        console.log('propagateQuestionChange ' + JSON.stringify($scope.currentQuestion));

        $scope.currentValueOption = null;
        $scope.selectorQuestions = [];
        if ($scope.currentSectionId !== null) {
          for (var i = 0; i < $scope.currentSection.questions.length; i++) {
            var question = $scope.currentSection.questions[i];
            $scope.selectorQuestions.push({key: question.key,
                surveyQuestionId: question.surveyQuestionId});
          }
        }

        if ($scope.currentSectionId !== null) {
          //console.log("Questions " +JSON.stringify($scope.currentSection.questions));
          //console.log("selectorQuestions " +JSON.stringify($scope.selectorQuestions));
          //console.log("currentQuestionId " +JSON.stringify($scope.currentQuestionId));
        }
        // re/establish selected section (id has been changed by add / delete, or page change)
        if ($scope.currentQuestionId !== null) {
          $scope.currentQuestion = _.find($scope.currentSection.questions,
                {surveyQuestionId: $scope.currentQuestionId.surveyQuestionId});
        }

        console.log('EXIT propagateQuestionChange ' +
         JSON.stringify($scope.currentQuestion));
      };
      //
      //  -----------------
      //
      $scope.addPage = function() {
        console.log('addPage');
        var page = {
          surveyPageId: pagesCount,
          sections: [],
          key: $scope.currentPageKey.trim(),
          html: ''
        };
        if (page.key === '') {
          page.key = 'P' + page.surveyPageId;
        }
        pagesCount++;
        $scope.pages.push(page);
        $scope.currentPageId = {key: page.key, surveyPageId: page.surveyPageId};
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.editPage = function() {
        console.log('editPage');
        $scope.editingElement = aPAGE;
        // what is edited HTML/valueOptions
        $scope.currentlyEditing = aHTML;
        // element's key value
        $scope.editingElementKeyValue = $scope.currentPage.key;
        // element's HTML value (if appropriate)
        $scope.editingElementHTMLValue = $scope.currentPage.html;

      };
      //
      //  -----------------
      //
      $scope.removePage = function() {
        var pageIndex = _.findIndex($scope.pages, {surveyPageId: parseInt($scope.currentPageId)});
        console.log('removePage ' + pageIndex);
        $scope.pages.slice(pageIndex);
        if ($scope.pages.length === 0)
        {
          $scope.currentPage = null;
        }
        else {
          if ($scope.pages.length - 1 == pageIndex) {
            pageIndex--;
          }
          $scope.currentPage = $scope.pages[pageIndex];
        }
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.pageSelectorChange = function() {
        console.log('pageSelectorChange $scope.currentPageId ' +
            JSON.stringify($scope.currentPageId));
        //var page = _.find($scope.pages, {surveyPageId: parseInt($scope.currentPageId)});
        //$scope.currentPage = page;
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.addSection = function() {
        console.log('addSection');
        var section = {
          surveySectionId: sectionCount,
          questions: [],
          key: $scope.currentSectionKey.trim(),
          html: ''
        };
        if (section.key === '') {
          section.key = 'S' + section.surveySectionId;
        }
        sectionCount++;
        $scope.currentPage.sections.push(section);
        $scope.currentSectionId = {key: section.key, surveySectionId: section.surveySectionId};

        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.editSection = function() {
        console.log('editSection');
        $scope.editingElement = aSECTION;
        // what is edited HTML/valueOptions
        $scope.currentlyEditing = aHTML;
        // element's key value
        $scope.editingElementKeyValue = $scope.currentSection.key;
        // element's HTML value (if appropriate)
        $scope.editingElementHTMLValue = $scope.currentSection.html;

      };
      //
      //  -----------------
      //
      $scope.removeSection = function() {
        console.log('removeSection');
        var sectionIndex = _.findIndex($scope.currentPage.sections,
              {surveySectionId: parseInt($scope.currentSectionId)});
        $scope.currentPage.sections.slice(sectionIndex);
        if ($scope.currentPage.sections.length === 0)
        {
          $scope.currentSection = null;
        }
        else {
          if ($scope.currentPage.sections.length - 1 == sectionIndex) {
            sectionIndex--;
          }
          $scope.currentSection = $scope.currentPage.sections[sectionIndex];
        }
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.sectionSelectorChange = function() {
        console.log('sectionSelectorChange');
        //console.log("--currentSectionId " +JSON.stringify($scope.currentSectionId));
        //var section = _.find($scope.currentPage.sections,
        // { surveySectionId: parseInt($scope.currentSectionId)});
        //$scope.currentSection = section;
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.addQuestion = function() {
        console.log('addQuestion');
        var question = {
          surveyQuestionId: questionCount,
          valueOptions: [],
          valueOptionsIsMultivalued: true,
          valueOptionsValueUIType: 'text',
          key: $scope.currentQuestionKey.trim(),
          html: ''
        };
        if (question.key === '') {
          question.key = 'Q' + question.surveyQuestionId;
        }
        questionCount++;
        $scope.currentSection.questions.push(question);
        $scope.currentQuestionId = {key: question.key,
          surveyQuestionId: question.surveyQuestionId};

        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.editQuestion = function() {
        console.log('editQuestion');
        $scope.editingElement = aQUESTION;
        // what is edited HTML/valueOptions
        $scope.currentlyEditing = aHTML;
        // element's key value
        $scope.editingElementKeyValue = $scope.currentQuestion.key;
        // element's HTML value (if appropriate)
        $scope.editingElementHTMLValue = $scope.currentQuestion.html;
      };
      //
      //  -----------------
      //
      $scope.removeQuestion = function() {
        console.log('removeQuestion ' + $scope.currentQuestionId);
        var questionIndex = _.findIndex($scope.currentSection.questions,
            {surveySectionId: parseInt($scope.currentQuestionId)});
        $scope.currentSection.questions.slice(questionIndex);
        if ($scope.currentSection.questions.length === 0)
        {
          $scope.currentQuestion = null;
        }
        else {
          if ($scope.currentSection.questions.length - 1 == questionIndex) {
            questionIndex--;
          }
          $scope.currentQuestion = $scope.currentSection.questions[questionIndex];
        }
        console.log('removeQuestion ' + questionIndex +
            ' currentSection.questions ' + JSON.stringify($scope.currentSection.questions));
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.questionSelectorChange = function() {
        console.log('questionSelectorChange ' + JSON.stringify($scope.currentSection.questions) +
            ' $scope.currentQuestionId ' + JSON.stringify($scope.currentQuestionId));
        //var question = _.find($scope.currentSection.questions,
        // { surveyQuestionId: parseInt($scope.currentQuestionId)});
        //$scope.currentQuestion = question;
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.valueOptionSelectorChange = function() {
        console.log('valueOptionSelectorChange');
        var valueOption = _.find($scope.currentQuestion.valueOptions,
            {surveyQuestionId: parseInt($scope.currentQuestionId)});
        $scope.currentValueOption = valueOption;
        //propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.editValueOptions = function() {
        $scope.currentlyEditing = aVALUEOPTIONS;
        if ($scope.currentQuestion.valueOptions.length === 0) {
          $scope.addValueOption();
        }
        else {
          $scope.valueOptionsBackup = JSON.parse(
              JSON.stringify($scope.currentQuestion.valueOptions));
        }
      };
      //
      //  -----------------
      //
      $scope.addValueOption = function() {
        if ($scope.currentQuestion.valueOptionsValueUIType === 'text') {
          $scope.addText();
        }
        if ($scope.currentQuestion.valueOptionsValueUIType === 'radio') {
          //$scope.addRadio();
        }
      };
      //
      //  -----------------
      //
      $scope.removeValueOptions = function() {

      };
      //
      //  -----------------
      //
      $scope.addRadio = function() {
        console.log('addRadio');
        var valueOptionCount = $scope.currentQuestion.valueOptions.length + 1;
        var valueOption = {
          optionEntries: [],
          label: 'Radio',
          key: 'Radio.' + $scope.currentPage.surveyPageId + '.' +
                          $scope.currentSection.surveySectionId + '.' +
                          $scope.currentQuestion.surveyQuestionId + '.' + valueOptionCount,
          selected: false,
          userValue: '',
          surveyValueOptionId: valueOptionCount
        };
        $scope.currentQuestion.valueOptions.push(valueOption);
      };

      //
      //  -----------------
      //
      $scope.addText = function() {
        console.log('addText');
        var valueOptionCount = $scope.currentQuestion.valueOptions.length + 1;
        var valueOption = {
          label: 'Text',

          key: 'Text.' + $scope.currentPage.surveyPageId + '.' +
                        $scope.currentSection.surveySectionId + '.' +
                        $scope.currentQuestion.surveyQuestionId + '.' + valueOptionCount,
          selected: false,
          userValue: '',
          surveyValueOptionId: valueOptionCount
        };
        $scope.currentQuestion.valueOptions.push(valueOption);
      };
      //
      //  -----------------
      //
      $scope.saveEdit = function() {
        console.log('saveEdit ' + $scope.currentlyEditing + ' ' + $scope.editingElement);
        // what is edited HTML/valueOptions
        var displayId = null;

        if ($scope.currentlyEditing === aHTML) {
          if ($scope.editingElement === aPAGE) {
            $scope.currentPage.key = $scope.editingElementKeyValue;
            $scope.currentPage.html = $scope.editingElementHTMLValue;
            // update display value as well
            displayId = _.find($scope.selectorPages,
                {surveyPageId: $scope.currentPageId.surveyPageId});
            displayId.key = $scope.editingElementKeyValue;
            console.log('saveEdit P id ' + $scope.currentPage.surveyPageId);
          }
          if ($scope.editingElement === aSECTION) {
            $scope.currentSection.key = $scope.editingElementKeyValue;
            $scope.currentSection.html = $scope.editingElementHTMLValue;

            // update display value as well
            displayId = _.find($scope.selectorSections,
                {surveySectionId: $scope.currentSectionId.surveySectionId});
            displayId.key = $scope.editingElementKeyValue;
            console.log('saveEdit S id ' + $scope.currentSection.surveySectionId);
          }
          if ($scope.editingElement === aQUESTION) {
            $scope.currentQuestion.key = $scope.editingElementKeyValue;
            $scope.currentQuestion.html = $scope.editingElementHTMLValue;

            // update display value as well
            displayId = _.find($scope.selectorQuestions,
                {surveyQuestionId: $scope.currentQuestionId.surveyQuestionId});
            displayId.key = $scope.editingElementKeyValue;
            console.log('saveEdit Q id ' + $scope.currentQuestion.surveyQuestionId);
          }
        }
        // this will close editing dialog
        $scope.currentlyEditing = '';
      };
      //
      //  -----------------
      //
      $scope.cancelEdit = function() {
        // this will close editing dialog
        if ($scope.currentlyEditing === aVALUEOPTIONS) {
          $scope.currentQuestion.valueOptions = $scope.valueOptionsBackup;
        }
        $scope.currentlyEditing = '';
        $scope.valueOptionsBackup = [];
      };

    }]);

