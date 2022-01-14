const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const minify = require("@node-minify/core");
const gcc = require("@node-minify/google-closure-compiler");
const cleanCSS = require("@node-minify/clean-css");
const htmlMinifier = require("@node-minify/html-minifier");
const { inlineScriptTags } = require("inline-scripts");
const inlineHtmlStyles = require("inline-scripts/src/inlineStylesheets");

async function inlineScriptsAndStyles(tmp) {
  let html = await inlineScriptTags(path.join(tmp, "index.html"));
  fs.writeFileSync(path.join(tmp, "index-inlined-scripts.html"), html);
  html = await inlineHtmlStyles(path.join(tmp, "index-inlined-scripts.html"));
  fs.writeFileSync(path.join(tmp, "index-inlined.html"), html);
  rimraf.sync(path.join(tmp, "index-inlined-scripts.html"));
}

function prepareFolders(dirs) {
  for (const dir of dirs) {
    rimraf.sync(dir);
    fs.mkdirSync(dir);
  }
}

async function run() {
  const src = "./src";
  const dist = "./dist";
  const tmp = "./.tmp";
  const jsPattern = "**/*.js";
  const cssPattern = "**/*.css";

  const labelPrepare = "Prepare folders";
  const labelMinifySrc = "Minify sources";
  const labelInlineScripts = "Inline scripts";
  const labelMinifyHtml = "Minify html";
  const labelTotal = "Total";

  console.time(labelTotal);
  console.time(labelPrepare);
  prepareFolders([dist, tmp]);
  fs.copyFileSync(path.join(src, "index.html"), path.join(tmp, "index.html"));
  console.timeEnd(labelPrepare);

  console.time(labelMinifySrc);
  await minify({
    compressor: gcc,
    input: path.join(src, "/", jsPattern),
    output: path.join(tmp, "/$1.js"),
  });

  await minify({
    compressor: cleanCSS,
    input: path.join(src, "/", cssPattern),
    output: path.join(tmp, "/$1.css"),
  });
  console.timeEnd(labelMinifySrc);

  console.time(labelInlineScripts);
  await inlineScriptsAndStyles(tmp);
  console.timeEnd(labelInlineScripts);

  console.time(labelMinifyHtml);
  await minify({
    compressor: htmlMinifier,
    input: path.join(tmp, "index-inlined.html"),
    output: path.join(dist, "index.html"),
  });
  console.timeEnd(labelMinifyHtml);
  console.timeEnd(labelTotal);
}

run();
