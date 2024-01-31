import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class fruit extends GameObject {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.setName("fruit");
        this.getTransform().getScale().setX(10);
        this.getTransform().getScale().setY(10);
        this.getTransform().setRotation(Math.random()*360);
    }

    start(): void {
        this.addDrawComponent(new DrawRectangleComponent(this, "green"));
    }

}