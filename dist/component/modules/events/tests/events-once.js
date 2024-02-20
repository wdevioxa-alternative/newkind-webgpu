"use strict";var common=require("./common"),EventEmitter=require("../").EventEmitter,once=require("../").once,has=require("has"),assert=require("assert");function Event(e){this.type=e}function EventTargetMock(){this.events={},this.addEventListener=common.mustCall(this.addEventListener),this.removeEventListener=common.mustCall(this.removeEventListener)}function onceAnEvent(){var e=new EventEmitter;return process.nextTick((function(){e.emit("myevent",42)})),once(e,"myevent").then((function(t){var n=t[0];assert.strictEqual(n,42),assert.strictEqual(e.listenerCount("error"),0),assert.strictEqual(e.listenerCount("myevent"),0)}))}function onceAnEventWithTwoArgs(){var e=new EventEmitter;return process.nextTick((function(){e.emit("myevent",42,24)})),once(e,"myevent").then((function(e){assert.strictEqual(e.length,2),assert.strictEqual(e[0],42),assert.strictEqual(e[1],24)}))}function catchesErrors(){var e=new EventEmitter,t=new Error("kaboom");return process.nextTick((function(){e.emit("error",t)})),once(e,"myevent").then((function(){throw new Error("should reject")}),(function(n){assert.strictEqual(n,t),assert.strictEqual(e.listenerCount("error"),0),assert.strictEqual(e.listenerCount("myevent"),0)}))}function stopListeningAfterCatchingError(){var e=new EventEmitter,t=new Error("kaboom");return process.nextTick((function(){e.emit("error",t),e.emit("myevent",42,24)})),once(e,"myevent").then(common.mustNotCall,(function(n){assert.strictEqual(n,t),assert.strictEqual(e.listenerCount("error"),0),assert.strictEqual(e.listenerCount("myevent"),0)}))}function onceError(){var e=new EventEmitter,t=new Error("kaboom");process.nextTick((function(){e.emit("error",t)}));var n=once(e,"error");return assert.strictEqual(e.listenerCount("error"),1),n.then((function(n){var r=n[0];assert.strictEqual(r,t),assert.strictEqual(e.listenerCount("error"),0),assert.strictEqual(e.listenerCount("myevent"),0)}))}function onceWithEventTarget(){var e=new EventTargetMock,t=new Event("myevent");return process.nextTick((function(){e.dispatchEvent(t)})),once(e,"myevent").then((function(n){var r=n[0];assert.strictEqual(r,t),assert.strictEqual(has(e.events,"myevent"),!1)}))}function onceWithEventTargetError(){var e=new EventTargetMock,t=new Event("error");return process.nextTick((function(){e.dispatchEvent(t)})),once(e,"error").then((function(n){var r=n[0];assert.strictEqual(r,t),assert.strictEqual(has(e.events,"error"),!1)}))}function prioritizesEventEmitter(){var e=new EventEmitter;return e.addEventListener=assert.fail,e.removeAllListeners=assert.fail,process.nextTick((function(){e.emit("foo")})),once(e,"foo")}EventTargetMock.prototype.addEventListener=function(e,t,n){e in this.events||(this.events[e]={listeners:[],options:n||{}}),this.events[e].listeners.push(t)},EventTargetMock.prototype.removeEventListener=function(e,t){if(e in this.events)for(var n=this.events[e].listeners,r=0,s=n.length;r<s;r++)if(n[r]===t)return n.splice(r,1),void(0===n.length&&delete this.events[e])},EventTargetMock.prototype.dispatchEvent=function(e){if(!(e.type in this.events))return!0;for(var t=this.events[e.type],n=t.listeners.slice(),r=0,s=n.length;r<s;r++)n[r].call(null,e),t.options.once&&this.removeEventListener(e.type,n[r]);return!e.defaultPrevented};var allTests=[onceAnEvent(),onceAnEventWithTwoArgs(),catchesErrors(),stopListeningAfterCatchingError(),onceError(),onceWithEventTarget(),onceWithEventTargetError(),prioritizesEventEmitter()],hasBrowserEventTarget=!1;try{hasBrowserEventTarget="function"==typeof(new window.EventTarget).addEventListener&&"xyz"===new window.Event("xyz").type}catch(e){}if(hasBrowserEventTarget){var onceWithBrowserEventTarget=function(){var e=new window.EventTarget,t=new window.Event("myevent");return process.nextTick((function(){e.dispatchEvent(t)})),once(e,"myevent").then((function(n){var r=n[0];assert.strictEqual(r,t),assert.strictEqual(has(e.events,"myevent"),!1)}))},onceWithBrowserEventTargetError=function(){var e=new window.EventTarget,t=new window.Event("error");return process.nextTick((function(){e.dispatchEvent(t)})),once(e,"error").then((function(n){var r=n[0];assert.strictEqual(r,t),assert.strictEqual(has(e.events,"error"),!1)}))};common.test.comment("Testing with browser built-in EventTarget"),allTests.push([onceWithBrowserEventTarget(),onceWithBrowserEventTargetError()])}module.exports=Promise.all(allTests);