"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableEntity = exports.JsonProperty = exports.serialize = exports.deserialize = exports.Serializable = void 0;
var Serializable_1 = require("./src/Serializable");
Object.defineProperty(exports, "Serializable", { enumerable: true, get: function () { return __importDefault(Serializable_1).default; } });
var deserialize_1 = require("./src/deserialize");
Object.defineProperty(exports, "deserialize", { enumerable: true, get: function () { return __importDefault(deserialize_1).default; } });
var serialize_1 = require("./src/serialize");
Object.defineProperty(exports, "serialize", { enumerable: true, get: function () { return __importDefault(serialize_1).default; } });
var JsonProperty_1 = require("./src/JsonProperty");
Object.defineProperty(exports, "JsonProperty", { enumerable: true, get: function () { return __importDefault(JsonProperty_1).default; } });
var SerializableEntity_1 = require("./src/SerializableEntity");
Object.defineProperty(exports, "SerializableEntity", { enumerable: true, get: function () { return __importDefault(SerializableEntity_1).default; } });
