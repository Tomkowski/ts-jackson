"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
function assertValid(_a) {
    var propName = _a.propName, propValue = _a.propValue, validate = _a.validate, serializableClass = _a.serializableClass;
    if (!validate(propValue)) {
        throw new index_1.ValidatePropertyError({
            propName: propName,
            propValue: propValue,
            validate: validate,
            serializableClass: serializableClass,
        });
    }
}
exports.default = assertValid;
