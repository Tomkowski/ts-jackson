import SerializableEntity from '../../SerializableEntity';
export default class Token extends SerializableEntity {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly tokenType: string;
    readonly expiresIn: number;
    expiresAt: Date;
}
