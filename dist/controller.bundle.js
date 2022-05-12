window.getDrawParams = function() {
	return {
		draw: [
			{ 
				func: (x) => { 
					return Math.sin( x + 1 * Math.PI / 3 ) 
				}, 
				coords: { 
					x: { 
						min: -2 * Math.PI, 
						max: 2 * Math.PI,
						repeats: 56
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						repeats: 20
					}, 
					visibility: true,
					color: [ 1.0, 1.0, 0.0, 1.0 ] 
				},
				range: { min: -Math.PI, max: Math.PI, repeats: 56 }, 
				color: [ 1.0, 1.0, 0.0, 1.0 ] 
			},
			{ 
				func: (x) => { 
					return Math.sin( x + 2 * Math.PI / 3 ) 
				}, 
				coords: { 
					x: { 
						min: -2 * Math.PI, 
						max: 2 * Math.PI,
						repeats: 56
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						repeats: 20
					}, 
					visibility: false,
					color: [ 0.0, 1.0, 1.0, 1.0 ] 
				},
				range: { min: -Math.PI, max: Math.PI, repeats: 56 }, 
				color: [ 0.0, 1.0, 1.0, 1.0 ] 
			},
			{ 
				func: (x) => { 
					return Math.sin( x + 3 * Math.PI / 3 ) 
				}, 
				coords: { 
					x: { 
						min: -2 * Math.PI, 
						max: 2 * Math.PI,
						repeats: 56
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						repeats: 20
					}, 
					visibility: false,
					color: [ 1.0, 0.0, 1.0, 1.0 ] 
				},
				range: { min: -Math.PI, max: Math.PI, repeats: 56 }, 
				color: [ 0.1, 0.0, 1.0, 1.0 ] 
			},
			{ 
				func: (x) => { 
					return Math.sin( x ) 
				}, 
				coords: { 
					x: { 
						min: -2 * Math.PI, 
						max: 2 * Math.PI,
						repeats: 58
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						repeats: 20
					}, 
					visibility: false,
					color: [ 0.0, 1.0, 0.0, 1.0 ] 
				},
				color: [ 0.0, 1.0, 0.0, 1.0 ] 
			}
		]
	};
}