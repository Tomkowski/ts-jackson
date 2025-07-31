"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../index");
var Artist_1 = __importDefault(require("../artist/Artist"));
var Image_1 = __importDefault(require("../image/Image"));
var Album_1 = __importDefault(require("./Album"));
var testAlbumJson = {
    album_type: 'album',
    artists: [
        {
            external_urls: {
                spotify: 'https://open.spotify.com/artist/23fqKkggKUBHNkbKtXEls4',
            },
            href: 'https://api.spotify.com/v1/artists/23fqKkggKUBHNkbKtXEls4',
            id: '23fqKkggKUBHNkbKtXEls4',
            name: 'Kygo',
            type: 'artist',
            uri: 'spotify:artist:23fqKkggKUBHNkbKtXEls4',
        },
    ],
    available_markets: ['AD', 'AE', 'AG'],
    external_urls: {
        spotify: 'https://open.spotify.com/album/7tcs1X9pzFvcLOPuhCstQJ',
    },
    href: 'https://api.spotify.com/v1/albums/7tcs1X9pzFvcLOPuhCstQJ',
    id: '7tcs1X9pzFvcLOPuhCstQJ',
    images: [
        {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b27380368f0aa8f90c51674f9dd2',
            width: 640,
        },
        {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e0280368f0aa8f90c51674f9dd2',
            width: 300,
        },
        {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d0000485180368f0aa8f90c51674f9dd2',
            width: 64,
        },
    ],
    name: 'Golden Hour',
    release_date: '2020-05-29',
    release_date_precision: 'day',
    total_tracks: 18,
    type: 'album',
    uri: 'spotify:album:7tcs1X9pzFvcLOPuhCstQJ',
};
describe('Album Entity', function () {
    it('should throw Error if provided data for serialization if incorrect', function () {
        expect(function () { return Album_1.default.deserialize({}); }).toThrow();
    });
    test('deserialize', function () {
        var album = Album_1.default.deserialize(testAlbumJson);
        expect(album).toMatchObject({
            id: testAlbumJson.id,
            name: testAlbumJson.name,
            totalTracks: testAlbumJson.total_tracks,
            releaseDate: testAlbumJson.release_date,
            artists: testAlbumJson.artists.map(function (a) { return Artist_1.default.deserialize(a); }),
            backgroundImage: Image_1.default.deserialize(testAlbumJson.images[0]),
            icon: Image_1.default.deserialize(testAlbumJson.images[2]),
            href: testAlbumJson.href,
        });
        expect(album instanceof Album_1.default).toBeTruthy();
        expect(album.backgroundImage instanceof Image_1.default).toBeTruthy();
        expect(album.icon instanceof Image_1.default).toBeTruthy();
    });
    test('serialize', function () {
        var album = Album_1.default.deserialize(testAlbumJson);
        expect((0, index_1.serialize)(album)).toEqual({
            id: album.id,
            name: album.name,
            total_tracks: album.totalTracks,
            release_date: testAlbumJson.release_date,
            artists: testAlbumJson.artists,
            images: [
                (0, index_1.serialize)(album.backgroundImage),
                undefined,
                (0, index_1.serialize)(album.icon),
            ],
            href: album.href,
        });
    });
});
