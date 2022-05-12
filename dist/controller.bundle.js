window.getDrawParams = function() {
	return {
		coords: { x: { min: -2 * Math.PI, max: 2 * Math.PI }, y: { min: -1.0, max: 1.0 }, forx: 58, fory: 20, color: [1.0,0.0,1.0,1.0] },
		draw: [
			{ func: (x) => { return Math.sin(x + 1 * Math.PI / 3 ) }, x: { min: -Math.PI, max: Math.PI }, forx: 58, color: [1.0,1.0,0.0,1.0] },
			{ func: (x) => { return Math.sin(x + 2 * Math.PI / 3 ) }, x: { min: -Math.PI, max: Math.PI }, forx: 58, color: [0.0,1.0,1.0,1.0] },
			{ func: (x) => { return Math.sin(x + 3 * Math.PI / 3 ) }, x: { min: -Math.PI, max: Math.PI }, forx: 58, color: [0.1,0.0,1.0,1.0] },
			{ func: (x) => { return Math.sin(x) }, forx: 58, color: [0.0,1.0,0.0,1.0] }
		]
	};
}