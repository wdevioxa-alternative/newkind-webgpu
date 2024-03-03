import * as esbuild from 'esbuild'
import * as fs from "fs-extra";
import { copy } from 'esbuild-plugin-copy';
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import aliasPlugin from 'esbuild-plugin-path-alias';
import { glsl } from "esbuild-plugin-glsl";
import path from 'path';
import * as dotenv from 'dotenv'
dotenv.config()

const __dirname = path.join(path.dirname(process.argv[1]), './');

const isWatch = process.argv.includes("--watch");

let define = {}

for (const k in process.env) {
    if (k.startsWith('REACT_APP_') || k.startsWith('PUBLIC_URL') || k.startsWith('PORT')) {
        define[`process.env.${k}`] = JSON.stringify(process.env[k]);
    }
}
//_sandbox/metamart-subscription-service-ui
// _sandbox/metamart-subscription-service-ui/docs/api/swagger-js/src/minim/lib/minim.js

// _sandbox/metamart-subscription-service-ui/docs/api/swagger-js/src/ramda-adjunct/src/index.js

const entryPoints = [path.resolve(__dirname, 'src/app.mjs')]
// const entryPoints = [path.resolve(__dirname, 'docs/api/swagger-js/src/lib.js')]
const outdir = path.resolve(__dirname, 'dist')
// const outfile = path.resolve(__dirname, 'docs/api/swagger-js/es/lib.mjs')
const outfile = path.resolve(__dirname, 'dist/main.bundle.mjs')


// const entryPoints = [path.resolve(__dirname, 'docs/api/swagger-js/src/short-unique-id/src/index.ts')]
// const outdir = path.resolve(__dirname, 'docs/api/swagger-js/src/short-unique-id/dist')
// const outfile = path.resolve(__dirname, 'docs/api/swagger-js/src/short-unique-id/dist/index.mjs')


// const entryPoints = [path.resolve(__dirname, 'docs/api/swagger-js/src/minim/lib/minim.js')]
// const outdir = path.resolve(__dirname, 'docs/api/swagger-js/src/minim/dist')
// const outfile = path.resolve(__dirname, 'docs/api/swagger-js/src/minim/dist/index.mjs')

// const entryPoints = [path.resolve(__dirname, 'docs/api/swagger-js/src/http/qs/lib/index.js')]
// const outdir = path.resolve(__dirname, 'docs/api/swagger-js/src/http/qs/dist')
// const outfile = path.resolve(__dirname, 'docs/api/swagger-js/src/http/qs/dist/index.mjs')
//
// const entryPoints = [path.resolve(__dirname, 'src/index.tsx')]
// const outdir = path.resolve(__dirname, 'public/this/virualDom')
// const outfile = path.resolve(__dirname, 'public/this/virualDom/index.mjs')

// const entryPoints = [path.join(__dirname, './tmp/test/src/index.js')]
// const outdir = path.join(__dirname, './services/mss/src/this/openapi')
// const outfile = path.join(__dirname, './docs/openapi/index.mjs')

fs.emptyDirSync(outdir);

console.time("⚡ [esbuild] Done");
try {
    const buildParams = {
        entryPoints: entryPoints,
        bundle: true,
        metafile: true,
        outfile: outfile,
        format: "esm",
        define,
        loader: { ".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file", ".woff": "file" },
        color: true,
        minify: true,
        sourcemap: true,
        mainFields : [ 'module' , 'main' ],
        plugins: [
            glsl({
                minify: true
            }),
            aliasPlugin({
                '@src': path.resolve(__dirname, './src')
            }),
            polyfillNode({
                process: true,
                buffer: true,
                define
            }),
            cssModulesPlugin({
                v2: true,
                v2CssModulesOption: {
                    dashedIndents: true,
                    /**
                     * Optional. The currently supported segments are:
                     * [name] - the base name of the CSS file, without the extension
                     * [hash] - a hash of the full file path
                     * [local] - the original class name
                     */
                    pattern: `[name]_[local]__[hash]`
                }
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/assets/**/*'],
                    to: ['./dist/assets']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/js/**/*'],
                    to: ['./dist/js']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/fonts/**/*'],
                    to: ['./dist/fonts']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/addons/**/*'],
                    to: ['./dist']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/index.html'],
                    to: ['./dist']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/config/**/*'],
                    to: ['./dist/config']
                },
                watch: false,
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./src/sounds/**/*'],
                    to: ['./dist/sounds']
                },
                watch: false,
            })
        ]
    }

    console.log('CONFIG: ', buildParams)
    let result = await esbuild.build(buildParams)
    console.log(result)
    console.timeEnd("⚡ [esbuild] Done")
} catch (e) {
    console.timeEnd("⚡ [esbuild] Done")
    console.log(e)
    process.exit(1)
}