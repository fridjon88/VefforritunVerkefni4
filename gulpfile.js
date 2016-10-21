const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

gulp.task('lint-javascript', () => {
  return gulp.src(['src/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint-scss', () => {
  return gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(["./*.html", "src/*"]).on("change", browserSync.reload);
    gulp.watch("src/*.js", ['babel']);
    gulp.watch("src/*.scss", ['sass']);
});


gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('babel', () => {
  return gulp.src('src/main.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', ['lint-scss', 'lint-javascript']);

gulp.task('default', ['lint', 'sass', 'babel', 'serve']);
