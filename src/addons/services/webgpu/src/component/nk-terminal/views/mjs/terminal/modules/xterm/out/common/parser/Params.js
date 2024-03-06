"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
var MAX_VALUE = 0x7FFFFFFF;
var MAX_SUBPARAMS = 256;
var Params = (function () {
    function Params(maxLength, maxSubParamsLength) {
        if (maxLength === void 0) { maxLength = 32; }
        if (maxSubParamsLength === void 0) { maxSubParamsLength = 32; }
        this.maxLength = maxLength;
        this.maxSubParamsLength = maxSubParamsLength;
        if (maxSubParamsLength > MAX_SUBPARAMS) {
            throw new Error('maxSubParamsLength must not be greater than 256');
        }
        this.params = new Int32Array(maxLength);
        this.length = 0;
        this._subParams = new Int32Array(maxSubParamsLength);
        this._subParamsLength = 0;
        this._subParamsIdx = new Uint16Array(maxLength);
        this._rejectDigits = false;
        this._rejectSubDigits = false;
        this._digitIsSub = false;
    }
    Params.fromArray = function (values) {
        var params = new Params();
        if (!values.length) {
            return params;
        }
        for (var i = (values[0] instanceof Array) ? 1 : 0; i < values.length; ++i) {
            var value = values[i];
            if (value instanceof Array) {
                for (var k = 0; k < value.length; ++k) {
                    params.addSubParam(value[k]);
                }
            }
            else {
                params.addParam(value);
            }
        }
        return params;
    };
    Params.prototype.clone = function () {
        var newParams = new Params(this.maxLength, this.maxSubParamsLength);
        newParams.params.set(this.params);
        newParams.length = this.length;
        newParams._subParams.set(this._subParams);
        newParams._subParamsLength = this._subParamsLength;
        newParams._subParamsIdx.set(this._subParamsIdx);
        newParams._rejectDigits = this._rejectDigits;
        newParams._rejectSubDigits = this._rejectSubDigits;
        newParams._digitIsSub = this._digitIsSub;
        return newParams;
    };
    Params.prototype.toArray = function () {
        var res = [];
        for (var i = 0; i < this.length; ++i) {
            res.push(this.params[i]);
            var start = this._subParamsIdx[i] >> 8;
            var end = this._subParamsIdx[i] & 0xFF;
            if (end - start > 0) {
                res.push(Array.prototype.slice.call(this._subParams, start, end));
            }
        }
        return res;
    };
    Params.prototype.reset = function () {
        this.length = 0;
        this._subParamsLength = 0;
        this._rejectDigits = false;
        this._rejectSubDigits = false;
        this._digitIsSub = false;
    };
    Params.prototype.addParam = function (value) {
        this._digitIsSub = false;
        if (this.length >= this.maxLength) {
            this._rejectDigits = true;
            return;
        }
        if (value < -1) {
            throw new Error('values lesser than -1 are not allowed');
        }
        this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength;
        this.params[this.length++] = value > MAX_VALUE ? MAX_VALUE : value;
    };
    Params.prototype.addSubParam = function (value) {
        this._digitIsSub = true;
        if (!this.length) {
            return;
        }
        if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
            this._rejectSubDigits = true;
            return;
        }
        if (value < -1) {
            throw new Error('values lesser than -1 are not allowed');
        }
        this._subParams[this._subParamsLength++] = value > MAX_VALUE ? MAX_VALUE : value;
        this._subParamsIdx[this.length - 1]++;
    };
    Params.prototype.hasSubParams = function (idx) {
        return ((this._subParamsIdx[idx] & 0xFF) - (this._subParamsIdx[idx] >> 8) > 0);
    };
    Params.prototype.getSubParams = function (idx) {
        var start = this._subParamsIdx[idx] >> 8;
        var end = this._subParamsIdx[idx] & 0xFF;
        if (end - start > 0) {
            return this._subParams.subarray(start, end);
        }
        return null;
    };
    Params.prototype.getSubParamsAll = function () {
        var result = {};
        for (var i = 0; i < this.length; ++i) {
            var start = this._subParamsIdx[i] >> 8;
            var end = this._subParamsIdx[i] & 0xFF;
            if (end - start > 0) {
                result[i] = this._subParams.slice(start, end);
            }
        }
        return result;
    };
    Params.prototype.addDigit = function (value) {
        var length;
        if (this._rejectDigits
            || !(length = this._digitIsSub ? this._subParamsLength : this.length)
            || (this._digitIsSub && this._rejectSubDigits)) {
            return;
        }
        var store = this._digitIsSub ? this._subParams : this.params;
        var cur = store[length - 1];
        store[length - 1] = ~cur ? Math.min(cur * 10 + value, MAX_VALUE) : value;
    };
    return Params;
}());
exports.Params = Params;
//# sourceMappingURL=Params.js.map