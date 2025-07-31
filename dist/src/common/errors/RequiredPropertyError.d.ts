type Params = {
    propName: string;
    propPath: string;
    json: Record<string, unknown>;
    serializableClass: new (...params: any[]) => any;
};
export default class RequiredPropertyError extends Error {
    constructor({ propName, propPath, json, serializableClass }: Params);
}
export {};
