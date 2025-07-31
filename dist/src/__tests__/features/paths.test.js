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
var index_1 = require("../../../index");
var deserialize_1 = __importDefault(require("../../deserialize"));
var JsonProperty_1 = __importDefault(require("../../JsonProperty"));
var Serializable_1 = __importDefault(require("../../Serializable"));
describe('Paths', function () {
    describe('Multiple paths', function () {
        test('Paths deserialized as tuple', function () {
            var json = {
                id: 'idValue',
                bar: {
                    foo: 2,
                    baz: 'bazName',
                },
            };
            var Class = /** @class */ (function () {
                function Class() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        paths: ['id', 'bar.foo'],
                    }),
                    __metadata("design:type", Array)
                ], Class.prototype, "bar", void 0);
                Class = __decorate([
                    (0, Serializable_1.default)()
                ], Class);
                return Class;
            }());
            var expected = new Class();
            expected.bar = [json.id, json.bar.foo];
            var deserialized = (0, deserialize_1.default)(json, Class);
            expect(deserialized).toStrictEqual(expected);
            expect((0, index_1.serialize)(deserialized)).toStrictEqual({
                id: json.id,
                bar: {
                    foo: json.bar.foo,
                },
            });
        });
        var Image = /** @class */ (function () {
            function Image() {
            }
            __decorate([
                (0, JsonProperty_1.default)(),
                __metadata("design:type", String)
            ], Image.prototype, "url", void 0);
            Image = __decorate([
                (0, Serializable_1.default)()
            ], Image);
            return Image;
        }());
        test('Paths deserialized as an array of serializable object', function () {
            var json = {
                images: {
                    smallImage: {
                        url: 'mediumImageUrl',
                    },
                    mediumImage: {
                        url: 'mediumImageUrl',
                    },
                    bigImage: {
                        url: 'bigImageUrl',
                    },
                },
            };
            var Playlist = /** @class */ (function () {
                function Playlist() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        paths: ['images.smallImage', 'images.mediumImage', 'images.bigImage'],
                        elementType: Image,
                    }),
                    __metadata("design:type", Array)
                ], Playlist.prototype, "images", void 0);
                Playlist = __decorate([
                    (0, Serializable_1.default)()
                ], Playlist);
                return Playlist;
            }());
            var playlist = new Playlist();
            playlist.images = Object.values(json.images).map(function (imageJson) {
                return (0, deserialize_1.default)(imageJson, Image);
            });
            var deserialized = (0, deserialize_1.default)(json, Playlist);
            expect(deserialized).toStrictEqual(playlist);
            expect((0, index_1.serialize)(deserialized)).toStrictEqual(json);
        });
        test('Deserialize multiple paths into object', function () {
            var json = {
                images: [
                    {
                        url: 'mediumImageUrl',
                    },
                    {
                        url: 'mediumImageUrl',
                    },
                    {
                        url: 'bigImageUrl',
                    },
                ],
            };
            var Playlist = /** @class */ (function () {
                function Playlist() {
                }
                __decorate([
                    (0, JsonProperty_1.default)({
                        paths: ['images[0]', 'images[2]'],
                        elementType: Image,
                        deserialize: function (_a) {
                            var icon = _a[0], cover = _a[1];
                            return ({ icon: icon, cover: cover });
                        },
                        beforeSerialize: function (images) { return [images.icon, images.cover]; },
                    }),
                    __metadata("design:type", Object)
                ], Playlist.prototype, "images", void 0);
                Playlist = __decorate([
                    (0, Serializable_1.default)()
                ], Playlist);
                return Playlist;
            }());
            var deserialized = (0, deserialize_1.default)(json, Playlist);
            expect(deserialized).toStrictEqual(deserialized);
            expect((0, index_1.serialize)(deserialized)).toEqual({
                images: [json.images[0], undefined, json.images[2]],
            });
        });
    });
});
