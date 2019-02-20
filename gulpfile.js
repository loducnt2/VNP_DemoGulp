
"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
// const pug = require("pug");
const gpug = require('gulp-pug');
const sass = require("gulp-sass");
const webpack = require("webpack");
//const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "app"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["assets"]);
}

// Optimize Images
//function images() {
 // return gulp
    //.src("app/images/**/*")
    //.pipe(newer("/app/images"))
    /*.pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("app/images"));
}*/

// CSS task
function css() {
  return gulp
    .src("app/scss/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
//    .pipe(rename({ suffix: ".min" }))
//    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("app/css"))
    .pipe(browsersync.stream());
}
 //html task
//function pug() {
//  return gulp
//    .src("app/index.pug")
//    .pipe(plumber())
//    .pipe(gpug({pretty: true}))
//    .pipe(gulp.dest('dist'))
//    .pipe(browsersync.stream());
//}
 
// Lint scripts
function scriptsLint() {
  return gulp
    .src(["app/js/**/*", "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
   gulp
      .src(["app/js/**/*"])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("app/js/"))
      .pipe(browsersync.stream())
  );
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// Watch files
function watchFiles() {
  gulp.watch("app/scss/**/*", css);
//  gulp.watch("app**/*", pug);
  gulp.watch("app/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
     "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
     "./_posts/**/*",
      "./_projects/**/*"
    ],
    gulp.series(jekyll, browserSyncReload)
  );
  //gulp.watch("app/images/**/*", images);
  gulp.watch("app/**/*", browserSyncReload);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
//const build = gulp.series(clean, gulp.parallel(css, pug , images, jekyll, js));
const build = gulp.series(clean, gulp.parallel(css, jekyll, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
//exports.images = images;
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
//exports.pug = pug;
exports.default = build;