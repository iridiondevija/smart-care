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

exports.build = series(
  clean,
  copyCustomFonts,
  installSemantic,
  semanticBuild,
  copyStaticAssets // 👈 Removed parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
