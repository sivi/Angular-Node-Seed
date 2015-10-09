/**
 * Created by a on 10/7/2015.
 */
'use strict';
//
//  ---------- http://stackoverflow.com/questions/23646395/rendering-a-star-rating-system-using-angularjs
//
// <div fundoo-rating rating-value="rating" max="10" readonly="true"></div>
var starApp = angular.module('starApp', []);

starApp.controller('StarCtrl', ['$scope', function ($scope) {
  $scope.rating = 0;
  $scope.ratings = [{
    current: 5,
    max: 10
  }, {
    current: 3,
    max: 5
  }];

  $scope.getSelectedRating = function (rating) {
    console.log(rating);
  };
}]);

starApp.directive('starRating', function () {
  return {
    restrict: 'A',
    template: '<ul class="rating">' +
    '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
    '\u2605' +
    '</li>' +
    '</ul>',
    scope: {
      ratingValue: '=',
      max: '=',
      onRatingSelected: '&',
      readonly: '@'
    },
    link: function (scope, elem, attrs) {

      var updateStars = function () {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function (index) {
        if(scope.readonly && scope.readonly === 'true') {
          return;
        }
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating: index + 1
        });
      };

      scope.$watch('ratingValue', function (oldVal, newVal) {
        if (newVal) {
          updateStars();
        }
      });
    }
  };
});

//
//  --------------- http://www.angulartutorial.net/2014/03/rating-stars-in-angular-js-using.html
//
var starRatingDirectiveModule = angular.module('starRatingDirectiveModule', []);

starRatingDirectiveModule.directive('starRating',
  function() {
    return {
      restrict : 'A',
      template :
        '<ul class="rating">' +
        ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
        '  <i class="fa fa-star-o"></i>' +
        ' </li>' +
        '</ul>',
      scope : {
      ratingValue : '=',
        max : '=',
        onRatingSelected : '&',
        readonly: '@'
    },
    link: function (scope, elem, attrs) {
      var updateStars = function() {
        scope.stars = [];
        for ( var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function(index) {
        if(scope.readonly && scope.readonly === 'true') {
          return;
        }
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating: index + 1
        });
      };

      scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
    }};
});
