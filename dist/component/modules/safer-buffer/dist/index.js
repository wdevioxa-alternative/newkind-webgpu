import require$$0 from"../../buffer/dist/index.js";var key,buffer=require$$0,Buffer=buffer.Buffer,safer={};for(key in buffer)buffer.hasOwnProperty(key)&&"SlowBuffer"!==key&&"Buffer"!==key&&(safer[key]=buffer[key]);var Safer=safer.Buffer={};for(key in Buffer)Buffer.hasOwnProperty(key)&&"allocUnsafe"!==key&&"allocUnsafeSlow"!==key&&(Safer[key]=Buffer[key]);if(safer.Buffer.prototype=Buffer.prototype,Safer.from&&Safer.from!==Uint8Array.from||(Safer.from=function(e,r,f){if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type '+typeof e);if(e&&void 0===e.length)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);return Buffer(e,r,f)}),Safer.alloc||(Safer.alloc=function(e,r,f){if("number"!=typeof e)throw new TypeError('The "size" argument must be of type number. Received type '+typeof e);if(e<0||e>=2*(1<<30))throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=Buffer(e);return r&&0!==r.length?"string"==typeof f?t.fill(r,f):t.fill(r):t.fill(0),t}),!safer.kStringMaxLength)try{safer.kStringMaxLength=process.binding("buffer").kStringMaxLength}catch(e){}safer.constants||(safer.constants={MAX_LENGTH:safer.kMaxLength},safer.kStringMaxLength&&(safer.constants.MAX_STRING_LENGTH=safer.kStringMaxLength));var safer_1=safer;export{safer_1 as default};