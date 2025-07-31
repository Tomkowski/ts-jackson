import SerializableEntity from '../../../SerializableEntity';
export default class Image extends SerializableEntity {
    readonly height?: number;
    readonly width?: number;
    readonly url: string;
}
