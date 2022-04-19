const Application = require("./renderer.js");

const canvas = document.getElementById('gfx');

function setCanvasSize(canvas)
{
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
}

setCanvasSize(canvas);

const renderer = new Application(canvas);

window.addEventListener('resize', ()=>{
    setCanvasSize(canvas);
}, true);

renderer.start();

