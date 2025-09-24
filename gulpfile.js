const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

// 🆕 Corrected Task 🆕: Copy fonts to the *source* folder.
function copyCustomFonts() {
  return src("semantic/src/themes/custom/assets/fonts/*").pipe(
    dest("semantic/src/themes/default/assets/fonts")
  );
}

function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

function copySemanticAssets() {
  // Now this will correctly copy from semantic/dist after a successful build.
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
  copyCustomFonts,
  semanticBuild,
  parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
