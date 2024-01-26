
import { wDApplication } from './renderer.mjs';

window["run"] = function() {
	try {
		const renderer = new wDApplication();
		renderer.check();

		const canvas = renderer.getCanvas();

		canvas.width = 1024;
	    canvas.height = canvas.width * 3 / 4;

		// const devicePixelRatio = window.devicePixelRatio || 1;

		// const width = window.innerWidth * devicePixelRatio;
		// const height = window.innerHeight * devicePixelRatio;
		
		// canvas.width = Math.max( canvas.clientWidth * devicePixelRatio, width );
		// canvas.height = Math.max( canvas.clientHeight * devicePixelRatio, height );

		return { ready: renderer.start() };
	} 
	catch( e ) 
	{
		console.log( "exception: " + e );
		throw(e);
	}
}

