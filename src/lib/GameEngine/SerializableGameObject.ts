import { Game } from "./Game";
import { GameObject } from "./GameObject";
import type { Vector2 } from "./Vector2";


export abstract class SerializableGameObject{
    [key: string]: any;

    // Serialize instance to a plain object, considering only @Serializable properties
    toSerialized(): any {
        const serializedData: any = {};
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];
        properties.forEach((property) => {
            const value = this[property];
            serializedData[property] = value instanceof SerializableGameObject ? value.toSerialized() : value;
        });
        return serializedData;
    }

    static fromSerialized<T extends SerializableGameObject>(this: new () => T, data: any): T {
        const instance = new this();
        const properties: string[] = Reflect.getMetadata('serializableProperties', this) || [];
        properties.forEach((property) => {
            if (data.hasOwnProperty(property)) {
                (instance as any)[property] = data[property];
            }
        });
        return instance;
    }
    

    // Update instance properties from request data, considering only @Serializable properties
    updateFromRequest(data: any): void {
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];
        properties.forEach((property) => {
            if (data.hasOwnProperty(property)) {
                this[property] = data[property];
            }
        });
    }



}