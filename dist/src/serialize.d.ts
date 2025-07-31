/**
 * Function to serialize Serializable class to json
 *
 * @param {Function} instance serializable instance
 * @returns {Record<string, unknown>} json
 */
export default function serialize<T extends new (...args: any[]) => unknown>(instance: InstanceType<T>): Record<string, unknown>;
