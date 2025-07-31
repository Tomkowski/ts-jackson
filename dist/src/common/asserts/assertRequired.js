"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
function assertRequired(_a) {
    var propName = _a.propName, propPath = _a.propPath, propValue = _a.propValue, json = _a.json, serializableClass = _a.serializableClass;
    if (propValue === undefined) {
        throw new index_1.RequiredPropertyError({
            json: json,
            propName: propName,
            serializableClass: serializableClass,
            propPath: propPath,
        });
    }
}
exports.default = assertRequired;
