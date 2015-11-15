/**
 * Created by a on 11/14/2015.
 */
(function() {

  'use strict';

  angular.module('SurveyCreatorDirective', ['SurveyCreator']);

  angular.module('SurveyCreatorDirective')
    .directive('surveyCreator', surveyCreator);

  function surveyCreator() {
    //transclude: true,
    // NOTE:
    //      templateUrl: '/views/partials/autoCompleteTemplate',
    // caused INFINITE loop for some unknown reason !!!
    return {
      restrict: 'AE',
      templateUrl: 'partials/survey/surveyCreateTemplate',
      scope: {
        domainData: '=domainData',
      },
      link: 'surveyCreatorLink',
      controller: 'SurveyCreateCtrl',
      controllerAs: 'vm'
    };
  }

  function surveyCreatorLink(scope,elem,attrs) {
  }
})();

