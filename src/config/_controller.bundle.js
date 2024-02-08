window.getDrawParams = () => {
	return {
		draw: [
			{ 
				func: (x) => { 
					return Math.sin( x ) 
				}, 
				coords: { 
					x: { 
						min: -2.0 * Math.PI, 
						max: 2.0 * Math.PI,
						dprepeats: 56
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						dprepeats: 20
					}, 
					axis: false,
					color: [ 1.0, 1.0, 0.0, 1.0 ],
				},
				dpoints: true,
				color: [ 1.0, 0.0, 0.0, 1.0 ],
			}
		]
	};
}