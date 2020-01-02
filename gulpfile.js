"use strict";

var gulp        = require('gulp');
var	less        = require('gulp-less');
var plumber = require("gulp-plumber"); //плагин чтоб не слетело во время ошибок
var postcss = require("gulp-postcss"); // плагин для автопрефикса, минифик
var autoprefixer = require("autoprefixer"); // автопрефикс для браузеров
var server = require("browser-sync").create(); //автоперазгрузки браузера
var mqpacker = require("css-mqpacker"); //обьединение медиавыражения, объединяем «одинаковые селекторы» в одно правило
var minify = require("gulp-csso"); //минификация css
var rename = require("gulp-rename"); // перемейноввывние имя css
var imagemin = require("gulp-imagemin"); // ужимаем изображение
var svgstore = require("gulp-svgstore"); // собиральщик cvg
var svgmin = require("gulp-svgmin"); // свг минификация
var run = require("run-sequence"); //запуск плагинов очередью
var del = require("del"); //удаление ненужных файлов
var concat = require('gulp-concat'); // Конкатинация
var uglify = require('gulp-uglify'); // минификация js
var fileinclude = require('gulp-file-include'); //include html
const sortCSSmq = require('sort-css-media-queries'); //сортировка медиа запросов

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
      "src/fonts/**",
      "src/img/**",
      "src/js/**",
      "src/css/**",
      "src/*.html",
      "src/*.css"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task('copy:webfonts', function() {
  return gulp.src('src/fontawesome/webfonts/**')
  .pipe(gulp.dest('build/webfonts'));
});

gulp.task('less', function(){
	gulp.src('src/less/main.less')
  .pipe(plumber())
	.pipe(less())
  .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 versions'
      ]}),
      mqpacker ({
        sort: sortCSSmq
      })
    ]))
  .pipe(gulp.dest('build/css/.'))
  .pipe(minify({comments:false}))
  .pipe(rename('build/css/style.min.css'))
  .pipe(gulp.dest('.'))
  //.pipe(rename('src/_include/css/style.min.css'))
  //.pipe(gulp.dest('.'))
	.pipe(server.stream())
});

gulp.task("img", function() {
  return gulp.src('src/img/**')
  .pipe(gulp.dest('build/img'));
});

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    //'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    'node_modules/owl.carousel/dist/owl.carousel.min.js',
    'src/fancybox-master/dist/jquery.fancybox.js',
    'src/js/**'
  ])
  .pipe(plumber())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'));
});

gulp.task('delsrc', function() {
  del.sync('build/src/');
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    'copy:webfonts',
    'js',
    'img',
    'less',
    'html',
    'delsrc',
    fn
  );
});



gulp.task("serve", function() {
  server.init({
    server: "build/."
  });
  gulp.watch("src/less/**/*.less", ["less"]);
  gulp.watch(['src/img/**'], ['watch:img']);
  gulp.watch(['src/*.html', 'src/_include/*.html'], ['watch:html']);
  gulp.watch(['src/js/*.js'], ['watch:js']);
});

gulp.task('watch:html', ['html'], reload);
gulp.task('watch:js', ['js'], reload);
gulp.task('watch:img', ['img'], reload);

function reload(done) {
  server.reload();
  done();
}