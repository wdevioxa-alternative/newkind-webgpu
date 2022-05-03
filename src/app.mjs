import { GApplication } from './renderer.mjs';

function setCanvasSize(canvas)
{
	const ratio = window.devicePixelRatio || 1;
	const size = window.innerWidth * ratio & ~1;
	canvas.width = (window.innerWidth * ratio - size / 6) & ~1;
	canvas.height = (window.innerHeight * ratio - size / 6) & ~1;
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


