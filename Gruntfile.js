// Generated on 2015-11-04 using generator-angular-fullstack 2.1.1
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  // https://github.com/shootaroo/jit-grunt
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control',
    filerev: 'grunt-filerev'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    projectRoot: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist',
      dist2: 'dist2'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      injectJS: {
        files: [
          '<%= projectRoot.client %>/{app,components}/**/*.js',
          '!<%= projectRoot.client %>/{app,components}/**/*.spec.js',
          '!<%= projectRoot.client %>/{app,components}/**/*.mock.js',
          '!<%= projectRoot.client %>/app/app.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= projectRoot.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: [
          '<%= projectRoot.client %>/{app,components}/**/*.spec.js',
          '<%= projectRoot.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      injectSass: {
        files: [
          '<%= projectRoot.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= projectRoot.client %>/{app,components}/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= projectRoot.client %>/{app,components}/*',
          '<%= projectRoot.client %>/{app,components}/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.html',
          
          '{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.js',
          
          '!{.tmp,<%= projectRoot.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.mock.js',
          '<%= projectRoot.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= projectRoot.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        '<%= projectRoot.client %>/{app,components}/**/*.js',
        '!<%= projectRoot.client %>/{app,components}/**/*.spec.js',
        '!<%= projectRoot.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= projectRoot.client %>/{app,components}/**/*.spec.js',
          '<%= projectRoot.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    // Empties folders to start fresh
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectRoot.dist %>/*',
            '!<%= projectRoot.dist %>/.git*',
            '!<%= projectRoot.dist %>/.openshift',
            '!<%= projectRoot.dist %>/Procfile'
          ]
        }]
      },
      dist2: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectRoot.dist2 %>/*',
            '!<%= projectRoot.dist2 %>/.git*',
            '!<%= projectRoot.dist2 %>/.openshift',
            '!<%= projectRoot.dist2 %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    // https://github.com/taptapship/wiredep
    wiredep: {
      target: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: ['<%= projectRoot.client %>/index.html'],
        ignorePath: '<%= projectRoot.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ],
        options: {
            // See wiredep's configuration documentation for the options
            // you may pass:

            // https://github.com/taptapship/wiredep#configuration
        }
        
      }
    },

    // Renames files for browser caching purposes
    // https://github.com/yeoman/grunt-filerev
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      dist1: {
          src: [
            '<%= projectRoot.dist %>/public/{,*/}*.js',
            '<%= projectRoot.dist %>/public/{,*/}*.css',
            '<%= projectRoot.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= projectRoot.dist %>/public/assets/fonts/*'
          ]
      },
      dist2: {
          src: [
            '<%= projectRoot.dist2 %>/public/{,*/}*.js',
            '<%= projectRoot.dist2 %>/public/{,*/}*.css',
            '<%= projectRoot.dist2 %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= projectRoot.dist2 %>/public/assets/fonts/*'
          ]
      }
    },
    /*
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      basic: {
        src: ['src/main.js'],
        dest: 'dist/basic.js',
      },
      extras: {
        src: ['src/main.js', 'src/extras.js'],
        dest: 'dist/with_extras.js',
      },
    },
    */
    /*
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      dist: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      },
      dist2: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    },
    */
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    // http://grunt-tasks.com/grunt-usemin/
    // http://stackoverflow.com/questions/20517827/grunt-usemin-and-useminprepare-multiple-targets
    useminPrepare: {
      html: ['<%= projectRoot.client %>/index.html'],
      options: {
        dest: '<%= projectRoot.dist %>/public'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    // http://grunt-tasks.com/grunt-usemin/
    // https://www.npmjs.com/package/grunt-usemin
    // https://github.com/yeoman/grunt-usemin
    usemin: {
      html: ['<%= projectRoot.dist %>/public/{,*/}*.html'],
      css: ['<%= projectRoot.dist %>/public/{,*/}*.css'],
      js: ['<%= projectRoot.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= projectRoot.dist %>/public',
          '<%= projectRoot.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= projectRoot.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= projectRoot.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'buildTestApp',
        // http://grunt-tasks.com/grunt-htmlmin/
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= projectRoot.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= projectRoot.dist %>/public/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    // It is executed AFTER concurent:dist task !!!
    // http://grunt-tasks.com/grunt-contrib-copy/
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= projectRoot.client %>',
          dest: '<%= projectRoot.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= projectRoot.dist %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= projectRoot.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      dist2: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= projectRoot.client %>',
          dest: '<%= projectRoot.dist2 %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*'
          ]
        }, {
          dest: '<%= projectRoot.dist2 %>/public/index2.html',
          src: [
            '<%= projectRoot.client %>/index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= projectRoot.dist2 %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= projectRoot.dist2 %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= projectRoot.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'jade',
        'sass',
      ],
      test: [
        'jade',
        'sass',
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'jade',
        'sass',
        //'imagemin', // requires OptiPNG installation ???
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    // Compiles Jade to html
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>',
          src: [
            '{app,components}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    },

    // Compiles Sass to CSS
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      server: {
        options: {
          loadPath: [
            '<%= projectRoot.client %>/bower_components',
            '<%= projectRoot.client %>/app',
            '<%= projectRoot.client %>/components'
          ],
          compass: false
        },
        files: {
          '.tmp/app/app.css' : '<%= projectRoot.client %>/app/app.scss'
        }
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= projectRoot.client %>/index.html': [
               [
                 
                 '{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.js',
                 
                 '!{.tmp,<%= projectRoot.client %>}/app/app.js',               
                 '!{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.spec.js',
                 '!{.tmp,<%= projectRoot.client %>}/{app,components}/**/*.mock.js'               
               ]
            ]
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= projectRoot.client %>/app/app.scss': [
            '<%= projectRoot.client %>/{app,components}/**/*.{scss,sass}',
            '!<%= projectRoot.client %>/app/app.{scss,sass}'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= projectRoot.client %>/index.html': [
            '<%= projectRoot.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass', 
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:sass', 
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass', 
        'concurrent:test',
        'injector',
        'autoprefixer',
        'karma'
      ]);
    }

    else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        'injector:sass', 
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'injector:sass', 
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'copy:dist2',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
