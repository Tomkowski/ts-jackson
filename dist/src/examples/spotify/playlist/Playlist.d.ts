import SerializableEntity from '../../../SerializableEntity';
import { Image } from '../image';
import { Track } from '../track';
export default class Playlist extends SerializableEntity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly icon?: Image;
    readonly backgroundImage: Image;
    readonly tracks: Track[];
}
