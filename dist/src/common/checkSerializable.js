"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReflectMetaDataKeys_1 = require("./ReflectMetaDataKeys");
function checkSerializable(target) {
    if (!target) {
        return false;
    }
    var options = Reflect.getMetadata(ReflectMetaDataKeys_1.ReflectMetaDataKeys.TsJacksonSerializable, target);
    return options !== undefined;
}
exports.default = checkSerializable;
