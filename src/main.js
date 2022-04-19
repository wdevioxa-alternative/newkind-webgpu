const Application = require("./renderer.js");

const canvas = document.getElementById('gfx');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const renderer = new Application(canvas);
renderer.start();

