import fs from "fs";
import fse from 'fs-extra/esm'
const __dirname = process.cwd();
import path from 'path';
import { stream } from './index.mjs';

console.time("⚡ [esbuild] ADDONS Done");
const entryPoints = [path.resolve(__dirname, 'src/addons')]
const outdir = [path.resolve(__dirname, 'dist')]
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
    console.timeEnd("⚡ [esbuild] ADDONS Done")
} catch (err) {
    console.error(err)
}