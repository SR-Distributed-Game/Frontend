import type p5 from "p5";
import { Component } from "../Component";
import type { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";

export class PlayerMovementComponent extends Component {
    speed: number;
    constructor(parent: GameObject, speed: number) {
        super(parent);
        this.speed = speed;
    }
    
    update(p:p5) {
        var amountToMove:Vector2;
        amountToMove = new Vector2(0,0);

        if(p.keyIsDown(p.LEFT_ARROW)){
            amountToMove.setX(-this.speed);
        }
        if(p.keyIsDown(p.RIGHT_ARROW)){
            amountToMove.setX(this.speed);
        }
        if(p.keyIsDown(p.UP_ARROW)){
            amountToMove.setY(-this.speed);
        }
        if(p.keyIsDown(p.DOWN_ARROW)){
            amountToMove.setY(this.speed);
        }
        amountToMove.normalize();
        this.getParent().asyncMove( this.getParent().getTransform().getPosition().add(amountToMove));
        

    }
}