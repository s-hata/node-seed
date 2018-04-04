const gulp       = require('gulp');
const ts         = require('gulp-typescript');
const tslint     = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const plumber    = require('gulp-plumber');
const path       = require('path');
const merge      = require('merge2');
const prj        = require('scripts/project');

gulp.task('lint', () => {
  return gulp.src(path.join(prj.src.src, '**/*.ts'))
    .pipe(tslint({ configuration: './tslint.json', formatter: 'stylish' }))
    .pipe(tslint.report());
});

gulp.task('build', ['lint'], () => {

  let options = {
    declaration: true,
    isolatedModules: false 
  };

  let tsProject = ts.createProject('tsconfig.json');

  let tsResult = gulp.src(path.join(prj.src.src, '**/*.ts'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsProject());
 
  return merge([
    tsResult.dts
    .pipe(gulp.dest(path.join(prj.src.dest, 'typings'))),
    tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(prj.src.dest, 'js')))
    ]);
});
