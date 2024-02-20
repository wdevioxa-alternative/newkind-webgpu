var test=require("tape"),assert=require("assert"),noop=function(){},mustCallChecks=[];function runCallChecks(t){if(0===t){for(var e=filter(mustCallChecks,(function(t){return"minimum"in t?(t.messageSegment="at least "+t.minimum,t.actual<t.minimum):(t.messageSegment="exactly "+t.exact,t.actual!==t.exact)})),n=0;n<e.length;n++){var a=e[n];console.log("Mismatched %s function calls. Expected %s, actual %d.",a.name,a.messageSegment,a.actual),a.stack&&console.log(a.stack.split("\n").slice(2).join("\n"))}assert.strictEqual(e.length,0)}}function _mustCallInner(t,e,n){if(void 0===e&&(e=1),"number"==typeof t?(e=t,t=noop):void 0===t&&(t=noop),"number"!=typeof e)throw new TypeError("Invalid "+n+" value: "+e);var a={actual:0,stack:(new Error).stack,name:t.name||"<anonymous>"};return a[n]=e,0===mustCallChecks.length&&test.onFinish((function(){runCallChecks(0)})),mustCallChecks.push(a),function(){return a.actual++,t.apply(this,arguments)}}function filter(t,e){if(t.filter)return t.filter(e);for(var n=[],a=0;a<t.length;a++)e(t[a],a,t)&&n.push(t[a]);return n}exports.mustCall=function(t,e){return _mustCallInner(t,e,"exact")},exports.mustNotCall=function(t){return function(){assert.fail(t||"function should not have been called")}};