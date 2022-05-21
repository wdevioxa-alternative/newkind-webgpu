import { GApplication } from './renderer.mjs';

function setCanvasSize(canvas)
{
    const devicePixelRatio = window.devicePixelRatio || 1;
    const size = window.innerWidth*devicePixelRatio & ~1;
    canvas.width = (window.innerWidth*devicePixelRatio - size / 6) & ~1;
    canvas.height = (window.innerHeight*devicePixelRatio - size / 6) & ~1;
}

/*
window.addEventListener('resize', ()=>{
	setCanvasSize(canvas);
    renderer.restart();
}, true);
*/

const canvas = document.getElementById('gfx');

setCanvasSize(canvas);
const renderer = new GApplication(canvas);

renderer.start();