"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var common_1 = require("./common");
/**
 * Decorator for marking classes as serializable. It assigns metadata
 * to the class indicating its name.
 *
 * @returns {Function} Class decorator function.
 */
function Serializable() {
    return function (target) {
        var metadata = {
            className: target.name,
        };
        Reflect.defineMetadata(common_1.ReflectMetaDataKeys.TsJacksonSerializable, metadata, target);
    };
}
exports.default = Serializable;
