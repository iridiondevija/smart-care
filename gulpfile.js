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

// ⚠️ Corrected function ⚠️
function copySemanticAssets() {
  // Copies the entire 'semantic/dist' folder's contents to 'build/dist'
  return src("semantic/dist/**/*").pipe(dest("build/dist"));
}

function copyStaticAssets() {
  return src([
    "**/*",
    "!semantic", // Exclude the semantic source folder
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
