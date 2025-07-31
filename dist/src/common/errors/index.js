"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePropertyError = exports.SerializableError = exports.RequiredPropertyError = void 0;
var RequiredPropertyError_1 = require("./RequiredPropertyError");
Object.defineProperty(exports, "RequiredPropertyError", { enumerable: true, get: function () { return __importDefault(RequiredPropertyError_1).default; } });
var SerializableError_1 = require("./SerializableError");
Object.defineProperty(exports, "SerializableError", { enumerable: true, get: function () { return __importDefault(SerializableError_1).default; } });
var ValidatePropertyError_1 = require("./ValidatePropertyError");
Object.defineProperty(exports, "ValidatePropertyError", { enumerable: true, get: function () { return __importDefault(ValidatePropertyError_1).default; } });
