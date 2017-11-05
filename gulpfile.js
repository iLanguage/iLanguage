'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rename = require('gulp-rename');

var browserify = require('browserify');
// var vinylTransform = require('vinyl-transform');
// var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var through2 = require('through2');

var paths = {
  jshint: ['./gulpfile.js'],
  watch: ['./gulpfile.js', './js/**/*.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*-spec.js', '!test/{temp,temp/**}'],
  source: ['./js/*.js', './js/lexicon/*.js']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('jshint', function() {
  return gulp.src(paths.jshint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function(cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.jasmine())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('bump', ['test'], function() {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({
      type: bumpType
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function() {
  gulp.watch(paths.watch, ['test']);
});

/**
https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
https://github.com/substack/node-browserify/issues/1044
*/

gulp.task('browserify', function() {
  var browserified = through2.obj(function(file, enc, next) {
    var options = {
      shim: {
        fielddb: {
          path: './node_modules/fielddb/fielddb.js',
          exports: 'fielddb'
        }
      },
    };
    if (false) {
      console.log("Old options", options);
    }
    browserify({
        // outfile: 'ilanguage.js',
        extension: '.min.js',
        entries: [file.path],
        standalone: "ILanguage",
        derequire: false
      })
      // .transform('stripify')  /* TODO export iLanguage */
      .bundle(function(err, res) {
        if (err) {
          console.log("unable to browserify. ", err.stack, res);
          return;
        }
        // assumes file.contents is a Buffer
        file.contents = res;
        next(null, file);
      });
  });

  return gulp.src(['./js/ilanguage.js'])
    .pipe(browserified)
    .pipe(rename("ilanguage.js"))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename("ilanguage.min.js"))
    .pipe(gulp.dest('./'));
});


/**
https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
*/
// gulp.task('naivebrowserify', function() {
//   return browserify('./js/ilanguage.js')
//     .bundle()
//     .pipe(source('ilanguage.min.js'))
//     .pipe(gulp.dest('./'));
// });

gulp.task('test', ['jshint', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['test', 'browserify']);
