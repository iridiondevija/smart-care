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

// 🆕 UPDATED TASK 🆕
// This task now ensures Fomantic's dependencies are installed before building.
function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell([
      // First, install the necessary dependencies inside the semantic folder.
      "cd semantic && npm install",
      // Second, run the Fomantic build command.
      "cd semantic && npx gulp build",
    ])
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
  copyCustomFonts,
  semanticBuild,
  parallel(copySemanticAssets, copyStaticAssets)
);
exports.default = exports.build;
