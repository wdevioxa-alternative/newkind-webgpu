import fs from "fs";
import fse from 'fs-extra/esm'
const __dirname = process.cwd();
import path from 'path';

const entryPoints = [path.resolve(__dirname, 'src/addons')]
const outdir = [path.resolve(__dirname, 'dist')]

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