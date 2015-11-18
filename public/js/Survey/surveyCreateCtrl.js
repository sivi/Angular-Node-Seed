/**
 * Created by a on 10/4/2015.
 */
(function() {
'use strict';
angular.module('SurveyCreator', []);

angular.module('SurveyCreator').controller('SurveyCreateCtrl', SurveyCreateCtrl);

SurveyCreateCtrl.$inject = ['$rootScope', '$scope', '$routeParams',
                            '$location', 'CsrfService'];

function SurveyCreateCtrl($rootScope, $scope, $routeParams, $location,
                          CsrfService) {

  console.log('SurveyCreateCtrl');

  var vm = this;

  vm.pages = [];

  // register itself with the parent, so that parent can access members
  if (typeof $scope.domainData !== 'undefined') {
    $scope.domainData.surveyEditor = this;
  }

  SurveyEditorNavigation.init(vm);
  SurveyStructureEditor.init(vm);
  SurveyValueEntryFieldEditor.init(vm);
  SurveyDisplayConditionEditor.init(vm);
  SurveyDisplay.init(vm);
  //
  //  -----------------
  //
  vm.addNewSurvey = function () {
    alert('addNewSurvey');
  };
  //
  //  -----------------
  //
  vm. editExistingSurvey = function () {
    alert('editExistingSurvey');
  };
  //
  //  -----------------
  //
  vm.saveSurveyEditing = function() {
    // HORROR:
    //      declared in form as
    //          ng-submit="vm.saveSurveyEditing()"
    //      function is called on each button click
    //
    $scope.domainData.parentController.commitChanges();
  };
  //
  //  -----------------
  //
  vm.submitSurvey = function() {
    for (var iPage = 0; iPage < vm.pages.length; iPage++) {
      var aPage = vm.pages[iPage];
      for (var iSection = 0; iSection < aPage.sections.length; iSection++) {
        var aSection = aPage.sections[iSection];
        for (var iQuestion = 0; iQuestion < aSection.questions.length; iQuestion++) {
          var aQuestion = aSection.questions[iQuestion];
          for (var iOption = 0; iOption < aQuestion.valueOptions.length; iOption++) {
            var aValueOption = aQuestion.valueOptions[iOption];
            var bindPath =
                'vm.pages[' + iPage +
                '].sections[' + iSection +
                '].questions[' + iQuestion +
                '].valueOptions[' + iOption + ']';
            console.log(bindPath + ' -->' + aValueOption.userValue);
          }
        }
      }
    }
  };
}

})();
