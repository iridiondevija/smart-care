const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

function copyCustomFonts() {
  return src("semantic/src/themes/custom/assets/fonts/*").pipe(
    dest("semantic/src/themes/default/assets/fonts")
  );
}

function installSemantic() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npm install")
  );
}

// The build task now depends on the installation task
function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

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
  installSemantic,
  semanticBuild,
  copyCustomFonts,
  parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
