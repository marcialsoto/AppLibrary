const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const browserify = require('browserify');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

let paths = {
  dest: 'dist/',
  src: 'assets/',
  styles: {
      src: './assets/styles/app.scss',
      dest: './dist/styles',
      fileName: 'app.css',
      minifiedFileName: 'app.min.css',
      watch: './assets/styles/**/*.scss'
  },
  pug: {
      src: './assets/views/*.pug',
      dest: './',
      watch: './assets/views/'
  },
  scripts: {
      require: ['jquery', 'chartkick', 'datatables.net-responsive-bs4', 'swiper', 'toastr', 'simplebar', 'flatpickr', 'inputmask'],
      src: './assets/scripts/vendor.js',
      dest: './dist/scripts',
      fileName: 'vendor.js',
      minifiedFileName: 'vendor.min.js',
      watch: './assets/scripts/*.js'
  },
  image: {
      src: './assets/images/*',
      dest: './dist/images'
  },
  font: {
      src: './assets/fonts/*',
      dest: './dist/fonts'
  },
  misc: {
      src: ['./*.{ico,png,txt}', './.htaccess'],
      dest: './dist/'
  },
  sync: {
      server: true
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'dist' ]);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  browserSync.init(paths.sync);

  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);