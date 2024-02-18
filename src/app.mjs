
import { wDApplication } from './renderer.mjs';
import { wDSound } from './sound.mjs';
import components from './components/multi-switchrh/index.mjs'
import checklistCheckbox from './components/checklist-checkbox/index.mjs'

window["loadfile"] = function( nameoffile ) {
	try {
		const binary = new wDSound();
		return binary.loadSoundData( nameoffile );
	}
	catch( e ) 
	{
		console.log( "exception: " + e );
		throw( e );
	}	
};

window["appinit"] = function() {
	try {

		const renderer = new wDApplication();

		renderer.check();
		const canvas = renderer.getCanvas();

		const devicePixelRatio = window.devicePixelRatio || 1;

		const _width = window.innerWidth * devicePixelRatio;
		const _height = window.innerHeight * devicePixelRatio;

		canvas.width = 1366;

		/////////////////////////////////////////////////////////////////////////////////////////
		// canvas.width = Math.max( canvas.clientWidth * devicePixelRatio, _width );
		// canvas.height = Math.max( canvas.clientHeight * devicePixelRatio, height );
		/////////////////////////////////////////////////////////////////////////////////////////
		
		/////////////////////////////////////////////////////////////////////////////////////////
		// 4:3  &&  16:9 
		/////////////////////////////////////////////////////////////////////////////////////////
	    // canvas.height = canvas.width * 3 / 4;  
		canvas.height = canvas.width * 9 / 16;  

		/////////////////////////////////////////////////////////////////////////////////////////
		// console.log("set width: " + canvas.width + "; set height: " + canvas.height);
		/////////////////////////////////////////////////////////////////////////////////////////
		
		return { ready: renderer.start() };
	} 
	catch( e ) 
	{
		console.log( "exception: " + e );
		throw( e );
	}
};

