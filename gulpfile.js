const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const jade = require('gulp-jade')
const imagemin = require('gulp-imagemin')
const browsersync = require('browser-sync')
const beeper = require('beeper')
const plumber = require('gulp-plumber')

const onError = err => {
  beeper()
  console.log(err)
}

// SASS taks
gulp.task('sass', () => {
  return gulp
    .src('dev/css/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
})

// Styles task
gulp.task('styles', () => {
  return gulp
    .src('dev/css/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('style.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('jade', () => {
  gulp
    .src('dev/*.jade')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
})

// Images task
gulp.task('images', () => {
  return gulp
    .src('dev/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

// Browser Sync task
gulp.task('browsersync', cb => {
  return browsersync({
    server: {
      baseDir: './dist'
    }
  }, cb)
})

// Watch task
gulp.task('watch', () => {
  gulp.watch('dev/css/*.sass', ['sass', browsersync.reload])
  gulp.watch('dev/css/*.css', ['styles', browsersync.reload])
  gulp.watch('dev/img/*', ['images', browsersync.reload])
  gulp.watch('dev/*.jade', ['jade', browsersync.reload])
})

// Default task
gulp.task('default', ['sass', 'styles', 'images', 'jade', 'browsersync', 'watch'])
