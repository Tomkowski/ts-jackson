import SerializableEntity from '../../../SerializableEntity';
export default class Artist extends SerializableEntity {
    readonly id: string;
    readonly name: string;
    readonly href: string;
}
