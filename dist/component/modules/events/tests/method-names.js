"use strict";require("./common");var assert=require("assert"),events=require("../"),E=events.EventEmitter.prototype;assert.strictEqual(E.constructor.name,"EventEmitter"),assert.strictEqual(E.on,E.addListener),assert.strictEqual(E.off,E.removeListener),Object.getOwnPropertyNames(E).forEach((function(t){"constructor"!==t&&"on"!==t&&"off"!==t&&"function"==typeof E[t]&&assert.strictEqual(E[t].name,t)}));