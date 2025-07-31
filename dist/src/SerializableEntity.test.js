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
var JsonProperty_1 = __importDefault(require("./JsonProperty"));
var SerializableEntity_1 = __importDefault(require("./SerializableEntity"));
describe('SerializableEntity', function () {
    describe('serialize/deserialize inheritance', function () {
        var Cat = /** @class */ (function (_super) {
            __extends(Cat, _super);
            function Cat() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                (0, JsonProperty_1.default)(),
                __metadata("design:type", String)
            ], Cat.prototype, "name", void 0);
            return Cat;
        }(SerializableEntity_1.default));
        it('should correctly deserialize a JSON object', function () {
            var json = { name: 'Mars' };
            var deserializedCat = Cat.deserialize(json);
            expect(deserializedCat).toBeInstanceOf(Cat);
            expect(deserializedCat.name).toEqual(json.name);
        });
        it('should correctly serialize an object', function () {
            var cat = new Cat();
            cat.name = 'Mars';
            var serializedCat = cat.serialize();
            expect(serializedCat).toEqual({ name: 'Mars' });
        });
    });
    describe('serialize/deserialize with constructor parameters', function () {
        var Cat = /** @class */ (function (_super) {
            __extends(Cat, _super);
            function Cat(color) {
                var _this = _super.call(this) || this;
                _this.color = color;
                return _this;
            }
            __decorate([
                (0, JsonProperty_1.default)(),
                __metadata("design:type", String)
            ], Cat.prototype, "name", void 0);
            return Cat;
        }(SerializableEntity_1.default));
        it('should deserialize with additional constructor params', function () {
            var json = { name: 'Mars' };
            var deserializedCat = Cat.deserialize(json, 'black');
            expect(deserializedCat).toBeInstanceOf(Cat);
            expect(deserializedCat.name).toEqual('Mars');
            expect(deserializedCat.color).toEqual('black');
        });
    });
});
