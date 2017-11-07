const gulp       = require('gulp');
const ts         = require('gulp-typescript');
const tslint     = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const plumber    = require('gulp-plumber');
const path       = require('path');
const prj        = require('scripts/project');

gulp.task("lint", function() {
  return gulp.src(path.join(prj.src.src, '**/*.ts'))
    .pipe(tslint({ configuration: "./tslint.json", formatter: "stylish" }))
    .pipe(tslint.report());
});

gulp.task('build', ['lint'], () => {

  let tsProject = ts.createProject('tsconfig.json');

  let tsResult = gulp.src(path.join(prj.src.src, '**/*.ts'))
    //.pipe(tsProject())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts({ isolatedModules: true }));
 
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(prj.src.dest));
});
