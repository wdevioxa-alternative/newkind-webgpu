module.exports=Stream;var EE=require("events").EventEmitter,inherits=require("inherits");function Stream(){EE.call(this)}inherits(Stream,EE),Stream.Readable=require("readable-stream/readable.js"),Stream.Writable=require("readable-stream/writable.js"),Stream.Duplex=require("readable-stream/duplex.js"),Stream.Transform=require("readable-stream/transform.js"),Stream.PassThrough=require("readable-stream/passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,r){var t=this;function n(r){e.writable&&!1===e.write(r)&&t.pause&&t.pause()}function a(){t.readable&&t.resume&&t.resume()}t.on("data",n),e.on("drain",a),e._isStdio||r&&!1===r.end||(t.on("end",i),t.on("close",s));var o=!1;function i(){o||(o=!0,e.end())}function s(){o||(o=!0,"function"==typeof e.destroy&&e.destroy())}function m(e){if(u(),0===EE.listenerCount(this,"error"))throw e}function u(){t.removeListener("data",n),e.removeListener("drain",a),t.removeListener("end",i),t.removeListener("close",s),t.removeListener("error",m),e.removeListener("error",m),t.removeListener("end",u),t.removeListener("close",u),e.removeListener("close",u)}return t.on("error",m),e.on("error",m),t.on("end",u),t.on("close",u),e.on("close",u),e.emit("pipe",t),e};