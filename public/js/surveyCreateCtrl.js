/**
 * Created by a on 10/4/2015.
 */

'use strict';

angular.module('myApp.controllers').
  controller('SurveyCreateCtrl',
  ['$rootScope', '$scope', '$routeParams', '$location', 'CsrfService',
    function ($rootScope, $scope, $routeParams, $location, CsrfService) {
      $scope.pages = [];
      var pagesCount = 0;
      var sectionCount = 0;
      var questionCount = 0;

      $scope.addPage= function() {
        var page = {
          survey_page_id: pagesCount,
          sections: []
        };
        pagesCount++;
        $scope.pages.push(page);
      };

      $scope.addSection = function(pageId) {
        console.log("addSection pageId "+pageId);
        var section = {
          survey_section_id: sectionCount,
          questions: []
        };
        sectionCount++;
        var page = _.find($scope.pages, { survey_page_id: pageId });
        page.sections.push(page);
      };

      $scope.addQuestion = function(pageId, sectionId){
        console.log("addQuestion pageId "+pageId+", sectionId "+ sectionId);
        var question = {
          survey_question_id: questionCount,
          valueOptions: []
        };
        questionCount++;
        var page = _.find($scope.pages, { survey_page_id: pageId });

        var section = _.find(page.sections, { survey_section_id: sectionId });
        section.questions.push(question);
      };

      $scope.addRadio = function(pageId, sectionId, questionId){
        var valueOption = {
          questionFormType: 'RadioType',
          text: 'Radio',
          selected: false
        };
        var page = _.find($scope.pages, { survey_page_id: pageId });
        var section = _.find(page.sections, { survey_section_id: sectionId });
        var question = _.find(section.questions, { survey_question_id: questionId });
        question.valueOptions.valueOption(question);
      };

      $scope.addText = function(pageId, sectionId, questionId){
        var valueOption = {
          questionFormType: 'TextType',
          text: 'Radio',
          selected: false
        };
        var page = _.find($scope.pages, { survey_page_id: pageId });
        var section = _.find(page.sections, { survey_section_id: sectionId });
        var question = _.find(section.questions, { survey_question_id: questionId });
        question.valueOptions.valueOption(question);
      };
    }]);

