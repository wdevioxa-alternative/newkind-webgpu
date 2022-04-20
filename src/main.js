const Application = require("./renderer.js");
import GBox from "./box.js";

const canvas = document.getElementById('gfx');

const renderer = new Application(canvas);

const adss = new GBox(10,10,10,10);

//let a = 6+128;
//alert ( a & ~3 );

function setCanvasSize(canvas)
{
    const devicePixelRatio = window.devicePixelRatio || 1;

    const borderSize = (window.innerWidth * devicePixelRatio) / 6;
    canvas.width = ((window.innerWidth * devicePixelRatio) - borderSize) & ~3;
    canvas.height = ((window.innerHeight * devicePixelRatio) - borderSize) & ~3;
}

setCanvasSize(canvas);


/*
window.addEventListener('resize', async ()=>{
	setCanvasSize(canvas);
    await renderer.restart();
}, true);
*/
renderer.start();

