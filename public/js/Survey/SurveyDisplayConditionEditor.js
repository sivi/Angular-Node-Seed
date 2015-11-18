/**
 * Created by a on 11/18/2015.
 */
'use strict';
var SurveyDisplayConditionEditor = (function(vm) {
  var init = function(surveyEditor) {
    //alert('init');
    vm = surveyEditor;
    //
    //  -----------------
    //
    vm.getDefaultDisplayCondition = function() {
      return {
        applyCondition: false,
        conditions: []
      };
    };
    //
    //  -----------------
    //
    vm.addDisplayCondition = function() {
      var condition = {
        id: vm.getNewConditionId(),
        show: 'false',
        surveyPageId: 0,
        surveySectionId: 0,
        surveyQuestionId: 0,
        logicalBind: vm.conditionLogicalBind.and,
        constraint: {
          constraintType: vm.conditionConstraintType.contain,
          logicalPositive: vm.conditionLogicalPositive.is,
          key: '',
          userValue: ''
        }

      };
      vm.editingElementDisplayCondition.conditions.push(condition);
    };
    //
    //  -----------------
    //
    vm.removeDisplayConditions = function() {
      vm.editingElementDisplayCondition.conditions = [];
    };
    //
    //  -----------------
    //
    vm.getNewConditionId = function() {
      var id = -1;
      for (var i = 0; i < vm.editingElementDisplayCondition.conditions.length; i++) {
        var condition = vm.editingElementDisplayCondition.conditions[i];
        if (condition.id > id) {
          id = condition.id;
        }
      }
      return id + 1;
    };
    //
    //  -----------------
    //
    vm.conditionPageChanged = function(id) {
      var condition = _.find(vm.editingElementDisplayCondition.conditions, {id: id});
      var page = _.find(vm.pages, {surveyPageId: parseInt(condition.surveyPageId)});

      console.log(JSON.stringify(condition));

      vm.conditionSelectorSections = [];
      for (var i = 0; i < page.sections.length; i++) {
        var section = {
          key: page.sections[i].key,
          surveySectionId: page.sections[i].surveySectionId
        };
        vm.conditionSelectorSections.push(section);
      }
    };
    //
    //  -----------------
    //
    vm.conditionSectionChanged = function(id) {
      var condition = _.find(vm.editingElementDisplayCondition.conditions, {id: id});
      var page = _.find(vm.pages, {surveyPageId: parseInt(condition.surveyPageId)});
      var section = _.find(page.sections, {surveySectionId: parseInt(condition.surveySectionId)});
      vm.conditionSelectorQuestions = [];
      for (var i = 0; i < section.questions.length; i++) {
        var question = {
          key: section.questions[i].key,
          surveyQuestionId: section.questions[i].surveyQuestionId
        };
        vm.conditionSelectorQuestions.push(question);
      }
    };
    //
    //  -----------------
    //
    vm.conditionQuestionChanged = function(id) {
      var condition = _.find(vm.editingElementDisplayCondition.conditions, {id: id});
      var page = _.find(vm.pages, {surveyPageId: parseInt(condition.surveyPageId)});
      var section = _.find(page.sections, {surveySectionId: parseInt(condition.surveySectionId)});
      var question = _.find(section.questions,
          {surveyQuestionId: parseInt(condition.surveyQuestionId)});

      vm.conditionSelectorValueOptions = [];
      for (var i = 0; i < question.valueOptions.length; i++) {
        var valueOption = {
          key: question.valueOptions[i].key,
          label: question.valueOptions[i].label
        };
        vm.conditionSelectorValueOptions.push(valueOption);
      }
    };
  };
  return {
    init: init
  };
})();
