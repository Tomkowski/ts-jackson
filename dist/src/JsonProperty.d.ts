import 'reflect-metadata';
/**
 * Type definition for JsonProperty parameters.
 */
type Params<P> = {
    path?: string;
    paths?: string[];
    pathAlternatives?: string[];
    required?: boolean;
    type?: (new (...args: any[]) => P) | {
        [K in keyof P]: new (...args: any[]) => P[K];
    };
    elementType?: new (...args: any[]) => P extends [] ? P[0] : any;
    validate?: (property: P) => boolean;
    deserialize?: (jsonValue: any) => P;
    serialize?: (property: P) => any;
    afterDeserialize?: (deserializedInstance: InstanceType<new (...args: any[]) => any>, propertyValue: any) => P;
    beforeSerialize?: (propertyValue: P) => any;
    afterSerialize?: (serializedData: any) => any;
};
export type JsonPropertyMetadata<P = any> = {
    name: string;
    path: string;
} & Params<P>;
/**
 * Decorator for collecting annotated property metadata.
 * Accepts a string, array of strings, or a Params object.
 *
 * @param {string | string[] | Params<P>} arg - The decorator argument.
 */
export default function JsonProperty<P = unknown>(arg?: Params<P> | string | string[]): (target: Object, propertyName: string) => void;
export {};
