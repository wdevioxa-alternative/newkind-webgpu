require("./common");var assert=require("assert"),events=require("../"),e=new events.EventEmitter;Object.create&&assert.ok(!(e._events instanceof Object)),assert.strictEqual(Object.keys(e._events).length,0),e.setMaxListeners(5),assert.strictEqual(Object.keys(e._events).length,0);