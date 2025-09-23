const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

// Task to run the Fomantic UI build process
// The 'return' statement is crucial for Gulp to wait for completion
function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

// Task to copy all static assets to a new 'build' folder
function copyAssets() {
  return src([
    "**/*",
    "!node_modules",
    "!node_modules/**",
    "!semantic",
    "!semantic/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!README.md",
  ]).pipe(dest("build"));
}

// Clean the build directory before creating a new one
function clean() {
  return del(["build"]);
}

// Define the main 'build' task
exports.build = series(clean, semanticBuild, copyAssets);

// Set 'build' as the default task
exports.default = exports.build;
