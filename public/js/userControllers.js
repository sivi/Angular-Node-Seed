/**
 * Created by a on 9/22/2015.
 */
(function() {
'use strict';
//
//  --------------------- SignUpCtrl
//
angular.module('myApp.controllers').
  controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject =
  ['$rootScope', '$scope', '$routeParams', '$location', 'SignUpService', 'CsrfService'];

function SignUpCtrl($rootScope, $scope, $routeParams, $location, SignUpService, CsrfService) {

  var vm = this;

  vm.user = {
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: ''
      };
  vm.signup = function() {

    //vm.user = angular.copy(user);
    var csrfToken;
    CsrfService.get({}, function(data) {
          csrfToken = data;
          SignUpService.save({user:vm.user, _csrf:csrfToken._csrf},function(saveResponse) {
            console.error('saveResponse: ' + JSON.stringify(saveResponse));
            if (saveResponse.result === 'OK') {
              $rootScope.currentUser = {
                username: vm.user.username,
                userid: saveResponse.userid
              };
              $location.path('/loggedIn');
              $location.replace();
            }
            else {
              vm.message = saveResponse.errors;
              console.log('MSG' + saveResponse.errors);
            }
          });
        });
  };

}
//
//  --------------------- LogInCtrl
//
angular.module('myApp.controllers').
  controller('LogInCtrl', LogInCtrl);

LogInCtrl.$inject =
    ['$rootScope', '$scope', '$routeParams', '$location', 'LogInService', 'CsrfService'];

function LogInCtrl($rootScope, $scope, $routeParams, $location, LogInService, CsrfService) {

  var vm = this;
  vm.user = {
        username: '',
        email: '',
        password: ''
      };
  vm.login = function() {

    //vm.user = angular.copy(user);
    var csrfToken;
    CsrfService.get({}, function(data) {
          csrfToken = data;
          LogInService.save({
            username:vm.user.username,
            password:vm.user.password,
            _csrf:csrfToken._csrf
          },function(saveResponse) {
            console.error('saveResponse: ' + JSON.stringify(saveResponse));
            if (saveResponse.result === 'OK') {
              $rootScope.currentUser = {
                username: vm.user.username,
                userid: saveResponse.userid
              };
              $location.path('/loggedIn');
              $location.replace();
            }
            else {
              vm.message = saveResponse.errors;
              console.log('MSG' + saveResponse.errors);
            }
          });
        });
  };

}
//
//  --------------------- LoggedInCtrl
//
angular.module('myApp.controllers').
  controller('LoggedInCtrl', LoggedInCtrl);

LoggedInCtrl.$inject = ['$rootScope'];

function LoggedInCtrl($rootScope) {
  var vm = this;
  vm.username = $rootScope.currentUser.username;
}
//
//  --------------------- UserProfileCtrl
//
angular.module('myApp.controllers').
  controller('UserProfileCtrl', UserProfileCtrl);

UserProfileCtrl.$inject =
  ['$rootScope', '$scope', '$location', 'CsrfService', 'UserProfileService'];

function UserProfileCtrl($rootScope, $scope, $location, CsrfService, UserProfileService) {
  var vm = this;

  UserProfileService.get({userId: $rootScope.currentUser.userid}, function(data) {
    vm.user = data.user;
    vm.resultOK = data.result === 'OK';
    vm.errorMessage = data.error;
    console.log("UserProfileService.get " + JSON.stringify(data));
  });

  vm.saveUserProfile = function() {

    //vm.user = angular.copy(user);
    var csrfToken;
    CsrfService.get({}, function(data) {
          csrfToken = data;
          UserProfileService.save({
            userId: vm.user.userid,
            user: vm.user,
            _csrf: csrfToken._csrf
          },function(saveResponse) {
            console.error('saveResponse: ' + JSON.stringify(saveResponse));
            if (saveResponse.updateResult.result === 'OK') {
              $rootScope.currentUser.username = vm.user.username;
              $location.path('/loggedIn');
              $location.replace();
            }
            else {
              vm.message = saveResponse.updateResult.errors;
              console.log('MSG' + saveResponse.updateResult.errors);
            }
          });
        });
  };
}
})();

