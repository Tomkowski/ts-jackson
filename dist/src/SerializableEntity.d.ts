/**
 * @class
 * Utility class that encapsulates deserialize, serialize
 * and the need for @Serializable explicit decoration.
 */
export default class SerializableEntity {
    /**
     * @method Returns stringified results
     * of serialize method call
     */
    stringify(): string;
    serialize(): Record<string, unknown>;
    static deserialize<T extends SerializableEntity, U extends Array<unknown>>(this: {
        new (...params: [...U]): T;
    }, json: Record<string, unknown>, ...args: U): T;
}
