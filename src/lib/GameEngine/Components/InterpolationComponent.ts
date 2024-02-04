import type p5 from "p5";
import { Component } from "../Component";
import { Vector2 } from "../Vector2";
import type { GameObject } from "../GameObject";

export class InterpolationComponent extends Component {
    private lastPosition: Vector2;
    private targetPosition: Vector2;
    private interpolationSpeed: number; 

    constructor(parent: GameObject, interpolationSpeed: number = 0.1) {
        super(parent);
        this.lastPosition = this.getParent().getTransform().getPosition().copy();
        this.targetPosition = this.lastPosition.copy();
        this.interpolationSpeed = interpolationSpeed;
    }

    update(p: p5) {
        const newPosition =Vector2.lerp(this.getParent().getTransform().getPosition(),this.targetPosition, this.interpolationSpeed); ;

        this.getParent().getTransform().setPosition(newPosition);
    }

    public onNetworkUpdate(newPosition: Vector2) {
        this.lastPosition = this.getParent().getTransform().getPosition().copy();
        this.targetPosition = newPosition.copy();
    }
}