type Params = {
    propName: string;
    propPath: string;
    propValue: unknown;
    json: Record<string, unknown>;
    serializableClass: new (...params: Array<unknown>) => unknown;
};
export default function assertRequired({ propName, propPath, propValue, json, serializableClass, }: Params): void;
export {};
