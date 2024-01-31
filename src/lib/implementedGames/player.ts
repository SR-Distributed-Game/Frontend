import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { Vector2 } from "$lib/GameEngine/Vector2";
import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {

    private speed: number;

    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.speed = 10;
        this.setName("player");
        this.getTransform().getScale().setX(20);
        this.getTransform().getScale().setY(20);
    }

    start(): void {
        this.addDrawComponent(new DrawElipseComponent(this, "red"));
    }

    update(p:any) {

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
        this.asyncMove( this.getTransform().getPosition().add(amountToMove));


    }

}