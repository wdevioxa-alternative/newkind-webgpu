import * as esbuild from 'esbuild'
import fs from "fs";
import fse from 'fs-extra/esm'
import { copy } from 'esbuild-plugin-copy';
const __dirname = process.cwd();
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import aliasPlugin from 'esbuild-plugin-path-alias';
import { glsl } from "esbuild-plugin-glsl";
import path from 'path';

//_sandbox/metamart-subscription-service-ui
// _sandbox/metamart-subscription-service-ui/docs/api/swagger-js/src/minim/lib/minim.js

// _sandbox/metamart-subscription-service-ui/docs/api/swagger-js/src/ramda-adjunct/src/index.js

const entryPoints = [path.resolve(__dirname, 'src/addons')]
const outdir = [path.resolve(__dirname, 'dist')]
// const entryPoints = [path.resolve(__dirname, 'docs/api/swagger-js/src/lib.js')]
// const outdir = [path.resolve(__dirname, '/dist')]

var copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var existsDest = fs.existsSync(dest);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if(!existsDest) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest, {encoding:'utf8',flag:'w'});
    }
};

try {
    fs.rmSync(`${outdir[0]}/services`, { recursive: true, force: true });
    fs.rmSync(`${outdir[0]}/env.json`, { recursive: false, force: true });
    fs.rmSync(`${outdir[0]}/env.mjs`, { recursive: false, force: true });
    fs.rmSync(`${outdir[0]}/index.mjs`, { recursive: false, force: true });
    fs.rmSync(`${outdir[0]}/jquery-3.7.1.min.js`, { recursive: false, force: true });
    fs.rmSync(`${outdir[0]}/jquery-ui.js`, { recursive: false, force: true });
    fs.rmSync(`${outdir[0]}/jquery-ui.min.js`, { recursive: false, force: true });
    fse.copySync(entryPoints[0], outdir[0])
    console.log('COPY success!')
} catch (err) {
    console.error(err)
}