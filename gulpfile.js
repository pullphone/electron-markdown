var gulp = require('gulp'), $ = require('gulp-load-plugins')();
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var electronServer = require('electron-connect').server;
var fs = require('fs');
var packager = require('electron-packager');
var packageJson = require('./package.json');

var renderSrcDir = 'src/render/';
var browserSrcDir = 'src/browser/';
var buildDir = 'build/';
var distDir = 'dist/';
var releaseDir = 'release/';

var common = {
  isWatchify: true,
  isUglify: false,
  dest: buildDir,
};
gulp.task('common-to-build', () => {
  common.isWatchify = false;
  common.isUglify = true;
  common.dest = distDir;
});

// transpile for rendering process
gulp.task('bundle', $.watchify(function(watchify) {
  return gulp.src(renderSrcDir + 'app.js')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe(watchify({
      watch: common.isWatchify,
      debug: true,
      verbose: true,
      transform: ['babelify'],
    }))
    .pipe(buffer())
    .pipe($.if(
      common.isUglify, $.uglify()
    ))
    .pipe($.rename('bundle.js'))
    .pipe(gulp.dest(common.dest));
}));
gulp.task('bundle:build', ['common-to-build', 'bundle']);

// es6 to 5 for browser process
gulp.task('compile', $.watchify(function(watchify) {
  return gulp.src(browserSrcDir + 'main.js')
    .pipe(watchify({
      watch: common.isWatchify,
      debug: true,
      verbose: true,
      transform: ['babelify'],
      ignoreMissing: true,
      detectGlobals: false,
      builtins: [],
    }))
    .pipe(buffer())
    .pipe($.if(
      common.isUglify, $.uglify()
    ))
    .pipe(gulp.dest(common.dest));
}));
gulp.task('compile:build', ['common-to-build', 'compile']);

// copy entry html to dist or serve directory
gulp.task('html:build', () => {
  return gulp.src((renderSrcDir + 'index.html'))
    .pipe($.useref())
    .pipe(gulp.dest(distDir))
});
gulp.task('html:debug', () => {
  return gulp.src((renderSrcDir + 'index.html'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('debug', ['bundle', 'compile', 'html:debug'], () => {
  var electron = electronServer.create();
  electron.start();
  $.watch(buildDir + 'main.js', electron.restart);
  $.watch([buildDir + 'bundle.js', buildDir + 'index.html'], electron.reload);
});

gulp.task('packageJson', done => {
  var json = _.cloneDeep(packageJson);
  json.main = 'main.js';
  delete json.devDependencies;
  delete json.scripts;
  fs.writeFile(distDir + '/package.json', JSON.stringify(json), function (err) {
    done();
  });
});

gulp.task('build', ['bundle:build', 'compile:build', 'html:build', 'packageJson']);
gulp.task('run', ['build'], () => {
  var electron = electronServer.create({path: distDir});
  electron.start();
});

gulp.task('package', ['darwin'/*, 'win32', 'linux'*/].map(function (platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, ['build'], function (done) {
    packager({
      dir: distDir,
      name: packageJson.applicationName,
      arch: 'x64',
      platform: platform,
      out: releaseDir + '/' + platform,
      version: '0.36.8',
      overwrite: true,
    }, function (err) {
      done();
    });
  });
  return taskName;
}));
