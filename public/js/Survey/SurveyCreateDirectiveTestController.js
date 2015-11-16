/**
 * Created by a on 11/14/2015.
 */
(function() {
  'use strict';
  //
  //  -----------------
  //
  angular.module('myApp.controllers').
      controller('SurveyCreateDirectiveTestController', SurveyCreateDirectiveTestController);

  SurveyCreateDirectiveTestController.$inject = ['$scope'];
  function SurveyCreateDirectiveTestController($scope) {
    var vm = this;
    console.log('SurveyCreateDirectiveTestController');
    $scope.One = {
      surveyEditor: null,
      parentController: vm
    };

    vm.addNew = function() {
      $scope.One.surveyEditor.addNewSurvey();
    };
    vm.editExisting = function() {
      $scope.One.surveyEditor.editExistingSurvey();
    };
    vm.commitChanges = function() {
      alert('vm.commitChanges');
    };
  }

})();
