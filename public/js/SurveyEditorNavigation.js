/**
 * Created by a on 11/16/2015.
 */

'use strict';
var SurveyEditorNavigation = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    alert('init');
    vm = surveyEditor;

    vm.propagateExternally = function() {
      alert('propagate');
      vm.callChild();
    };
  };
  return {
    init: init
  };
})();

