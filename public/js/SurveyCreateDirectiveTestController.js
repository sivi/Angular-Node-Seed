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
      testProp: 'A Prop',
      commitChanges: function() { vm.commitChanges(); }
    };

    vm.addNew = function() {
      $scope.One.child.addNewSurvey();
    };
    vm.editExisting = function() {
      $scope.One.child.editExistingSurvey();
    };
    vm.commitChanges = function() {
      alert('vm.commitChanges');
    };
  }

})();
