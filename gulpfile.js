const { task, watch, src, dest, parallel } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const webpack = require('webpack-stream');

const { reload, stream } = browserSync;

task('server', function () {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 3000,
  });

  watch('dist/*.html').on('change', reload);
});

task('styles', function () {
  return src('src/scss/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css'))
    .pipe(stream());
});

task('watch', function () {
  watch('src/scss/**/*.+(scss|sass|css)', parallel('styles'));
  watch('src/*.html', parallel('html')); 
  watch('src/js/**/*.js').on('change', parallel('webpack'));
  watch('src/fonts/**/*').on('all', parallel('fonts'));
  watch('src/icons/**/*').on('all', parallel('icons'));
  watch('src/img/**/*').on('all', parallel('images'));
});

task('html', function () {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
});

task('webpack', function () {
  return src('src/js/script.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(dest('dist/js'));
});

task('fonts', function () {
  return src('src/fonts/**/*').pipe(dest('dist/fonts')).pipe(stream());
});

task('icons', function () {
  return src('src/icons/**/*').pipe(dest('dist/icons')).pipe(stream());
});

task('images', function () {
  return src('src/img/**/*').pipe(dest('dist/img')).pipe(stream());
});

task(
  'build',
  parallel('styles', 'html', 'webpack', 'fonts', 'icons', 'images')
);

task(
  'default',
  parallel(
    'watch',
    'server',
    'styles',
    'webpack',
    'fonts',
    'icons',
    'html',
    'images'
  )
);
