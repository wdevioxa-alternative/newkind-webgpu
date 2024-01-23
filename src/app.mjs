
import { WDevApplication } from './renderer.mjs';

try {
	const renderer = new WDevApplication();
	renderer.check();

	const canvas = renderer.getCanvas();
        const devicePixelRatio = window.devicePixelRatio || 1;

	const width = window.innerWidth * devicePixelRatio;
	const height = window.innerHeight * devicePixelRatio;

        canvas.width = Math.max( canvas.clientWidth * devicePixelRatio, width );
        canvas.height = Math.max( canvas.clientHeight * devicePixelRatio, height );

	renderer.start();

} catch( e ) {
	throw(e);
}
