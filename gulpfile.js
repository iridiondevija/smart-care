const { src, dest, series, parallel } = require("gulp");
const shell = require("gulp-shell");
const del = require("del");

function clean() {
  return del(["dist", "build"]);
}

function copyCustomFonts() {
  return src("semantic/src/themes/custom/assets/fonts/*").pipe(
    dest("semantic/dist/themes/custom/assets/fonts")
  );
}

function semanticBuild() {
  return src(".", { allowEmpty: true }).pipe(
    shell("cd semantic && npx gulp build")
  );
}

function copySemanticAssets() {
  const mainFiles = src("dist/*.{css,js}").pipe(dest("build/dist"));
  const themeAssets = src("dist/themes/**/*").pipe(dest("build/dist/themes"));
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
  // Using a callback to ensure the semantic build is fully complete
  // This is a simple fix to prevent the race condition.
  (done) => {
    // You could add a small delay here if needed, but it's not ideal.
    // A better approach is to not use gulp-shell for this.
    console.log("Semantic build is complete. Now copying assets...");
    copySemanticAssets();
    copyStaticAssets();
    done();
  }
);
exports.default = exports.build;
