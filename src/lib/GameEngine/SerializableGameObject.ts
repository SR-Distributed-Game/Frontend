import { Transform } from "./Transform";

export abstract class SerializableGameObject{
    [key: string]: any;


    toSerialized(): any {
        const serializedData: any = {};
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];
        properties.forEach((property) => {
            const value = this[property];
            serializedData[property] = value instanceof SerializableGameObject ? value.toSerialized() : value;
        });
        serializedData["Type"] = this.constructor.name;
        return serializedData;
    }

    static fromSerialized<T extends SerializableGameObject>(this: new () => T, data: any): T {
        const instance = new this();

        Object.keys(data).forEach(property => {
            if (data[property] instanceof Object && !(data[property] instanceof Array)) {
                if (property === "transform" && instance[property] instanceof Transform) {
                    instance[property].updateFromData(data[property]);
                } else {

                }
            } else {
                (instance as any)[property] = data[property];
            }
        });
    
        return instance;
    }
    
    updateFromRequest(data: any): void {
        const properties: string[] = Reflect.getMetadata('serializableProperties', this.constructor) || [];
        properties.forEach((property) => {
            if (data.hasOwnProperty(property)) {
                this[property] = data[property];
            }
        });
    }



}