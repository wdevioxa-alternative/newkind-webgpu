import require$$0 from"../../buffer/dist/index.js";var safeBuffer$1={exports:{}};!function(r,e){var f=require$$0,n=f.Buffer;function o(r,e){for(var f in r)e[f]=r[f]}function u(r,e,f){return n(r,e,f)}n.from&&n.alloc&&n.allocUnsafe&&n.allocUnsafeSlow?r.exports=f:(o(f,e),e.Buffer=u),o(n,u),u.from=function(r,e,f){if("number"==typeof r)throw new TypeError("Argument must not be a number");return n(r,e,f)},u.alloc=function(r,e,f){if("number"!=typeof r)throw new TypeError("Argument must be a number");var o=n(r);return void 0!==e?"string"==typeof f?o.fill(e,f):o.fill(e):o.fill(0),o},u.allocUnsafe=function(r){if("number"!=typeof r)throw new TypeError("Argument must be a number");return n(r)},u.allocUnsafeSlow=function(r){if("number"!=typeof r)throw new TypeError("Argument must be a number");return f.SlowBuffer(r)}}(safeBuffer$1,safeBuffer$1.exports);var safeBuffer=safeBuffer$1.exports;export{safeBuffer as default};