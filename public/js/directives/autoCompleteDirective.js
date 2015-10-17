/**
 * Created by a on 9/26/2015.
 */
//
// NOTE that module MUST be included into dependencies of the application module
//
// http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html
//
// See also https://docs.angularjs.org/guide/directive
//
(function() {
'use strict';

var autoCompleteDirectiveModule = angular.module('autoComplete', []);

autoCompleteDirectiveModule.directive('autoComplete', function () {
  //transclude: true,
  // NOTE:
  //      templateUrl: '/views/partials/autoCompleteTemplate',
  // caused INFINITE loop for some unknown reason !!!
  return {
    restrict: 'AE',
    templateUrl: 'partials/autoCompleteTemplate',
    scope: {
      domainData: '=domainData',
    },
    link:function(scope,elem,attrs) {
      scope.suggestions = [];
      scope.selectedTags = [];
      scope.selectedIndex = -1;

      scope.changeHandler = function() {
        //scope.domainData.changeHandler(scope.searchText);
      };

      scope.addToSelectedTags = function(index) {
        addToSelectedTags(index, scope);
      };
      //
      //  Key navigation
      //
      scope.checkKeyDown = function(event) {
        checkKeyDown(event, scope);
      };

      scope.$watch('selectedIndex',function(val) {
        if (val !== -1) {
          scope.searchText = scope.suggestions[scope.selectedIndex];
        }
      });
    }
  };
});

var addToSelectedTags = function(index, scope) {
  var valueToAdd = scope.searchText;
  if (index > -1) {
    scope.selectedTags.push(scope.suggestions[index]);
  }
  if (scope.selectedTags.indexOf(valueToAdd) === -1) {
    scope.selectedTags.push(valueToAdd);
    scope.domainData.entryValue = valueToAdd;
    scope.searchText = '';
    scope.suggestions = [];
  }
  //scope.domainData.changeHandler(scope.domainData.value);

};

var checkKeyDown = function(event, scope) {
  if (event.keyCode === 40) {
    event.preventDefault();
    if (scope.selectedIndex + 1 !== scope.suggestions.length) {
      scope.selectedIndex++;
    }
  }
  else if (event.keyCode === 38) {
    event.preventDefault();
    if (scope.selectedIndex - 1 !== -1) {
      scope.selectedIndex--;
    }
  }
  else if (event.keyCode === 13) {
    scope.addToSelectedTags(scope.selectedIndex);
  }
};

})();
