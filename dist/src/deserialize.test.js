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
var common_1 = require("./common");
var deserialize_1 = __importDefault(require("./deserialize"));
var JsonProperty_1 = __importDefault(require("./JsonProperty"));
var Serializable_1 = __importDefault(require("./Serializable"));
function inRange(value, start, end) {
    return value >= start && value <= end;
}
describe('deserialize', function () {
    describe('Basic deserialization', function () {
        test('Class with object field', function () {
            var json = {
                bar: {
                    foo: true,
                    baz: 'bazName',
                },
            };
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Object)
                ], Class.prototype, "bar", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            var expected = new Class();
            expected.bar = json.bar;
            expect((0, deserialize_1.default)(json, Class)).toStrictEqual(expected);
        });
        test('Class with default properties', function () {
            var Class = /** @class */ (function () {
                function Class() {
                    this.baz = 'test';
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Object)
                ], Class.prototype, "baz", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            expect((0, deserialize_1.default)({}, Class)).toStrictEqual(new Class());
        });
        test('Field without JsonProperty decorator', function () {
            var Class = /** @class */ (function () {
                function Class() {
                    this.baz = 'bazValue';
                    this.foo = 'fooValue';
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Object)
                ], Class.prototype, "baz", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            expect((0, deserialize_1.default)({}, Class)).toStrictEqual(new Class());
        });
        test('Class with array properties', function () {
            var json = {
                primitiveArray: [1, 2, 3],
                complexArray: [{ foo: 4 }, { baz: true, bar: 'varValue' }],
            };
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Array)
                ], Class.prototype, "primitiveArray", void 0);
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Array)
                ], Class.prototype, "complexArray", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            var expected = new Class();
            expected.primitiveArray = json.primitiveArray;
            expected.complexArray = json.complexArray;
            expect((0, deserialize_1.default)(json, Class)).toEqual(expected);
        });
        test('String json deserialization', function () {
            var json = {
                bar: {
                    foo: true,
                    baz: 'bazName',
                },
            };
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Object)
                ], Class.prototype, "bar", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            var expected = new Class();
            expected.bar = json.bar;
            expect((0, deserialize_1.default)(JSON.stringify(json), Class)).toStrictEqual(expected);
        });
    });
    describe('Advanced deserialization scenarios', function () {
        test('Class with constructor arguments', function () {
            var json = {
                id: 'idValue',
                bar: { foo: true, baz: 'bazName' },
            };
            var TestClass = /** @class */ (function () {
                function TestClass(foo, baz) {
                    this.foo = foo;
                    this.baz = baz;
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], TestClass.prototype, "id", void 0);
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Object)
                ], TestClass.prototype, "bar", void 0);
                TestClass = __decorate([
                    (0, Serializable_1.default)(),
                    __metadata("design:paramtypes", [Number, String])
                ], TestClass);
                return TestClass;
            }());
            var expected = new TestClass(4, 'baz');
            expected.id = json.id;
            expected.bar = json.bar;
            expect((0, deserialize_1.default)(json, TestClass, 4, 'baz')).toStrictEqual(expected);
        });
        test('Class with required field', function () {
            var TestClass = /** @class */ (function () {
                function TestClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({ required: true }),
                    __metadata("design:type", String)
                ], TestClass.prototype, "id", void 0);
                TestClass = __decorate([
                    (0, Serializable_1.default)()
                ], TestClass);
                return TestClass;
            }());
            expect(function () { return (0, deserialize_1.default)({}, TestClass); }).toThrow(new common_1.RequiredPropertyError({
                serializableClass: TestClass,
                json: {},
                propName: 'id',
                propPath: 'id',
            }));
        });
        test('Class with path alternatives', function () {
            var TestClass = /** @class */ (function () {
                function TestClass() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({ pathAlternatives: ['treat', 'goodie'] }),
                    __metadata("design:type", String)
                ], TestClass.prototype, "snack", void 0);
                TestClass = __decorate([
                    (0, Serializable_1.default)()
                ], TestClass);
                return TestClass;
            }());
            var jsonTreat = {
                treat: 'Scooby Snack',
            };
            var jsonGoodie = {
                goodie: 'Sandwich',
            };
            var expected = new TestClass();
            expected.snack = jsonTreat.treat;
            expect((0, deserialize_1.default)(jsonTreat, TestClass)).toStrictEqual(expected);
            expected.snack = jsonGoodie.goodie;
            expect((0, deserialize_1.default)(jsonGoodie, TestClass)).toStrictEqual(expected);
        });
        test('Class with one to one relation', function () {
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, Serializable_1.default)()
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
                    (0, Serializable_1.default)()
                ], Owner);
                return Owner;
            }());
            var json = {
                name: 'Shaggy',
                dog: { name: 'Scooby Doo' },
            };
            var dog = new Dog();
            dog.name = json.dog.name;
            var expected = new Owner();
            expected.name = json.name;
            expected.dog = dog;
            expect((0, deserialize_1.default)(json, Owner)).toStrictEqual(expected);
        });
        test('Class with one to many relation', function () {
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, Serializable_1.default)()
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
                    (0, Serializable_1.default)()
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
            var expected = new Owner();
            expected.dogs = [scoobyDoo, scrappyDoo];
            expected.name = json.name;
            expect((0, deserialize_1.default)(json, Owner)).toStrictEqual(expected);
        });
        test('"Set" property type', function () {
            var Dog = /** @class */ (function () {
                function Dog() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Dog.prototype, "name", void 0);
                Dog = __decorate([
                    (0, Serializable_1.default)()
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
                    (0, Serializable_1.default)()
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
            var expected = new Owner();
            expected.dogs = new Set([scoobyDoo, scrappyDoo]);
            expected.name = json.name;
            expect((0, deserialize_1.default)(json, Owner)).toStrictEqual(expected);
        });
        // ... [Continuation from previous parts]
        test('Tuple type', function () {
            var Foo = /** @class */ (function () {
                function Foo() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Foo.prototype, "value", void 0);
                Foo = __decorate([
                    (0, Serializable_1.default)()
                ], Foo);
                return Foo;
            }());
            var Bar = /** @class */ (function () {
                function Bar() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        type: [Number, Array, Foo],
                    }),
                    __metadata("design:type", Array)
                ], Bar.prototype, "params", void 0);
                Bar = __decorate([
                    (0, Serializable_1.default)()
                ], Bar);
                return Bar;
            }());
            var json = { params: [5, ['test'], { value: 'FooValue' }] };
            var deserialized = (0, deserialize_1.default)(json, Bar);
            var expected = new Bar();
            expected.params = [
                json.params[0],
                json.params[1],
                new Foo(),
            ];
            expected.params[2].value = 'FooValue';
            expect(deserialized).toStrictEqual(expected);
            expect(deserialized.params[2]).toBeInstanceOf(Foo);
        });
        describe('Inheritance', function () {
            var Profile = /** @class */ (function () {
                function Profile() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Profile.prototype, "id", void 0);
                Profile = __decorate([
                    (0, Serializable_1.default)()
                ], Profile);
                return Profile;
            }());
            var Manager = /** @class */ (function (_super) {
                __extends(Manager, _super);
                function Manager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", String)
                ], Manager.prototype, "role", void 0);
                return Manager;
            }(Profile));
            it('should deserialize inherited properties', function () {
                var json = { id: 'idValue', role: 'assistant-manager' };
                var expected = new Manager();
                expected.id = json.id;
                expected.role = json.role;
                expect((0, deserialize_1.default)(json, Manager)).toStrictEqual(expected);
            });
        });
        describe('validate', function () {
            var validate = function (property) { return inRange(property, 18, 99); };
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({ validate: validate }),
                    __metadata("design:type", Number)
                ], Class.prototype, "age", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            test('should throw an error if property fails validation', function () {
                var invalidData = { age: 14 };
                expect(function () { return (0, deserialize_1.default)(invalidData, Class); }).toThrow(common_1.ValidatePropertyError);
            });
            test('should not throw an error if property passes validation', function () {
                var validData = { age: 18 };
                expect(function () { return (0, deserialize_1.default)(validData, Class); }).not.toThrow();
            });
        });
        test('Custom deserialize param', function () {
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        path: 'full_name',
                        deserialize: function (jsonValue) {
                            return jsonValue.name + ' ' + jsonValue.surname;
                        },
                    }),
                    __metadata("design:type", String)
                ], Class.prototype, "fullName", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            var json = { full_name: { name: 'John', surname: 'Doe' } };
            var expected = new Class();
            expected.fullName = 'John Doe';
            expect((0, deserialize_1.default)(json, Class)).toStrictEqual(expected);
        });
        describe('afterDeserialize', function () {
            test('modifies property after deserialization', function () {
                var Class = /** @class */ (function () {
                    function Class() {
                    }
                    __decorate([
                        (0, JsonProperty_1.default)({
                            path: 'expires_in',
                            afterDeserialize: function (_, propertyValue) {
                                return new Date(Date.now() + propertyValue * 1000);
                            },
                        }),
                        __metadata("design:type", Date)
                    ], Class.prototype, "expiresAt", void 0);
                    Class = __decorate([
                        (0, Serializable_1.default)()
                    ], Class);
                    return Class;
                }());
                var json = { expires_in: 3600 };
                var deserialized = (0, deserialize_1.default)(json, Class);
                expect(deserialized.expiresAt).toBeInstanceOf(Date);
                expect(deserialized.expiresAt.getTime()).toBeGreaterThan(Date.now());
            });
        });
        test('Class with floating number property', function () {
            var json = {
                temperature: 36.6,
            };
            var Person = /** @class */ (function () {
                function Person() {
                }
                __decorate([
                    (0, JsonProperty_1.default)(),
                    __metadata("design:type", Number)
                ], Person.prototype, "temperature", void 0);
                Person = __decorate([
                    (0, Serializable_1.default)()
                ], Person);
                return Person;
            }());
            var expected = new Person();
            expected.temperature = json.temperature;
            expect((0, deserialize_1.default)(json, Person)).toStrictEqual(expected);
        });
    });
});
