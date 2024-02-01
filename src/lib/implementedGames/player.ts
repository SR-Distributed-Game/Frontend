import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { PlayerMovementComponent } from "$lib/GameEngine/Components/PlayerMovementComponent";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {

    private speed: number;

    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.speed = 5;
        this.setName("player");
        this.getTransform().getScale().setX(20);
        this.getTransform().getScale().setY(20);
    }

    start(): void {

        this.addDrawComponent(new DrawElipseComponent(this, "red"));
        this.addComponent(new PlayerMovementComponent(this,this.speed));
        //this.attachCamera();
    }

}