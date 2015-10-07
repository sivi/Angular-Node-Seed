/**
 * Created by a on 10/4/2015.
 */

'use strict';

angular.module('myApp.controllers').
  controller('SurveyCreateCtrl',
  ['$rootScope', '$scope', '$routeParams', '$location', 'CsrfService',
    function ($rootScope, $scope, $routeParams, $location, CsrfService) {
      $scope.pages = [];
      $scope.currentPage = null;
      $scope.currentPageId = null; // contains page.survey_page_id
      $scope.currentSection = null;
      $scope.currentSectionId = null; // contains section.survey_section_id
      $scope.currentQuestion = null;
      $scope.currentQuestionId = null; // contains question.survey_question_id
      $scope.currentValueOption = null;
      $scope.currentPageKey = "";
      $scope.currentSectionKey = "";
      $scope.currentQuestionKey = "";
      var pagesCount = 0;
      var sectionCount = 0;
      var questionCount = 0;

      var propagatePageChange = function(){
        console.log("propagatePageChange");
        $scope.currentSection = null;
        if($scope.currentPage !== null){
          $scope.currentPageId = $scope.currentPage.survey_page_id;
          if($scope.currentPage.sections.length > 0){
            $scope.currentSection = $scope.currentPage.sections[0];
          }
        }
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      var propagateSectionChange = function(){
        console.log("propagateSectionChange");
        $scope.currentQuestion = null;
        if($scope.currentSection !== null){
          $scope.currentSectionId = $scope.currentSection.survey_section_id;
          if($scope.currentSection.questions.length > 0){
            $scope.currentQuestion = $scope.currentSection.questions[0];
          }
        }
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      var propagateQuestionChange = function(){
        console.log("propagateQuestionChange " + JSON.stringify($scope.currentQuestion));
        $scope.currentValueOption = null;
        if($scope.currentQuestion !== null){
          $scope.currentQuestionId = $scope.currentQuestion.survey_question_id;
          if($scope.currentQuestion.valueOptions.length > 0){
            $scope.currentValueOption = $scope.currentQuestion.valueOptions[0];
          }
        }
        console.log("EXIT propagateQuestionChange " + JSON.stringify($scope.currentQuestion));
      };
      //
      //  -----------------
      //
      $scope.addPage= function() {
        console.log("addPage");
        var page = {
          survey_page_id: pagesCount,
          sections: [],
          key: $scope.currentPageKey.trim(),
          label: ""
        };
        if(page.key === "")
          page.key = "P" + page.survey_page_id;
        pagesCount++;
        $scope.pages.push(page);
        $scope.currentPage = page;
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.editPage = function() {
        console.log("editPage");

      };
      //
      //  -----------------
      //
      $scope.removePage = function() {
        var pageIndex = _.findIndex($scope.pages, { survey_page_id: parseInt($scope.currentPageId)});
        console.log("removePage " + pageIndex);
        $scope.pages.slice(pageIndex);
        if($scope.pages.length === 0)
        {
          $scope.currentPage = null;
        }
        else{
          if($scope.pages.length - 1 == pageIndex)
            pageIndex--;
          $scope.currentPage = $scope.pages[pageIndex];
        }
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.pageSelectorChange = function() {
        console.log("pageSelectorChange $scope.currentPageId " + JSON.stringify($scope.currentPageId));
        var page = _.find($scope.pages, {survey_page_id: parseInt($scope.currentPageId)});
        $scope.currentPage = page;
        propagatePageChange();
      };
      //
      //  -----------------
      //
      $scope.addSection = function() {
        console.log("addSection");
        var section = {
          survey_section_id: sectionCount,
          questions: [],
          key: $scope.currentSectionKey.trim(),
          label: ""
        };
        if(section.key === "")
          section.key = "S" + section.survey_section_id;
        sectionCount++;
        $scope.currentPage.sections.push(section);
        $scope.currentSection = section;
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.editSection = function() {
        console.log("editSection");

      };
      //
      //  -----------------
      //
      $scope.removeSection = function() {
        console.log("removeSection");
        var sectionIndex = _.findIndex($scope.currentPage.sections, { survey_section_id: parseInt($scope.currentSectionId)});
        $scope.currentPage.sections.slice(sectionIndex);
        if($scope.currentPage.sections.length === 0)
        {
          $scope.currentSection = null;
        }
        else{
          if($scope.currentPage.sections.length - 1 == sectionIndex)
            sectionIndex--;
          $scope.currentSection = $scope.currentPage.sections[sectionIndex];
        }
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.sectionSelectorChange = function() {
        console.log("sectionSelectorChange");
        var section = _.find($scope.currentPage.sections, { survey_section_id: parseInt($scope.currentSectionId)});
        $scope.currentSection = section;
        propagateSectionChange();
      };
      //
      //  -----------------
      //
      $scope.addQuestion = function(){
        console.log("addQuestion");
        var question = {
          survey_question_id: questionCount,
          valueOptions: [],
          key: $scope.currentQuestionKey.trim(),
          label: ""
        };
        if(question.key === "")
          question.key = "Q" + question.survey_question_id;
        questionCount++;
        $scope.currentSection.questions.push(question);
        $scope.currentQuestion = question;
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.editQuestion = function() {
        console.log("editQuestion");

      };
      //
      //  -----------------
      //
      $scope.removeQuestion = function() {
        console.log("removeQuestion " + $scope.currentQuestionId);
        var questionIndex = _.findIndex($scope.currentSection.questions, { survey_section_id: parseInt($scope.currentQuestionId)});
        $scope.currentSection.questions.slice(questionIndex);
        if($scope.currentSection.questions.length === 0)
        {
          $scope.currentQuestion = null;
        }
        else{
          if($scope.currentSection.questions.length - 1 == questionIndex)
            questionIndex--;
          $scope.currentQuestion = $scope.currentSection.questions[questionIndex];
        }
        console.log("removeQuestion " + questionIndex +" currentSection.questions " + JSON.stringify($scope.currentSection.questions) );
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.questionSelectorChange = function() {
        console.log("questionSelectorChange " + JSON.stringify($scope.currentSection.questions) + " $scope.currentQuestionId " + JSON.stringify($scope.currentQuestionId));
        var question = _.find($scope.currentSection.questions, { survey_question_id: parseInt($scope.currentQuestionId)});
        $scope.currentQuestion = question;
        propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.valueOptionSelectorChange = function() {
        console.log("valueOptionSelectorChange");
        var valueOption = _.find($scope.currentQuestion.valueOptions, { survey_question_id: parseInt($scope.currentQuestionId)});
        $scope.currentValueOption = valueOption;
        //propagateQuestionChange();
      };
      //
      //  -----------------
      //
      $scope.addRadio = function(pageId, sectionId, questionId){
        console.log("addRadio");
        var valueOptionCount = $scope.currentQuestion.valueOptions.length + 1;
        var valueOption = {
          questionFormType: 'RadioType',
          label: 'Radio',
          key: 'Radio.'+ pageId +'.'+ sectionId +'.'+ questionId +'.',
          selected: false,
          survey_valueOption_id: valueOptionCount
        };
        $scope.currentQuestion.valueOptions.push(valueOption);
      };

      $scope.addText = function(pageId, sectionId, questionId){
        console.log("addText");
        var valueOptionCount = $scope.currentQuestion.valueOptions.length + 1;
        var valueOption = {
          questionFormType: 'TextType',
          label: 'Text',
          key: 'Text.'+ pageId +'.'+ sectionId +'.'+ questionId +'.',
          selected: false,
          survey_valueOption_id: valueOptionCount
        };
        $scope.currentQuestion.valueOptions.push(valueOption);
      };


    }]);

