"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var checkSerializable_1 = __importDefault(require("../checkSerializable"));
var SerializableError_1 = __importDefault(require("../errors/SerializableError"));
function assertSerializable(target) {
    if (!(0, checkSerializable_1.default)(target)) {
        throw new SerializableError_1.default(target);
    }
}
exports.default = assertSerializable;
