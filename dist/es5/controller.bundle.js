"use strict";

window.getDrawParams = function () {
  return {
    coords: {
      x: {
        min: -2 * Math.PI,
        max: 2 * Math.PI
      },
      y: {
        min: -1.0,
        max: 1.0
      },
      forx: 58,
      fory: 20,
      color: [1.0, 0.0, 1.0, 1.0]
    },
    draw: [{
      func: function func(x) {
        return Math.cos(x);
      },
      x: {
        min: -Math.PI,
        max: Math.PI
      },
      forx: 58,
      color: [0.0, 0.0, 1.0, 1.0]
    }, {
      func: function func(x) {
        return Math.sin(x);
      },
      forx: 58,
      color: [0.0, 1.0, 0.0, 1.0]
    }]
  };
};