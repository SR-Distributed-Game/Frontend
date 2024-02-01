import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { LocalAnimator } from "$lib/GameEngine/Components/LocalAnimator";
import { Vector2 } from "$lib/GameEngine/Vector2";
import type p5 from "p5";
import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";
import { fruitAnnimation } from "./fruitAnnimation";

export class fruit extends GameObject {
    gfx:DrawRectangleComponent;
    randomColor:string;
    constructor(x: number, y: number) {
        super();
        this.setName("fruit");
        this.setId((Math.random()*1000));
        this.getTransform().setPosition(new Vector2(x,y));
        this.getTransform().getScale().setX(10);
        this.getTransform().getScale().setY(10);
        this.getTransform().setRotation(Math.random()*360);
        this.randomColor = Math.random()*200  + "";
        this.gfx = new DrawRectangleComponent(this, this.randomColor);
    }

    start(): void {
        this.addDrawComponent(this.gfx);
        this.addComponent( new ColliderComponent(this));

    }

    update(p: p5): void {
        this.gfx.setColor(this.randomColor);
    }

    onCollision(collider: ColliderComponent): void {
        this.gfx.setColor("blue");
    }

}