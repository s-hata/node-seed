const gulp   = require('gulp');
const gutil  = require('gulp-util');
const server = require('gulp-develop-server');
const path   = require('path');
const prj    = require('scripts/project');


gulp.task('server', () => {
  return server.listen({ path: path.join(prj.src.dest, 'js/bootstrap.js' )});
});
