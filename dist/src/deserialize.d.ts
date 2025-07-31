import 'reflect-metadata';
/**
 * Function to deserialize json to Serializable class
 *
 * @param {Record<string, unknown> | string} json
 * @param serializableClass Class to which json should be serialized
 * @param args an arguments to be provided to constructor.
 * For example Cat(readonly name, readonly color)
 * deserialize({}, Cat, 'Moon', 'black')
 */
export default function deserialize<T, U extends Array<unknown>>(json: Record<string, unknown> | string, serializableClass: new (...args: [...U]) => T, ...args: U): T;
