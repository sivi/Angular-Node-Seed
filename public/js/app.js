(function() {
  'use strict';

  // Declare app level module which depends on filters, and services

  angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'autoComplete',
    'textAngular'
  ]);

  // DO NOT set controller, if it is set in template !!!
  //            otherwise it will be executed twice (or more) times !!!
  // http://stackoverflow.com/questions/15535336/combating-angularjs-executing-controller-twice
  //
  angular.module('myApp').config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/view1', {
        templateUrl: 'partials/partial1',
        controller: 'MyCtrl1'
      }).
      when('/view2', {
        templateUrl: 'partials/partial2',
        controller: 'MyCtrl2'
      }).
      when('/sortableTable', {
        templateUrl: 'partials/sortableTable'
        // DO NOT set controller, if it is set in template !!!
        // controller: 'SortableTableCtrl'
      }).
      when('/restaurant', {
        templateUrl: 'partials/restaurantList',
        // DO NOT set controller, if it is set in template !!!
        controller: 'RestaurantListCtrl',
        controllerAs: 'vm'
      }).
      //  route here must MATCH the one in 'href' of the list
      when('/restaurant/:restaurantId', {
        templateUrl: 'partials/restaurantDetail',
        // DO NOT set controller, if it is set in template !!!
        controller: 'RestaurantDetailCtrl',
        controllerAs: 'vm'
      }).
      when('/signup', {
        templateUrl: 'partials/signUp',
        // DO NOT set controller, if it is set in template !!!
        controller: 'SignUpCtrl',
        controllerAs: 'vm'
      }).
      when('/login', {
        templateUrl: 'partials/logIn',
        // DO NOT set controller, if it is set in template !!!
        controller: 'LogInCtrl',
        controllerAs: 'vm'
      }).
      when('/loggedIn', {
        templateUrl: 'partials/loggedIn',
        // DO NOT set controller, if it is set in template !!!
        controller: 'LoggedInCtrl',
        controllerAs: 'vm'
      }).
      when('/userProfile', {
        templateUrl: 'partials/userProfile',
        // DO NOT set controller, if it is set in template !!!
        controller: 'UserProfileCtrl',
        controllerAs: 'vm'
      }).
      when('/svgDiagram', {
        templateUrl: 'partials/svgDiagram',
        controller: 'SvgDiagramController',
        controllerAs: 'vm'
        // DO NOT set controller, if it is set in template !!!
        // controller: 'RestaurantListCtrl'
      }).
      when('/autoCompleteTest', {
        templateUrl: 'partials/autoCompleteTest'
        // DO NOT set controller, if it is set in template !!!
        // controller: 'RestaurantListCtrl'
      }).
      when('/surveyCreate', {
        templateUrl: 'partials/survey/surveyCreate'
        // DO NOT set controller, if it is set in template !!!
        // controller: 'RestaurantListCtrl'
      }).
      otherwise({
        redirectTo: '/view1'
      });

    $locationProvider.html5Mode(true);
  });
})();
