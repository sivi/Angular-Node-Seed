/**
 * Created by a on 9/26/2015.
 */
(function() {
'use strict';

angular.module('myApp.controllers').
  controller('AutoCompleteCtrl',AutoCompleteCtrl);

AutoCompleteCtrl.$inject =
    ['$rootScope', '$scope', 'CsrfService',
    'AutoCompleteOneService', 'AutoCompleteTwoService'];

function AutoCompleteCtrl($rootScope, $scope, CsrfService,
              AutoCompleteOneService, AutoCompleteTwoService) {
  $scope.One = {
        entryValue: 'AA One',
        changeHandler: AutoCompleteOneService
      };
  $scope.Two = {
        entryValue: 'BB Two',
        changeHandler: AutoCompleteTwoService
      };
};
})();
