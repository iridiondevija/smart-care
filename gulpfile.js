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

function copyStaticAssets() {
  return src([
    "**/*",
    "!semantic", // Exclude the semantic source folder
    "!semantic/**",
    "!node_modules",
    "!node_modules/**",
    "!dist", // Exclude the new dist folder, it's already built.
    "!dist/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!README.md",
  ]).pipe(dest("build"));
}

exports.build = series(clean, semanticBuild, copyStaticAssets);
exports.default = exports.build;
