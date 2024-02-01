import { GameObject } from "./GameObject";
import { Transform } from "./Transform";

export class Camera extends GameObject {
    constructor() {
        super();
        this.transform = new Transform(0, 0, 0, 0);
    }

    getTransform(): Transform {
        return this.transform;
    }

}
