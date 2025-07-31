import SerializableEntity from '../../../SerializableEntity';
import { Artist } from '../artist';
import { Image } from '../image';
export default class Album extends SerializableEntity {
    readonly id: string;
    readonly name: string;
    readonly backgroundImage: Image;
    readonly icon: Image;
    readonly artists: Artist[];
    readonly releaseDate: string;
    readonly totalTracks: number;
    readonly href: string;
}
