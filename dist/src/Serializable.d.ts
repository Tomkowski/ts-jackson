import 'reflect-metadata';
export type SerializableMetadata = {
    className: string;
};
/**
 * Decorator for marking classes as serializable. It assigns metadata
 * to the class indicating its name.
 *
 * @returns {Function} Class decorator function.
 */
export default function Serializable(): (target: new (...args: any[]) => unknown) => void;
