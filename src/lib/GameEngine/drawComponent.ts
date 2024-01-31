import type { Camera } from "./Camera";
import { Component } from "./Component";
import type { GameObject } from "./GameObject";

export class drawComponent extends Component{

    constructor(parent:GameObject) {
        super(parent);
    }

    draw(p: any,camera:Camera) {
    }

}