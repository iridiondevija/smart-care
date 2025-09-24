const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

function installSemantic() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npm install")
  );
}

function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

function copyStaticAssets() {
  return src([
    "**/*",
    "!semantic",
    "!semantic/**",
    "!node_modules",
    "!node_modules/**",
    "!dist",
    "!dist/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!README.md",
  ]).pipe(dest("build"));
}

// The main build task that runs all steps in a specific order
exports.build = series(
  clean, // Start with a clean slate
  installSemantic, // Install dependencies first
  semanticBuild, // Build Fomantic UI and output to the dist folder
  copyStaticAssets // Copy all other static assets to the final build folder
);

exports.default = exports.build;
