"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Ilias Gazdaliev <invimind@gmail.com>
 */
var set_1 = __importDefault(require("lodash/set"));
var common_1 = require("./common");
/**
 * Function to serialize Serializable class to json
 *
 * @param {Function} instance serializable instance
 * @returns {Record<string, unknown>} json
 */
function serialize(instance) {
    (0, common_1.assertSerializable)(instance.constructor);
    var propsMetadata = Reflect.getMetadata(common_1.ReflectMetaDataKeys.TsJacksonJsonProperty, instance.constructor);
    var json = {};
    var _loop_1 = function (propName, propParams) {
        var propertyValue = void 0, type = void 0;
        if (propParams.beforeSerialize) {
            propertyValue = propParams.beforeSerialize(instance[propName]);
            type = propertyValue.constructor;
        }
        else {
            propertyValue = instance[propName];
            type = propParams.type;
        }
        var serializedProperty = propParams.serialize
            ? propParams.serialize(propertyValue)
            : serializeProperty(propertyValue, type);
        if (propParams.paths) {
            propParams.paths.forEach(function (path, i) {
                (0, set_1.default)(json, path, serializedProperty[i]);
            });
        }
        else {
            (0, set_1.default)(json, propParams.path, serializedProperty);
        }
    };
    for (var _i = 0, _a = Object.entries(propsMetadata); _i < _a.length; _i++) {
        var _b = _a[_i], propName = _b[0], propParams = _b[1];
        _loop_1(propName, propParams);
    }
    return json;
}
exports.default = serialize;
function serializeProperty(value, type) {
    if (value === undefined) {
        return value;
    }
    if (Array.isArray(type)) {
        return type.map(function (toTypeItem, index) {
            return serializeProperty(value[index], toTypeItem);
        });
    }
    if (typeof type === 'function') {
        switch (type === null || type === void 0 ? void 0 : type.name) {
            case common_1.Types.Set:
            case common_1.Types.Array: {
                return Array.from(value.values()).map(function (item) {
                    var isSerializable = (0, common_1.checkSerializable)(item.constructor);
                    return isSerializable ? serialize(item) : item;
                });
            }
            default: {
                var isSerializable = (0, common_1.checkSerializable)(type);
                return isSerializable
                    ? serialize(value)
                    : value;
            }
        }
    }
}
