"use strict";var common=require("./common"),EventEmitter=require("../"),assert=require("assert"),ee=new EventEmitter,foo=Symbol("foo"),listener=common.mustCall();ee.on(foo,listener),assert.strictEqual(ee.listeners(foo).length,1),assert.strictEqual(ee.listeners(foo)[0],listener),ee.emit(foo),ee.removeAllListeners(),assert.strictEqual(ee.listeners(foo).length,0),ee.on(foo,listener),assert.strictEqual(ee.listeners(foo).length,1),assert.strictEqual(ee.listeners(foo)[0],listener),ee.removeListener(foo,listener),assert.strictEqual(ee.listeners(foo).length,0);