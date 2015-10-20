/**
 * Created by a on 10/20/2015.
 */

'use strict';

describe('ToggleController', function() {
  beforeEach(module('myApp.controllers'));

  var $controller;
  var $rootScope;

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('$scope.toggle', function() {

    it('checks if data is ready', function() {
      var $scope = {};
      var controller = $controller('ToggleController', {$rootScope: $rootScope, $scope: $scope});
      expect($scope.isDataReady()).toBeDefined();
      var dataReady = $scope.isDataReady();
      console.log('dataReady ' + $scope.isDataReady());
      expect(dataReady).toBe(false);
      $scope.toggle();
      dataReady = $scope.isDataReady();
      console.log('after toggle dataReady ' + $scope.isDataReady());
      expect(dataReady).toBe(true);
    });
  });
});
