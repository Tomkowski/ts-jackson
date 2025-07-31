"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var common_1 = require("./common");
/**
 * Decorator for collecting annotated property metadata.
 * Accepts a string, array of strings, or a Params object.
 *
 * @param {string | string[] | Params<P>} arg - The decorator argument.
 */
function JsonProperty(arg) {
    if (arg === void 0) { arg = {}; }
    return function (target, propertyName) {
        var params = typeof arg === 'string'
            ? { path: arg }
            : Array.isArray(arg)
                ? { paths: arg }
                : arg;
        var metadata = __assign(__assign({ name: propertyName, path: params.path || propertyName }, params), { type: params.type || Reflect.getMetadata('design:type', target, propertyName) });
        var existingMetadata = Reflect.getMetadata(common_1.ReflectMetaDataKeys.TsJacksonJsonProperty, target.constructor) || {};
        existingMetadata[propertyName] = metadata;
        Reflect.defineMetadata(common_1.ReflectMetaDataKeys.TsJacksonJsonProperty, existingMetadata, target.constructor);
    };
}
exports.default = JsonProperty;
