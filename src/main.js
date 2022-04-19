const Application = require("./renderer.js");

const canvas = document.getElementById('gfx');

//canvas.width = 640;
//canvas.height = 640;

const renderer = new Application(canvas);
renderer.start();

