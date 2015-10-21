/**
 * Created by a on 10/19/2015.
 */

// http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
//  DID not work with these below !!!
// http://stackoverflow.com/questions/18258490/testing-resource-services-in-angularjs
// http://neverfriday.com/2014/07/28/angularjs-testing-services-that-use-resource/
// http://stackoverflow.com/questions/25002520/testing-an-angularjs-factory-with-karma-jasmine

'use strict';

describe('RestaurantListCtrl', function() {
  var $httpBackend;
  var RestaurantService;
  var $routeParams;
  var $controller;
  var $rootScope;

  beforeEach(function() {
    module('myApp.controllers');
    module('myApp.services');
  });

  beforeEach(inject(function(_RestaurantService_) {
    RestaurantService = _RestaurantService_;
  }));

  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {

    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    // NOTE that $routeParams mimics route delineator
    // --> in app.js when('/restaurant/:restaurantId',
    $routeParams = {restaurantId: 1};
    $httpBackend.when('GET', 'restaurant')
      .respond([{
        id: 1,
        name: 'Bob\'s wok'
      },
      {
        id: 2,
        name: 'Marylin\'s bites'
      },
      {
        id: 3,
        name: 'MC\'s'
      }]);

    $httpBackend.when('GET', 'restaurant/1')
      .respond(JSON.stringify({
        id: 1,
        name: 'Bob\'s wok',
        location: '1 Grand Str.'
      }));

  }));

  it('should fetch list of restaurants', function() {
    var $scope = {};
    var aController = $controller('RestaurantListCtrl',
      {$scope: $scope,
        RestaurantService: RestaurantService});
    $httpBackend.flush();
    expect(aController.restaurants).toBeDefined();
    expect(aController.restaurants.length).toBe(3);
    expect(aController.restaurants[0].name).toBe('Bob\'s wok');
    //console.log(JSON.stringify(aController.restaurants));
  });

  it('should fetch details of restaurant', function() {
    var $scope = {};
    var aController = $controller('RestaurantDetailCtrl',
      {$scope: $scope,
        $routeParams: $routeParams,
        RestaurantService: RestaurantService});
    $httpBackend.flush();
    expect(aController.restaurant).toBeDefined();
    expect(aController.restaurant.name).toBe('Bob\'s wok');
    //console.log(JSON.stringify(aController.restaurant));
  });
});
