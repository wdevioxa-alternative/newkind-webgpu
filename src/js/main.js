
const SIZE_OF_FLOAT = 4;
const SIZE_OF_SHORT = 2;
const SIZE_OF_INT = 4;
const SIZE_OF_DOUBLE = 8;

window["rendertype"] = "stereo";
window["inputtype"] = "audio";

window["hold-chart"] = false;
window["hold-buffer"] = undefined;

window["render-buffer"] = undefined;

window["isNumber"] = function(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

