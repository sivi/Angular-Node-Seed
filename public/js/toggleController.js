/**
 * Created by a on 9/7/2015.
 */
// Make sure that in html/jade page that this file is after controllers.js
// (the one that declares controllers array)
(function() {

  'use strict';

  angular.module('myApp.controllers')
    .controller('ToggleController',ToggleController);
  ToggleController.$inject = ['$rootScope', '$scope'];

  function ToggleController($rootScope, $scope) {
    $scope.dataReady = false;
    $scope.isDataReady = function() {
      //console.log("isDataReady " + $scope.dataReady);
      return $scope.dataReady;
    };

    $scope.toggle = function () {
      $scope.dataReady = !$scope.dataReady;
    };

    $scope.loadData = function() {
      //console.log("before alert loadData " + $scope.dataReady);
      $scope.toggle();
      //console.log("after toggle loadData " + $scope.dataReady);
    };
    // Emitted every time the ngView content is reloaded
    $rootScope.$watch('$viewContentLoaded', function() {
      //console.log("$watch $viewContentLoaded " + $scope.dataReady);
      $scope.loadData();
    });

  }
})();
