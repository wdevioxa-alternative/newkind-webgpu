window.getDrawParams = () => {
	return {
		draw: [
			{ 
				func: (x) => { 
					return Math.sin( x + 1 * Math.PI / 3 ) 
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
			},
			{ 
				func: (x) => { 
					return Math.sin( x + 2 * Math.PI / 3 ) 
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
					color: [ 0.0, 1.0, 1.0, 1.0 ],
				},
				dpoints: false,
				color: [ 0.0, 1.0, 1.0, 1.0 ],
			},
			{ 
				func: (x) => { 
					return Math.sin( x + 3 * Math.PI / 3 ) 
				}, 
				coords: { 
					x: { 
						min: -2 * Math.PI, 
						max: 2 * Math.PI,
						dprepeats: 56
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						dprepeats: 20
					}, 
					axis: false,
					color: [ 1.0, 0.0, 1.0, 1.0 ],
				},
				dpoints: false,
				color: [ 0.1, 0.0, 1.0, 1.0 ],
			},
			{ 
				func: (x) => { 
					return Math.sin( x ) 
				}, 
				coords: { 
					x: { 
						min: -2.0 * Math.PI, 
						max: 2.0 * Math.PI,
						dprepeats: 100
					}, 
					y: { 
						min: -1.0, 
						max: 1.0,
						dprepeats: 50
					}, 
					axis: true,
					color: [ 1.0, 0.0, 1.0, 1.0 ],
				},
				dpoints: true,
				color: [ 0.0, 1.0, 0.0, 1.0 ],
			}
		]
	};
}