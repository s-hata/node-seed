const gulp       = require('gulp');
const gutil      = require('gulp-util');
const jasmine    = require('gulp-jasmine');
const reporters  = require('jasmine-reporters');
const istanbul = require('gulp-istanbul');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const path       = require('path');
const prj        = require('scripts/project');

gulp.task('pre-test', function () {
  return gulp.src([path.join(prj.src.dest, 'js/**.js'), '!**/*[Ss]pec.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('_test', ['pre-test'], () => {

  let jasmineOptions = {
    spec_dir: path.join(prj.src.dest, 'js'),
    stopSpecOnExpectationFailure: false
  };

  let reporterOptions = {
    savePath: path.join(prj.reports.dest, 'ut'),
    consolidateAll: false
  };

  //let reporter = new reporters.JUnitXmlReporter(reporterOptions);
  let reporter = new reporters.TerminalReporter(reporterOptions);

  let coverageOptions = {
    dir: path.join(prj.reports.dest, 'ut-coverage'),
    reporters: [ 'json', 'text' ],
    reportOpts: { dir: path.join(prj.reports.dest, 'ut-coverage') }
  };

  gulp.src(path.join(prj.src.dest, '**/*[sS]pec.js'))
      .pipe(jasmine({
        // reporter: reporter,
        config: jasmineOptions
      }))
      .pipe(istanbul.writeReports(coverageOptions))
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }))
      .on('error', (error) => {
      });
});

gulp.task('test', ['_test'], function () {
  return gulp.src(path.join(prj.reports.dest, 'ut-coverage/coverage-final.json'))
    .pipe(remapIstanbul({
      reports: {
        'json': path.join(prj.reports.dest, 'ut-coverage/coverage.json'),
        'html': path.join(prj.reports.dest, 'ut-coverage/html-report')
      }
    }));
});
