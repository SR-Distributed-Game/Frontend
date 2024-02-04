import 'reflect-metadata';
// Decorator for marking properties as serializable and updatable
export function Serializable(target: any, propertyKey: string): void {
    const className = target.constructor.name;
    if (!Reflect.hasMetadata('serializableProperties', target.constructor)) {
        Reflect.defineMetadata('serializableProperties', [], target.constructor);
    }
    const properties: string[] = Reflect.getMetadata('serializableProperties', target.constructor);
    properties.push(propertyKey);
    Reflect.defineMetadata('serializableProperties', properties, target.constructor);
}
