// const { init } = require('./tracing.cjs');
// init('mss', 'development');
require('dotenv').config()
const fs = require('fs')
const server = import('./index.mjs');
const express = require('express');
// const ParseServer = require('./node/parse-server/lib/index.js').ParseServer;
// let ParseDashboard = require('parse-dashboard');
let app = express();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

server.then(async (data) => {

    const port = (process.env.PORT)
        ? process.env.PORT
        : 3001;

    // var options = { allowInsecureHTTP: false };
    // const server = new ParseServer({
    //     databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    //     cloud: '', // Path to your Cloud Code
    //     appId: 'welcomebook',
    //     masterKey: 'welcomebook_1984', // Keep this key secret!
    //     fileKey: 'optionalFileKey',
    //     serverURL: `http://localhost:${port}/parse`, // Don't forget to change to https if needed
    //     verifyUserEmails: false,
    //     emailVerifyTokenValidityDuration: 2 * 60 * 60,
    //     passwordPolicy: {
    //         validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //         doNotAllowUsername: true,
    //         maxPasswordHistory: 5,
    //     },
    // });
    // let dashboard = new ParseDashboard({
    //     "apps": [
    //         {
    //             "serverURL": "http://localhost:3333/parse",
    //             "appId": "welcomebook",
    //             "masterKey": "welcomebook_1984",
    //             "appName": "welcomebook"
    //         }
    //     ]
    // }, options);

    // "users": [{
    //     "user": "admin",
    //     "pass": "admin"
    // }],
    //     "useEncryptedPasswords": false
    // await server.start();
    // app.use('/dashboard', dashboard);
    // app.use('/parse', server.app);

    data.modules(app).then(({app, open, Stream})=>{
        fs.watch('./src', (eventType, filename) => {
            Stream.emit("push", "message", {
                type: 'dev',
                msg: 'reload'
            });
        })

        app.listen(port, () => {
            console.log('pid: ', process.pid);
            console.log('listening on http://localhost:' + port);
            open('http://localhost:4012/')
        });

        process.on('SIGINT', function () {
            Stream.emit("push", "message", {
                type: 'dev',
                msg: 'close'
            });
            process.exit(0);
        });
    }).catch(e => console.error(e));
});
