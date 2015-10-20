// http://stackoverflow.com/questions/18258490/testing-resource-services-in-angularjs
// http://www.sitepoint.com/mocking-dependencies-angularjs-tests/
// http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/

'use strict';

describe('myApp.view1 module', function() {

  beforeEach(function() {
    angular.module('myApp');
  });

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
        var view1Ctrl = angular.module('myApp').controller('ApplicationController');
        console.log('ApplicationController ' + view1Ctrl);
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
});
