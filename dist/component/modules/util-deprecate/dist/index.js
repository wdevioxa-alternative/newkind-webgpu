var commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},browser=deprecate;function deprecate(e,o){if(config("noDeprecation"))return e;var n=!1;return function(){if(!n){if(config("throwDeprecation"))throw new Error(o);config("traceDeprecation")?console.trace(o):console.warn(o),n=!0}return e.apply(this,arguments)}}function config(e){try{if(!commonjsGlobal.localStorage)return!1}catch(e){return!1}var o=commonjsGlobal.localStorage[e];return null!=o&&"true"===String(o).toLowerCase()}export{browser as default};