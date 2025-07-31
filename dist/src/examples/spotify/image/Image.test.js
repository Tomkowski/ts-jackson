"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../index");
var Image_1 = __importDefault(require("./Image"));
describe('Image Entity', function () {
    it('should throw Error if provided data for serialization if incorrect', function () {
        expect(function () { return Image_1.default.deserialize({}); }).toThrow();
    });
    test('deserialize', function () {
        var imageJson = {
            height: '234',
            width: '123',
            url: 'http://localhost:8080',
        };
        var image = Image_1.default.deserialize(imageJson);
        expect(image).toMatchObject({
            height: parseInt(imageJson.height),
            width: parseInt(imageJson.width),
            url: imageJson.url,
        });
    });
    test('serialize', function () {
        var imageJson = {
            height: '234',
            width: '123',
            url: 'http://localhost:8080',
        };
        var image = Image_1.default.deserialize(imageJson);
        expect((0, index_1.serialize)(image)).toEqual({
            height: parseInt(imageJson.height),
            width: parseInt(imageJson.width),
            url: imageJson.url,
        });
    });
    it('should omit unrequited field if those are not provided', function () {
        var imageJson = {
            url: 'http://localhost:8080',
        };
        var image = Image_1.default.deserialize(imageJson);
        expect(image).toMatchObject({
            url: imageJson.url,
        });
    });
});
