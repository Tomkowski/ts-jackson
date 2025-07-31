"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../index");
var Token_1 = __importDefault(require("./Token"));
describe('Token', function () {
    it('should throw Error if provided data for serialization if incorrect', function () {
        expect(function () { return Token_1.default.deserialize({ access_token: undefined }); }).toThrow();
    });
    var tokenJSON = {
        access_token: '234dewwf',
        refresh_token: '2fed2oekio2',
        expires_in: 3600,
        token_type: 'Bearer',
    };
    test('deserialize', function () {
        var token = Token_1.default.deserialize(tokenJSON);
        expect(token).toMatchObject({
            accessToken: tokenJSON.access_token,
            refreshToken: tokenJSON.refresh_token,
            expiresIn: tokenJSON.expires_in,
            tokenType: tokenJSON.token_type,
        });
    });
    test('serialize', function () {
        var token = Token_1.default.deserialize(tokenJSON);
        expect((0, index_1.serialize)(token)).toMatchObject(tokenJSON);
    });
});
