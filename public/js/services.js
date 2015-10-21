(function() {
  'use strict';

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
  var myServices = angular.module('myApp.services', ['ngResource']);

  myServices.value('version', '0.1');

  myServices.factory('RestaurantService', ['$resource',
  function RestaurantService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('restaurant/:restaurantId', {}, {
    //  DEFAULT SET --> https://docs.angularjs.org/api/ngResource/service/$resource
    //{ 'get':    {method:'GET'},
    //  'save':   {method:'POST'},
    //  'query':  {method:'GET', isArray:true},
    //  'remove': {method:'DELETE'},
    //  'delete': {method:'DELETE'} }
    });
  }]);

  myServices.factory('SignUpService', ['$resource',
  function SignUpService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/signup', {}, {
    });
  }]);

  myServices.factory('LogInService', ['$resource',
  function LogInService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/loginLocal', {}, {
    });
  }]);

  myServices.factory('UserProfileService', ['$resource',
  function UserProfileService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/users/:userId/', {}, {
      save:{
        method: 'POST',
        params:{userId: '@userId'}
      }
    });
  }]);

  myServices.factory('CsrfService', ['$resource',
  function CsrfService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/api/csrf', {}, {
    });
  }]);

  myServices.factory('AutoCompleteOneService', ['$resource',
  function AutoCompleteOneService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    console.log('Service ONE ');
    return function(message) {alert('Service ONE ' + message);};
  }]);

  myServices.factory('AutoCompleteTwoService', ['$resource',
  function AutoCompleteTwoService($resource) {
    // $resource(url, [paramDefaults], [actions], options);
    console.log('Service TWO ');
    return function(message) {alert('Service TWO ' + message);};
  }]);

})();
