import Renderer from 'renderer';

var canvas = document.getElementById('gfx');
canvas.width = canvas.height = 640;

const renderer = new Renderer(canvas);
renderer.start();

