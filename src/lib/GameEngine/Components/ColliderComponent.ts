import { Component } from "../Component";
import { Game } from "../Game";
import type { GameObject } from "../GameObject";

export class ColliderComponent extends Component {
    constructor(parent:GameObject) {
        super(parent);
    }
    
    update(p:any) {
        Game.getInstance().getCollisionSystem().insert(this);
    }

    MonCollisionEnter(collider:ColliderComponent) {
        this.getParent().MonCollision(collider);
    }

}