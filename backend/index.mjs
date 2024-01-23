import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
import express from 'express'
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import notFound from '../utils/notFound.html.mjs'
import corsOptions from '../security/corsOptions.mjs'
import shouldCompress from '../utils/compress.mjs'
import service from './service/newkind-graph/index.mjs'
const app = express()
app.use(await express.json())
app.use(await compression({ filter: shouldCompress }))
app.use(await cors({ credentials: true }));

const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});

app.use(queue.getMiddleware());

app.use((req, res, next) => {
    console.log(`main__server_${req.path}`);
    next();
});

app.use('/src',express.static(path.join(__dirname,`../`)));

app.options(`/*`, await cors(corsOptions))
app.get(`/*`, async (req, res) => {
    res.status(404).send(await notFound(pkg.publicUrl));
})

app.use(queue.getErrorMiddleware())

const port = (process.env.PORT)
    ? process.env.PORT
    : pkg.config.port_service
app.listen(port ,() => {
    console.log('pid: ', process.pid)
    console.log('listening on http://localhost:'+ port);
});