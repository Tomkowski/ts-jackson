import SerializableEntity from '../../../SerializableEntity';
import { Image } from '../image';
export default class PlaylistPreview extends SerializableEntity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly backgroundImage: Image;
    readonly href: string;
    readonly tracks: {
        href: string;
        total: number;
    };
}
