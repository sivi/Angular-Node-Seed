/**
 * Created by a on 9/7/2015.
 */
(function() {
'use strict';

var onPageLoaded = function() {
  //alert('LOAD');
  // scope is not available here !!!
  // use $watch('$viewContentLoaded') instead !!!
  //var scope = angular.element(document.getElementById('AppWrapperDIV')).scope();
  //alert('bbb ' + scope);
};

window.onload = onPageLoaded();
})();
