'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var DEST = './dist/';
var jsfiles = [
'dist/js/polyfill.js',
'node_modules/d3/d3.js',
'node_modules/d3-queue/build/d3-queue.js',
'node_modules/crossfilter/crossfilter.js',
'node_modules/dc/dc.js',
'node_modules/jquery/dist/jquery.js',
'node_modules/boostrap/dist/js/boostrap.js',
'node_modules/topojson/dist/topojson.js',

];
var cssfiles = [
'node_modules/bootstrap/dist/css/bootstrap.css',
'node_modules/bootstrap/dist/css/bootstrap-theme.css',
'node_modules/dc/dc.css',
];
//node_modules/bootstrap/dist/css/bootstrap
//node_modules/jquery/dist/jquery.js

gulp.task('copy', function() {
  gulp.src(jsfiles)
  .pipe(gulp.dest(DEST + 'js'));

  gulp.src(cssfiles)
  .pipe(gulp.dest(DEST + 'css'));
});


gulp.task('minify-css', ['copy'], function() {
//  return gulp.src(DEST+ 'css/*.css')
  return gulp.src(cssfiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(DEST));
});

gulp.task('minify-js', ['copy'],function() {
//gulp.src(DEST+'js/*.js')
return gulp.src(jsfiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('default', ['minify-css','minify-js']);

