// http://stackoverflow.com/questions/18258490/testing-resource-services-in-angularjs
// http://www.sitepoint.com/mocking-dependencies-angularjs-tests/
// http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/

'use strict';

describe('myApp.view1 module', function() {

  var $controller = null;
  var $scope = null;
  beforeEach(function() {
    angular.module('myApp');
  });
  //
  //  Here is a black voodoo magic workaround with some AngularJS-mock issues
  //
  beforeEach(inject(function($rootScope, _$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  describe('MyApp', function() {

    it('should ....', inject(function($controller) {
      //spec body
      var appInstance = angular.module('myApp');
      console.log('MyApp ' + appInstance);
      expect(appInstance).toBeDefined();
    }));

  });

  // controllers are in an array, yet array itself is not accessible!
  describe('controllers ', function() {
      it('should ....', inject(function($controller) {
        //spec body
        var view1Ctrl = angular.module('myApp').controllers;
        console.log('controllers ' + view1Ctrl);
        expect(view1Ctrl).toBeUndefined();
      }));
    });

  // retrieve main myApp controller
  describe('Main myApp controller', function() {

    it('should ....', inject(function($controller) {
        //spec body
        var view1Ctrl = angular.module('myApp').controller('AppCtrl');
        console.log('AppCtrl ' + view1Ctrl);
        expect(view1Ctrl).toBeDefined();
      }));

  });
  // retrieve view1 controller
  describe('MyCtrl1 controller', function() {

    it('should ....', inject(function($controller) {
        //spec body
        var view1Ctrl = angular.module('myApp').controller('MyCtrl1');
        console.log('MyCtrl1 ' + view1Ctrl);
        expect(view1Ctrl).toBeDefined();
      }));

  });

  // retrieve view2 controller
  describe('MyCtrl2 controller', function() {

    it('should ....', inject(function($controller) {
        //spec body
        var view1Ctrl = angular.module('myApp').controller('MyCtrl2');
        console.log('MyCtrl2 ' + view1Ctrl);
        expect(view1Ctrl).toBeDefined();
      }));

  });

  describe('toggler1Ctrl ', function() {
    var aController;

    beforeEach(inject(function($rootScope, $controller) {
      aController = $controller('toggler1Ctrl', {
        $scope: $scope
      });
    }));

    it('toggler should ....', inject(function($controller) {
      //var aController = $controller('toggler1Ctrl', {$scope: $scope});
      //console.log('toggler1Ctrl ' + JSON.stringify(aController));
      expect(aController).toBeDefined();

      //console.log('$scope ' + JSON.stringify($scope));
      expect($scope.isDataReady()).toBeDefined();
      var dataReady = $scope.isDataReady();
      console.log('dataReady ' + $scope.isDataReady());
      expect(dataReady).toBe(false);
      $scope.toggle();
      dataReady = $scope.isDataReady();
      console.log('after toggle dataReady ' + $scope.isDataReady());
      expect(dataReady).toBe(true);
    }));
  });
  /*
*/
});
