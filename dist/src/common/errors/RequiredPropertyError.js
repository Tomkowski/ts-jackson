"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RequiredPropertyError = /** @class */ (function (_super) {
    __extends(RequiredPropertyError, _super);
    function RequiredPropertyError(_a) {
        var propName = _a.propName, propPath = _a.propPath, json = _a.json, serializableClass = _a.serializableClass;
        var className = serializableClass.name;
        var formattedJson = JSON.stringify(json, null, 2); // Prettify the JSON output
        var message = "Property '".concat(propName, "' (path: '").concat(propPath, "') is required in ").concat(className, " but missing in provided JSON: ").concat(formattedJson, ".");
        return _super.call(this, message) || this;
    }
    return RequiredPropertyError;
}(Error));
exports.default = RequiredPropertyError;
