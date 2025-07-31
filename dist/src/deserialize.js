"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Ilias Gazdaliev <invimind@gmail.com>
 */
var get_1 = __importDefault(require("lodash/get"));
var set_1 = __importDefault(require("lodash/set"));
require("reflect-metadata");
var common_1 = require("./common");
/**
 * Function to deserialize json to Serializable class
 *
 * @param {Record<string, unknown> | string} json
 * @param serializableClass Class to which json should be serialized
 * @param args an arguments to be provided to constructor.
 * For example Cat(readonly name, readonly color)
 * deserialize({}, Cat, 'Moon', 'black')
 */
function deserialize(json, serializableClass) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    (0, common_1.assertSerializable)(serializableClass);
    var propsMetadata = Reflect.getMetadata(common_1.ReflectMetaDataKeys.TsJacksonJsonProperty, serializableClass);
    var resultClass = new (serializableClass.bind.apply(serializableClass, __spreadArray([void 0], args, false)))();
    var jsonObject = typeof json === 'string' ? JSON.parse(json) : json;
    var propertiesAfterDeserialize = [];
    for (var _a = 0, _b = Object.entries(propsMetadata); _a < _b.length; _a++) {
        var _c = _b[_a], propName = _c[0], propParams = _c[1];
        var jsonValue = evaluateJsonValueByPath(jsonObject, propParams);
        propParams.required &&
            (0, common_1.assertRequired)({
                json: jsonObject,
                propName: propName,
                propValue: jsonValue,
                serializableClass: serializableClass,
                propPath: propParams.path,
            });
        var deserializedValue = propParams.deserialize
            ? propParams.deserialize(jsonValue)
            : deserializeProperty(jsonValue, propParams.type, propParams.elementType);
        propParams.validate &&
            (0, common_1.assertValid)({
                propName: propName,
                propValue: deserializedValue,
                validate: propParams.validate,
                serializableClass: serializableClass,
            });
        if (deserializedValue !== undefined) {
            (0, set_1.default)(resultClass, propName, deserializedValue);
        }
        propParams.afterDeserialize &&
            propertiesAfterDeserialize.push({
                propName: propName,
                deserializedValue: deserializedValue,
                afterDeserialize: propParams.afterDeserialize,
            });
    }
    propertiesAfterDeserialize.forEach(function (_a) {
        var propName = _a.propName, deserializedValue = _a.deserializedValue, afterDeserialize = _a.afterDeserialize;
        (0, set_1.default)(resultClass, propName, afterDeserialize(resultClass, deserializedValue));
    });
    return resultClass;
}
exports.default = deserialize;
function deserializeProperty(value, toType, elementType) {
    if (value === undefined || value === null || toType === undefined) {
        return value;
    }
    if (Array.isArray(toType)) {
        return toType.map(function (toTypeItem, index) {
            return deserializeProperty(value[index], toTypeItem);
        });
    }
    if (typeof toType === 'function') {
        switch (toType === null || toType === void 0 ? void 0 : toType.name) {
            case common_1.Types.Date: {
                return new Date(value);
            }
            case common_1.Types.Array: {
                return value.map(function (item) {
                    var isSerializable = (0, common_1.checkSerializable)(elementType);
                    return isSerializable ? deserialize(item, elementType) : item;
                });
            }
            case common_1.Types.Set: {
                var values = value.map(function (item) {
                    var isSerializable = (0, common_1.checkSerializable)(elementType);
                    return isSerializable ? deserialize(item, elementType) : item;
                });
                return new Set(values);
            }
            case common_1.Types.Boolean: {
                return Boolean(value);
            }
            case common_1.Types.Number: {
                return Number(value);
            }
            case common_1.Types.String: {
                return value.toString();
            }
            default: {
                var isSerializable = (0, common_1.checkSerializable)(toType);
                return isSerializable
                    ? deserialize(value, toType)
                    : value;
            }
        }
    }
}
function evaluateJsonValueByPath(jsonObject, propParams) {
    if (propParams.paths)
        return propParams.paths.map(function (path) { return (0, get_1.default)(jsonObject, path); });
    if (propParams.pathAlternatives)
        return propParams.pathAlternatives
            .map(function (path) { return (0, get_1.default)(jsonObject, path); })
            .find(function (value) { return value != null; });
    return (0, get_1.default)(jsonObject, propParams.path);
}
