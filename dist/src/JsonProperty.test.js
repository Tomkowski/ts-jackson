"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var common_1 = require("./common");
var JsonProperty_1 = __importDefault(require("./JsonProperty"));
describe('JsonProperty', function () {
    var testJsonPropertyMetadata = function (propertyName, expectedMetadata, targetClass) {
        var metaData = Reflect.getMetadata(common_1.ReflectMetaDataKeys.TsJacksonJsonProperty, targetClass);
        expect(metaData[propertyName]).toMatchObject(expectedMetadata);
    };
    it('should set default path when no args provided', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            __decorate([
                (0, JsonProperty_1.default)(),
                __metadata("design:type", String)
            ], TestClass.prototype, "foo", void 0);
            return TestClass;
        }());
        testJsonPropertyMetadata('foo', { name: 'foo', path: 'foo', type: String }, TestClass);
    });
    it('should set custom path when provided as string', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            __decorate([
                (0, JsonProperty_1.default)('a.b.c'),
                __metadata("design:type", Number)
            ], TestClass.prototype, "foo", void 0);
            return TestClass;
        }());
        testJsonPropertyMetadata('foo', { name: 'foo', path: 'a.b.c', type: Number }, TestClass);
    });
    it('should set custom path when provided in options', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            __decorate([
                (0, JsonProperty_1.default)({ path: 'a[0]' }),
                __metadata("design:type", Number)
            ], TestClass.prototype, "foo", void 0);
            return TestClass;
        }());
        testJsonPropertyMetadata('foo', { name: 'foo', path: 'a[0]', type: Number }, TestClass);
    });
    it('should handle custom validate function', function () {
        var validate = function (foo) { return foo > 5; };
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            __decorate([
                (0, JsonProperty_1.default)({ validate: validate }),
                __metadata("design:type", Number)
            ], TestClass.prototype, "foo", void 0);
            return TestClass;
        }());
        testJsonPropertyMetadata('foo', { validate: validate }, TestClass);
    });
    it('should override type when provided in options', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            __decorate([
                (0, JsonProperty_1.default)({ type: Array }),
                __metadata("design:type", Array)
            ], TestClass.prototype, "foo", void 0);
            return TestClass;
        }());
        testJsonPropertyMetadata('foo', { name: 'foo', path: 'foo', type: Array }, TestClass);
    });
    describe('Paths', function () {
        it('should handle multiple paths as an argument', function () {
            var TestClass = /** @class */ (function () {
                function TestClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(['path1', 'path2']),
                    __metadata("design:type", Number)
                ], TestClass.prototype, "foo", void 0);
                return TestClass;
            }());
            testJsonPropertyMetadata('foo', { name: 'foo', paths: ['path1', 'path2'], type: Number }, TestClass);
        });
        it('should handle multiple paths as a property', function () {
            var TestClass = /** @class */ (function () {
                function TestClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({ paths: ['path1', 'path2'] }),
                    __metadata("design:type", Number)
                ], TestClass.prototype, "foo", void 0);
                return TestClass;
            }());
            testJsonPropertyMetadata('foo', { name: 'foo', paths: ['path1', 'path2'], type: Number }, TestClass);
        });
    });
});
