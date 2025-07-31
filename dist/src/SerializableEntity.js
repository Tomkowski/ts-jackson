"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var deserialize_1 = __importDefault(require("./deserialize"));
var Serializable_1 = __importDefault(require("./Serializable"));
var serialize_1 = __importDefault(require("./serialize"));
/**
 * @class
 * Utility class that encapsulates deserialize, serialize
 * and the need for @Serializable explicit decoration.
 */
var SerializableEntity = /** @class */ (function () {
    function SerializableEntity() {
    }
    /**
     * @method Returns stringified results
     * of serialize method call
     */
    SerializableEntity.prototype.stringify = function () {
        return JSON.stringify(this.serialize());
    };
    SerializableEntity.prototype.serialize = function () {
        return (0, serialize_1.default)(this);
    };
    SerializableEntity.deserialize = function (json) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return deserialize_1.default.apply(void 0, __spreadArray([json, this], args, false));
    };
    SerializableEntity = __decorate([
        (0, Serializable_1.default)()
    ], SerializableEntity);
    return SerializableEntity;
}());
exports.default = SerializableEntity;
