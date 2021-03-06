'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var DEST = './dist/';
var jsfiles = [
'node_modules/dc/dc.js',
'node_modules/d3/d3.js',
'node_modules/crossfilter/crossfilter.js',
'node_modules/boostrap/dist/js/boostrap.js',
'node_modules/jquery/dist/jquery.js',

];
var cssfiles = ['node_modules/bootstrap/dist/css/bootstrap.css','node_modules/bootstrap/dist/css/bootstrap-theme.css','node_modules/dc/dc.css'];
//node_modules/bootstrap/dist/css/bootstrap
//node_modules/jquery/dist/jquery.js

gulp.task('copy', function() {
  gulp.src(jsfiles)
  .pipe(gulp.dest(DEST + 'js'));

  gulp.src(cssfiles)
  .pipe(gulp.dest(DEST + 'css'));
});


gulp.task('minify-css', function() {
  return gulp.src(DEST+ 'css/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(DEST));
});

gulp.task('minify-js', ['copy'],function() {
  return gulp.src(DEST+'js/*.js')
    // This will output the non-minified version
    .pipe(concat('all.js'))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('default', ['minify-css','minify-js']);

