const Application = require("./renderer.js");

const canvas = document.getElementById('gfx');

const renderer = new Application(canvas);

canvas.width = canvas.height = 320;

/*
function setCanvasSize(canvas)
{
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = (window.innerWidth * devicePixelRatio) / 2;
    canvas.height = (window.innerHeight * devicePixelRatio) / 2;
}
*/

//setCanvasSize(canvas);

//window.addEventListener('resize', ()=>{
// setCanvasSize(canvas);
//}, true);

renderer.start();

