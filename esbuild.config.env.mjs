import fs from "fs";
import fse from 'fs-extra/esm'
const __dirname = process.cwd();
import path from 'path';

const entryPoints = [path.resolve(__dirname, 'src/addons')]
const outdir = [path.resolve(__dirname, 'dist')]

try {
    if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
        fs.mkdirSync(path.resolve(__dirname, 'dist'));
    }

    // fs.rmSync(`${outdir[0]}/env.json`, { recursive: true, force: true });
    // fs.rmSync(`${outdir[0]}/env.mjs`, { recursive: true, force: true });
    // fs.rmSync(`${outdir[0]}/index.mjs`, { recursive: false, force: true });
    // fs.rmSync(`${outdir[0]}/jquery-3.7.1.min.js`, { recursive: false, force: true });
    // fs.rmSync(`${outdir[0]}/jquery-ui.js`, { recursive: false, force: true });
    // fs.rmSync(`${outdir[0]}/jquery-ui.min.js`, { recursive: false, force: true });
    // fse.copySync(`${entryPoints[0]}/env.mjs`, `${outdir[0]}`, {dereference: true})
    // fse.copySync(`${entryPoints[0]}/env.json`, `${outdir[0]}`, {dereference: true})

    fse.copySync(`${entryPoints[0]}/env.mjs`, `${outdir[0]}/env.mjs`)
    fse.copySync(`${entryPoints[0]}/env.json`, `${outdir[0]}/env.json`)
    console.log('COPY success!')
    console.timeEnd("⚡ [esbuild] ADDONS Done")
} catch (err) {
    console.error(err)
}