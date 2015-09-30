'use strict';

/* Controllers */
// http://stackoverflow.com/questions/20087627/how-to-create-separate-angularjs-controller-files
// Step 1.: Create cotrollers array
angular.module('myApp.controllers', []);

// Step 2.: Define some f the controllers here, rest of them in toggleControler.js
angular.module('myApp.controllers').
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  });

angular.module('myApp.controllers').
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  });

angular.module('myApp.controllers').
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });

angular.module('myApp.controllers').
  controller('RestaurantListCtrl', ['$scope', 'RestaurantService', function ($scope, RestaurantService) {
    $scope.restaurants = RestaurantService.query({restaurantId: ''});
  }]);

angular.module('myApp.controllers').
  controller('RestaurantDetailCtrl', ['$scope', '$routeParams', 'RestaurantService', function ($scope, $routeParams, RestaurantService) {
    $scope.restaurant = RestaurantService.get({restaurantId: $routeParams.restaurantId});
  }]);


// Step 3.: in html/jade page make sure that this file (the one that declares
//          controllers array) is included first, and toggleControler.js afer
