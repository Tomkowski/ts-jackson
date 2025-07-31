export default class SerializableError extends Error {
    constructor(target: (new (...args: any[]) => unknown) | Function);
}
