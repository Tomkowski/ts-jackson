import SerializableEntity from '../../../SerializableEntity';
import { Album } from '../album';
import { Artist } from '../artist';
export default class Track extends SerializableEntity {
    readonly id: string;
    readonly href: string;
    readonly name: string;
    readonly previewUrl: string;
    readonly album: Album;
    readonly artists: Artist[];
    readonly durationMs: number;
}
