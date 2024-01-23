
import { wDApplication } from './renderer.mjs';

window["run"] = function() {
	try {
		const renderer = new wDApplication();
		renderer.check();

		const canvas = renderer.getCanvas();
	        const devicePixelRatio = window.devicePixelRatio || 1;

//		const width = window.innerWidth * devicePixelRatio;
//		const height = window.innerHeight * devicePixelRatio;

//        	canvas.width = Math.max( canvas.clientWidth * devicePixelRatio, width );
//	        canvas.height = Math.max( canvas.clientHeight * devicePixelRatio, height );

        	canvas.width = 1000;
	        canvas.height = canvas.width * 9 / 16;
		
		return { ready: renderer.start() };
	} catch( e ) {
		throw(e);
	}
}
