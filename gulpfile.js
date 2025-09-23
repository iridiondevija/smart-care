const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

// ⚠️ CORRECTED FUNCTION ⚠️
// This task now copies assets to the correct, relative paths.
function copySemanticAssets() {
  // This correctly copies the main CSS/JS files into 'build/dist'
  const mainFiles = src("semantic/dist/*.{css,js}").pipe(dest("build/dist"));

  // This correctly copies the 'themes' folder INTO the 'dist' folder
  const themeAssets = src("semantic/dist/themes/**/*").pipe(
    dest("build/dist/themes")
  );

  return Promise.all([mainFiles, themeAssets]);
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

exports.build = series(
  clean,
  semanticBuild,
  parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
