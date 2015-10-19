'use strict';

module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
      /*
          note order of file inclusion !!!
      */
      'public/bower_components/requirejs/require.js',
      'public/bower_components/lodash/lodash.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/d3/d3.js',
      'public/bower_components/rangy/rangy-core.js',
      'public/bower_components/rangy/rangy-selectionsaverestore.js',
      'public/bower_components/textAngular/dist/textAngular-sanitize.min.js',
      'public/bower_components/textAngular/dist/textAngular-rangy.min.js',
      'public/bower_components/textAngular/dist/textAngular.min.js',
      'public/js/app.js',
      'public/js/services.js',
      'public/js/controllers.js',
      'public/js/autoComplete.js',
      'public/js/directives/autoCompleteDirective.js',
      'public/js/userControllers.js',
      'public/js/toggleController.js',
      'public/js/sortableTableController.js',
      'public/js/surveyCreateCtrl.js',
      'public/js/svgDiagramController.js',
      'public/js/filters.js',
      'public/js/directives/directives.js',
      'public/js/directives/starRatingDirective.js',
      'test/unit/public/view1_test.js'
    ],

    autoWatch : true,
    preprocessors: {
      'test/unit/*.js': ['browserify'] //Mention path as per your test js folder
    },
    frameworks: ['browserify', 'jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-browserify'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
