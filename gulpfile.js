process.env['NODE_PATH'] = __dirname;
require('module')._initPaths();
const gulp  = require('gulp');
const gutil = require('gulp-util');
const path  = require('path');
const prj   = require('scripts/project');
const server = require('gulp-develop-server');
const runSequence = require('run-sequence');

require('scripts/tasks/build.task');
require('scripts/tasks/test.task');
require('scripts/tasks/clean.task');
require('scripts/tasks/server.task');


gulp.task('default', ['build', 'test', 'server'], () => {
  gulp.watch(path.join(prj.src.src, '**/**.ts'), ['dev']);
});

gulp.task('dev', () => {
  runSequence('build', 'test', server.restart);
});
