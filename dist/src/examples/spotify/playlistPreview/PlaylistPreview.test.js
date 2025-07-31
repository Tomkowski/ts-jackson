"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../index");
var Image_1 = __importDefault(require("../image/Image"));
var PlaylistPreview_1 = __importDefault(require("./PlaylistPreview"));
var testPlaylistJson = {
    name: 'Upp och hoppa!',
    collaborative: false,
    description: 'Du kommer studsa ur sängen med den här spellistan.',
    external_urls: {
        spotify: 'http://open.spotify.com/user/spotify__sverige/playlist/4uOEx4OUrkoGNZoIlWMUbO',
    },
    href: 'https://api.spotify.com/v1/users/spotify__sverige/playlists/4uOEx4OUrkoGNZoIlWMUbO',
    id: '4uOEx4OUrkoGNZoIlWMUbO',
    tracks: {
        href: 'https://api.spotify.com/v1/users/spotify__sverige/playlists/4uOEx4OUrkoGNZoIlWMUbO/tracks',
        total: 38,
    },
    images: [
        {
            height: 300,
            url: 'https://i.scdn.co/image/24aa1d1b491dd529b9c03392f350740ed73438d8',
            width: 300,
        },
    ],
};
describe('PlaylistPreview Entity', function () {
    it('should throw Error if provided data for serialization if incorrect', function () {
        expect(function () { return PlaylistPreview_1.default.deserialize({}); }).toThrow();
    });
    test('deserialize', function () {
        var playlistPreview = PlaylistPreview_1.default.deserialize(testPlaylistJson);
        expect(playlistPreview).toMatchObject({
            id: testPlaylistJson.id,
            name: testPlaylistJson.name,
            description: testPlaylistJson.description,
            backgroundImage: Image_1.default.deserialize(testPlaylistJson.images[0]),
            href: testPlaylistJson.href,
            tracks: {
                href: testPlaylistJson.tracks.href,
                total: testPlaylistJson.tracks.total,
            },
        });
        expect(playlistPreview instanceof PlaylistPreview_1.default).toBeTruthy();
        expect(playlistPreview.backgroundImage instanceof Image_1.default).toBeTruthy();
    });
    test('serialize', function () {
        var playlistPreview = PlaylistPreview_1.default.deserialize(testPlaylistJson);
        expect((0, index_1.serialize)(playlistPreview)).toEqual({
            id: testPlaylistJson.id,
            name: testPlaylistJson.name,
            description: testPlaylistJson.description,
            href: testPlaylistJson.href,
            images: [(0, index_1.serialize)(playlistPreview.backgroundImage)],
            tracks: {
                href: testPlaylistJson.tracks.href,
                total: testPlaylistJson.tracks.total,
            },
        });
    });
});
