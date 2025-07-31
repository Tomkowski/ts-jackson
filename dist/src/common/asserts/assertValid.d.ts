type Params = {
    propName: string;
    propValue: unknown;
    validate: (property: unknown) => boolean;
    serializableClass: new (...params: Array<unknown>) => unknown;
};
export default function assertValid({ propName, propValue, validate, serializableClass, }: Params): void;
export {};
