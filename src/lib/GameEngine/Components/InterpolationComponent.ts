import type p5 from "p5";
import { Component } from "../Component";
import { Vector2 } from "../Vector2";
import type { GameObject } from "../GameObject";

export class InterpolationComponent extends Component {

    private interpolationSpeed: number; 

    constructor(parent: GameObject, interpolationSpeed: number = 0.1) {
        super(parent);
        this.interpolationSpeed = interpolationSpeed;
    }

    update(p: p5,dt:number) {
        const newPosition =Vector2.lerp(this.getParent().getTransform().getPosition(),this.getParent().getFutureTransform().getPosition(), this.interpolationSpeed);
        this.getParent().getTransform().setPosition(newPosition);
    }

}