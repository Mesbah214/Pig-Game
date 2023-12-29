// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
// Importing all the Gulp-related packages we want to use
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require('sass'));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browsync = require("browser-sync").create();
var replace = require("gulp-replace");

// File paths
const files = {
  scssPath: "app/scss/**/*.scss",
  jsPath: "app/js/**/*.js",
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest("./dist/css")) // put final CSS in dist folder
    .pipe(browsync.stream());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath,
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("./dist/js"));
}

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["./dist/index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("./dist"));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true }, //Makes docker work
    series(parallel(scssTask, jsTask), cacheBustTask)
  );
  browsync.init({
    server: {
      baseDir: "./dist",
    },
  });
  watch("./dist/*.html").on("change", browsync.reload);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(parallel(scssTask, jsTask), cacheBustTask, watchTask);

exports.build = series(scssTask, jsTask)
