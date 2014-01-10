'use strict';

module.exports = function(grunt) {
  // Show elapsed time at the end.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %>.js - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "" + pkg.homepage + "\\n" : "" %>' +
      '\nCopyright (c) 2009 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
      'Licensed:  <%= pkg.licenses[0].type %> \n*/\n \n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/main_bundle.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= browserify.src.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'dist/main_bundle.js',
      options: {
        specs: 'dist/test_bundle.js',
        vendor: 'dist/vendor.js'
      }
    },
    jasmine_node: {
      specNameMatcher: 'spec',
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
      src: {
        src: ['src/common/<%= pkg.name %>.js'],
        dest: 'dist/main_bundle.js',
        options: {
          ignore: ['src/node/**/*.js', 'src/common/core/*.js'],
          shim: {}
        }
      },
      test: {
          src: ['test/spec/common/**/*.js', '!test/spec/common/core/*.js', 'test/spec/browser/**/*.js'],
          dest: 'dist/test_bundle.js'
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
        src: ['src/**/*.js', '!src/common/core/*.js']
      },
      test: {
        src: ['test/**/*.js', '!test/spec/common/core/*.js']
      }
    },
    watch: {
      all: {
        files: ['src/**/*.js', 'test/spec/**/*.js', 'Gruntfile.js'],
        tasks: ['debug']
      },
      web: {
        files: ['src/**/*.js', 'test/spec/**/*.js', 'Gruntfile.js'],
        tasks: ['debugweb']
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
  grunt.registerTask('debug', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'concat']);
  grunt.registerTask('debugweb', ['jshint', 'browserify', 'jasmine', 'concat']);
};
