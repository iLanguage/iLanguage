'use strict';

module.exports = function(grunt) {
  // Show elapsed time at the end.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        // src: ['src/<%= pkg.name %>.js'],
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'dist/app_bundle.js',
      options: {
        specs: 'dist/test_bundle.js',
        vendor: []
      }
    },
    jasmine_node: {
      specNameMatcher: 'spec',
      specFolders: ['test/spec/common'],
      projectRoot: './',
      requirejs: false,
      forceExit: false,
      isVerbose: true,
      showColors: true,
      jUnit: {
        report: true,
        savePath: './build/reports/jasmine/',
        consolidate: true,
        useDotNotation: false
      }
    },
    browserify: {
      main: {
        src: ['./src/browser/app.js'],
        dest: 'dist/app_bumdle_main.js',
        options: {
          alias: ['./src/browser/app.js:sampleapp'],
          ignore: ['src/node/**/*.js']
        }
      },
      src: {
          src: ['src/common/**/*.js', 'src/browser/**/*.js'],
          dest: 'dist/app_bundle.js',
          options: {
              alias: ['./src/browser/App.js:SampleApp'],
              externalize: ['src/common/**/*.js', 'src/browser/**/*.js'],
              ignore: ['src/node/**/*.js']
          }
      },
      test: {
          src: ['test/spec/common/**/*.js', 'test/spec/browser/**/*.js'],
          dest: 'dist/test_bundle.js',
          options: {
              external: ['./src/**/*.js'],
              ignore: ['./node_modules/underscore/underscore.js']
          }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'jasmine_node']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'jasmine_node']
      },
      all: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['debug']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'concat', 'uglify']);
  grunt.registerTask('debug', ['jshint', 'jasmine_node', 'concat']);
};
