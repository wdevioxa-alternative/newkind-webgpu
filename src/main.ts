import Renderer from './renderer';

let canvas = document.getElementById('gfx') as HTMLCanvasElement;

canvas.width = 640;
canvas.height = 640;

const renderer = new Renderer(canvas);
renderer.start();

