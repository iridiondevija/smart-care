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
// This task separates the CSS/JS from the theme assets and copies them
// to a location that aligns with the paths in the compiled CSS.
function copySemanticAssets() {
  // Copy the main CSS/JS files to a 'dist' folder
  const mainFiles = src("semantic/dist/*.{css,js}").pipe(dest("build/dist"));

  // Copy all themes (which contain fonts, images) to the root of the build
  const themeAssets = src("semantic/dist/themes/**/*").pipe(
    dest("build/themes")
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
