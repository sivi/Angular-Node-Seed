/**
 * Created by a on 9/22/2015.
 */
'use strict';

angular.module('myApp.controllers').
  controller('SignUpCtrl',
  ['$rootScope', '$scope', '$routeParams', '$location', 'SignUpService', 'CsrfService',
    function ($rootScope, $scope, $routeParams, $location, SignUpService, CsrfService) {

      $scope.user = {
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: ""
      };
      $scope.signup = function() {

        //$scope.user = angular.copy(user);
        var csrf_token;
        CsrfService.get({}, function(data){
          csrf_token = data;
          SignUpService.save({user:$scope.user, _csrf:csrf_token._csrf},function(saveResponse){
            console.error("saveResponse: " + JSON.stringify(saveResponse));
            if(saveResponse.result === 'OK'){
              $rootScope.currentUser = {
                username: $scope.user.username,
                userid: saveResponse.userid
              };
              $location.path("/loggedIn");
              $location.replace();
            }
            else{
              $scope.message = saveResponse.errors;
              console.log("MSG" + saveResponse.errors);
            }
          });
        });
      };

    }]);

angular.module('myApp.controllers').
  controller('LogInCtrl',
  ['$rootScope', '$scope', '$routeParams', '$location', 'LogInService', 'CsrfService',
    function ($rootScope, $scope, $routeParams, $location, LogInService, CsrfService) {

      $scope.user = {
        username: "",
        email: "",
        password: ""
      };
      $scope.login = function() {

        //$scope.user = angular.copy(user);
        var csrf_token;
        CsrfService.get({}, function(data){
          csrf_token = data;
          LogInService.save({
            username:$scope.user.username,
            password:$scope.user.password,
            _csrf:csrf_token._csrf
          },function(saveResponse){
            console.error("saveResponse: " + JSON.stringify(saveResponse));
            if(saveResponse.result === 'OK'){
              $rootScope.currentUser = {
                username: $scope.user.username,
                userid: saveResponse.userid
              };
              $location.path("/loggedIn");
              $location.replace();
            }
            else{
              $scope.message = saveResponse.errors;
              console.log("MSG" + saveResponse.errors);
            }
          });
        });
      };

    }]);

angular.module('myApp.controllers').
  controller('loggedInCtrl', ['$scope', '$routeParams', 'RestaurantService', function ($scope, $routeParams) {
  }]);

angular.module('myApp.controllers').
  controller('userProfileCtrl',
  ['$rootScope', '$scope', '$location', 'CsrfService', 'UserProfileService',
    function($rootScope, $scope, $location, CsrfService, UserProfileService) {

      UserProfileService.get({userId: $rootScope.currentUser.userid}, function(data){
        $scope.user = data.user;
      });

      $scope.saveUserProfile = function() {

        //$scope.user = angular.copy(user);
        var csrf_token;
        CsrfService.get({}, function(data){
          csrf_token = data;
          UserProfileService.save({
            userId: $scope.user.userid,
            user:$scope.user,
            _csrf:csrf_token._csrf
          },function(saveResponse){
            console.error("saveResponse: " + JSON.stringify(saveResponse));
            if(saveResponse.updateResult.result === 'OK'){
              $rootScope.currentUser = {
                username: $scope.user.username,
              };
              $location.path("/loggedIn");
              $location.replace();
            }
            else{
              $scope.message = saveResponse.updateResult.errors;
              console.log("MSG" + saveResponse.updateResult.errors);
            }
          });
        });
      };
    }]);

