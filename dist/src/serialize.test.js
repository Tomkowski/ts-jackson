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
var index_1 = require("../index");
var common_1 = require("./common");
var JsonProperty_1 = __importDefault(require("./JsonProperty"));
describe('serialize', function () {
    it('should throw an error if class is not annotated with Serializable', function () {
        var NonSerializableClass = /** @class */ (function () {
            function NonSerializableClass() {
            }
            return NonSerializableClass;
        }());
        expect(function () { return (0, index_1.serialize)(new NonSerializableClass()); }).toThrow(new common_1.SerializableError(NonSerializableClass));
    });
    describe('simple and nested path serialization', function () {
        it('handles simple paths', function () {
            var json = { foo: 'test', baz: 5, bars: ['hello', 'star'] };
            var SimpleClass = /** @class */ (function () {
                function SimpleClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], SimpleClass.prototype, "foo", void 0);
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Number)
                ], SimpleClass.prototype, "baz", void 0);
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Array)
                ], SimpleClass.prototype, "bars", void 0);
                SimpleClass = __decorate([
                    (0, index_1.Serializable)()
                ], SimpleClass);
                return SimpleClass;
            }());
            var instance = Object.assign(new SimpleClass(), json);
            expect((0, index_1.serialize)(instance)).toEqual(json);
        });
        it('handles nested paths', function () {
            var json = { nested: { foo: 'test', bars: ['hello', 'star'] } };
            var NestedClass = /** @class */ (function () {
                function NestedClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)('nested.foo'),
                    __metadata("design:type", String)
                ], NestedClass.prototype, "foo", void 0);
                __decorate([
                    (0, JsonProperty_1.default)('nested.bars[0]'),
                    __metadata("design:type", String)
                ], NestedClass.prototype, "bar1", void 0);
                __decorate([
                    (0, JsonProperty_1.default)('nested.bars[1]'),
                    __metadata("design:type", String)
                ], NestedClass.prototype, "bar2", void 0);
                NestedClass = __decorate([
                    (0, index_1.Serializable)()
                ], NestedClass);
                return NestedClass;
            }());
            var instance = new NestedClass();
            instance.bar1 = json.nested.bars[0];
            instance.bar2 = json.nested.bars[1];
            instance.foo = json.nested.foo;
            expect((0, index_1.serialize)(instance)).toEqual(json);
        });
    });
    describe('handling special types and relations', function () {
        it('handles "Set" property type', function () {
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, index_1.Serializable)()
                ], Dog);
                return Dog;
            }());
            var Owner = /** @class */ (function () {
                function Owner() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Owner.prototype, "name", void 0);
                __decorate([
                    (0, JsonProperty_1.default)({ elementType: Dog }),
                    __metadata("design:type", Set)
                ], Owner.prototype, "dogs", void 0);
                Owner = __decorate([
                    (0, index_1.Serializable)()
                ], Owner);
                return Owner;
            }());
            var json = {
                name: 'Shaggy',
                dogs: [{ name: 'Scooby Doo' }, { name: 'Scrappy Doo' }],
            };
            var scoobyDoo = new Dog();
            scoobyDoo.name = json.dogs[0].name;
            var scrappyDoo = new Dog();
            scrappyDoo.name = json.dogs[1].name;
            var owner = new Owner();
            owner.name = json.name;
            owner.dogs = new Set([scoobyDoo, scrappyDoo]);
            expect((0, index_1.serialize)(owner)).toStrictEqual(json);
        });
        it('ignores fields without JsonProperty decorator', function () {
            var ClassWithoutDecorator = /** @class */ (function () {
                function ClassWithoutDecorator() {
                    this.baz = 'bazValue';
                    this.foo = 'fooValue';
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], ClassWithoutDecorator.prototype, "baz", void 0);
                ClassWithoutDecorator = __decorate([
                    (0, index_1.Serializable)()
                ], ClassWithoutDecorator);
                return ClassWithoutDecorator;
            }());
            expect((0, index_1.serialize)(new ClassWithoutDecorator())).toStrictEqual({
                baz: 'bazValue',
            });
        });
        it('handles tuple types', function () {
            var Foo = /** @class */ (function () {
                function Foo() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Foo.prototype, "value", void 0);
                Foo = __decorate([
                    (0, index_1.Serializable)()
                ], Foo);
                return Foo;
            }());
            var Bar = /** @class */ (function () {
                function Bar() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({ type: [Number, Array, Foo] }),
                    __metadata("design:type", Array)
                ], Bar.prototype, "params", void 0);
                Bar = __decorate([
                    (0, index_1.Serializable)()
                ], Bar);
                return Bar;
            }());
            var json = {
                params: [5, ['test'], { value: 'FooValue' }],
            };
            var fooInstance = new Foo();
            fooInstance.value = 'FooValue';
            var barInstance = new Bar();
            barInstance.params = [
                json.params[0],
                json.params[1],
                fooInstance,
            ];
            expect((0, index_1.serialize)(barInstance)).toStrictEqual(json);
        });
        it('uses custom serialize parameters', function () {
            var ClassWithCustomSerialization = /** @class */ (function () {
                function ClassWithCustomSerialization() {
                    this.fullName = 'Jack Johns';
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        serialize: function (fullName) {
                            var _a = fullName.split(' '), name = _a[0], surname = _a[1];
                            return { name: name, surname: surname };
                        },
                    }),
                    __metadata("design:type", String)
                ], ClassWithCustomSerialization.prototype, "fullName", void 0);
                ClassWithCustomSerialization = __decorate([
                    (0, index_1.Serializable)()
                ], ClassWithCustomSerialization);
                return ClassWithCustomSerialization;
            }());
            expect((0, index_1.serialize)(new ClassWithCustomSerialization())).toEqual({
                fullName: { name: 'Jack', surname: 'Johns' },
            });
        });
        it('supports inheritance', function () {
            var Parent = /** @class */ (function () {
                function Parent() {
                    this.foo = 'fooValue';
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Parent.prototype, "foo", void 0);
                Parent = __decorate([
                    (0, index_1.Serializable)()
                ], Parent);
                return Parent;
            }());
            var Child = /** @class */ (function (_super) {
                __extends(Child, _super);
                function Child() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.baz = 'bazValue';
                    return _this;
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Child.prototype, "baz", void 0);
                Child = __decorate([
                    (0, index_1.Serializable)()
                ], Child);
                return Child;
            }(Parent));
            expect((0, index_1.serialize)(new Child())).toEqual({
                foo: 'fooValue',
                baz: 'bazValue',
            });
        });
        it('handles one-to-one relationships', function () {
            var json = { name: 'Shaggy', dog: { name: 'Scooby Doo' } };
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, index_1.Serializable)()
                ], Dog);
                return Dog;
            }());
            var Owner = /** @class */ (function () {
                function Owner() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Owner.prototype, "name", void 0);
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Dog)
                ], Owner.prototype, "dog", void 0);
                Owner = __decorate([
                    (0, index_1.Serializable)()
                ], Owner);
                return Owner;
            }());
            var dog = new Dog();
            dog.name = json.dog.name;
            var owner = new Owner();
            owner.name = json.name;
            owner.dog = dog;
            expect((0, index_1.serialize)(owner)).toStrictEqual(json);
        });
        it('handles one-to-many relationships', function () {
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, index_1.Serializable)()
                ], Dog);
                return Dog;
            }());
            var Owner = /** @class */ (function () {
                function Owner() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Owner.prototype, "name", void 0);
                __decorate([
                    (0, JsonProperty_1.default)({ elementType: Dog }),
                    __metadata("design:type", Array)
                ], Owner.prototype, "dogs", void 0);
                Owner = __decorate([
                    (0, index_1.Serializable)()
                ], Owner);
                return Owner;
            }());
            var json = {
                name: 'Shaggy',
                dogs: [{ name: 'Scooby Doo' }, { name: 'Scrappy Doo' }],
            };
            var scoobyDoo = new Dog();
            scoobyDoo.name = json.dogs[0].name;
            var scrappyDoo = new Dog();
            scrappyDoo.name = json.dogs[1].name;
            var owner = new Owner();
            owner.name = json.name;
            owner.dogs = [scoobyDoo, scrappyDoo];
            expect((0, index_1.serialize)(owner)).toStrictEqual(json);
        });
    });
});
