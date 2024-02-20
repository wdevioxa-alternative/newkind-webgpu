"use strict";exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;function getLens(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=o.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function byteLength(o){var r=getLens(o),e=r[0],t=r[1];return 3*(e+t)/4-t}function _byteLength(o,r,e){return 3*(r+e)/4-e}function toByteArray(o){var r,e,t=getLens(o),n=t[0],u=t[1],p=new Arr(_byteLength(o,n,u)),a=0,h=u>0?n-4:n;for(e=0;e<h;e+=4)r=revLookup[o.charCodeAt(e)]<<18|revLookup[o.charCodeAt(e+1)]<<12|revLookup[o.charCodeAt(e+2)]<<6|revLookup[o.charCodeAt(e+3)],p[a++]=r>>16&255,p[a++]=r>>8&255,p[a++]=255&r;return 2===u&&(r=revLookup[o.charCodeAt(e)]<<2|revLookup[o.charCodeAt(e+1)]>>4,p[a++]=255&r),1===u&&(r=revLookup[o.charCodeAt(e)]<<10|revLookup[o.charCodeAt(e+1)]<<4|revLookup[o.charCodeAt(e+2)]>>2,p[a++]=r>>8&255,p[a++]=255&r),p}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,n=[],u=r;u<e;u+=3)t=(o[u]<<16&16711680)+(o[u+1]<<8&65280)+(255&o[u+2]),n.push(tripletToBase64(t));return n.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,n=[],u=16383,p=0,a=e-t;p<a;p+=u)n.push(encodeChunk(o,p,p+u>a?a:p+u));return 1===t?(r=o[e-1],n.push(lookup[r>>2]+lookup[r<<4&63]+"==")):2===t&&(r=(o[e-2]<<8)+o[e-1],n.push(lookup[r>>10]+lookup[r>>4&63]+lookup[r<<2&63]+"=")),n.join("")}revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;