'use strict';

describe('myApp.view1 module', function() {

  var $controller = null;
  var $scope = null;

  beforeEach(module('myApp'));
  //
  //  Here is a black voodoo magic workaround with some AngularJS-mock issues
  //
  beforeEach(inject(function($rootScope, _$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  describe('MyApp', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var appInstance = myApp;
      console.log('MyApp ' +appInstance);
      expect(appInstance).toBeDefined();
    }));

  });

  // controllers are in an array, yet array itself is not accessible!
  describe('controllers ', function(){
    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = myApp.controllers;
      console.log('controllers ' +view1Ctrl);
      expect(view1Ctrl).toBeUndefined();
    }));
  });

  // retrieve main myApp controller
  describe('Main myApp controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = myApp.controller('AppCtrl');
      console.log('AppCtrl ' +view1Ctrl);
      expect(view1Ctrl).toBeDefined();
    }));

  });

  // retrieve view1 controller
  describe('MyCtrl1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = myApp.controller('MyCtrl1');
      console.log('MyCtrl1 ' +view1Ctrl);
      expect(view1Ctrl).toBeDefined();
    }));

  });

  // retrieve view2 controller
  describe('MyCtrl2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = myApp.controller('MyCtrl2');
      console.log('MyCtrl2 ' +view1Ctrl);
      expect(view1Ctrl).toBeDefined();
    }));

  });

  describe('toggler1Ctrl ', function(){

    it('toggler should ....', function(){
      var controller = $controller('toggler1Ctrl', { $scope: $scope });
      console.log('toggler1Ctrl ' +controller);
      expect(controller).toBeDefined();

      console.log('$scope ' +$scope);
      expect($scope.isDataReady()).toBeDefined();
      var dataReady = $scope.isDataReady();
      console.log('dataReady ' +$scope.isDataReady());
      expect(dataReady).toBe(false);
      $scope.toggle();
      dataReady = $scope.isDataReady();
      console.log('after toggle dataReady ' +$scope.isDataReady());
      expect(dataReady).toBe(true);
    });

  });
});