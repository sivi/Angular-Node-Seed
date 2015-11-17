/**
 * Created by a on 10/7/2015.
 */
(function() {
'use strict';
//
//  --------------- http://www.angulartutorial.net/2014/03/rating-stars-in-angular-js-using.html
//
var starRatingDirectiveModule = angular.module('starRatingDirectiveModule', []);

starRatingDirectiveModule.directive('starRating',
  function() {
    return {
      restrict : 'AE',
      template :
        '<ul class="starRating">' +
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
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function(index) {
        if (scope.readonly && scope.readonly === 'true') {
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
})();
