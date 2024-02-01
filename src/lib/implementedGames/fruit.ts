import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { LocalAnimator } from "$lib/GameEngine/Components/LocalAnimator";
import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";
import { fruitAnnimation } from "./fruitAnnimation";

export class fruit extends GameObject {
    gfx:DrawRectangleComponent;
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.setName("fruit");
        this.getTransform().getScale().setX(10);
        this.getTransform().getScale().setY(10);
        this.getTransform().setRotation(Math.random()*360);
        this.gfx = new DrawRectangleComponent(this, "red");
    }

    start(): void {
        this.addDrawComponent(this.gfx);
        this.addComponent( new ColliderComponent(this));

    }

    update(p: any): void {
        this.gfx.setColor("red");
    }

    onCollision(collider: ColliderComponent): void {
        this.gfx.setColor("blue");
    }

}