const gulp  = require('gulp');
const gutil = require('gulp-util');
const spawn = require('child_process').spawn;

let server;

gulp.task('startup', () => {
  gutil.log('Start up this application:\n');
  server = spawn('node', ['dist/bootstrap.js']);
  server.stdout.setEncoding('utf8');
  server.stdout.on('data', data => {
    gutil.log(data);
  });
  server.stderr.setEncoding('utf8');
  server.stderr.on('data', data => {
    gutil.log(data);
  });
});

gulp.task('shutdown', () => {
  if (server) {
    gutil.log('Shutdown server application:\n');
    server.kill();
  }
});

process.on('SIGINT', () => {
  if (server) {
    gutil.log('Shutdown server application:\n');
    server.kill();
  }
});
