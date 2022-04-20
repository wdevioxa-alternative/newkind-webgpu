const Application = require("./renderer.js");

const canvas = document.getElementById('gfx');

const renderer = new Application(canvas);

//let a = 6+128;
//alert ( a & ~3 );

function setCanvasSize(canvas)
{
    const devicePixelRatio = window.devicePixelRatio || 1;
    const wbSize = (window.innerWidth * devicePixelRatio) / 6;

    canvas.width = ((window.innerWidth * devicePixelRatio) - wbSize) & ~3;
    canvas.height = ((window.innerHeight * devicePixelRatio) - wbSize) & ~3;
}

setCanvasSize(canvas);
/*
window.addEventListener('resize', async ()=>{
	setCanvasSize(canvas);
    await renderer.restart();
}, true);
*/
renderer.start();

