const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

// 🆕 NEW FUNCTION 🆕
// This task explicitly copies custom font files before the Fomantic build.
function copyCustomFonts() {
  return src("semantic/src/themes/default/assets/fonts/*").pipe(
    dest("semantic/dist/themes/default/assets/fonts")
  );
}

function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

// ⚠️ CORRECTED FUNCTION ⚠️
function copySemanticAssets() {
  const mainFiles = src("semantic/dist/*.{css,js}").pipe(dest("build/dist"));
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
  // 🆕 ADDED TASK 🆕
  copyCustomFonts,
  semanticBuild,
  parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
