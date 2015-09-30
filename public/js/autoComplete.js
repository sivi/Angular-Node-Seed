/**
 * Created by a on 9/26/2015.
 */
angular.module('myApp.controllers').
  controller('AutoCompleteCtrl',
  ['$rootScope', '$scope', 'CsrfService',
    'AutoCompleteOneService', 'AutoCompleteTwoService',
    function ($rootScope, $scope, CsrfService,
              AutoCompleteOneService, AutoCompleteTwoService) {
      $scope.One = {
        entryValue: 'AA One',
        changeHandler: AutoCompleteOneService
      };
      $scope.Two = {
        entryValue: 'BB Two',
        changeHandler: AutoCompleteTwoService
      };
    }
  ]);
