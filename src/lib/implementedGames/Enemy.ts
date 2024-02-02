import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { GameObject } from "../GameEngine/GameObject";
import  { DrawTextComponent } from "$lib/GameEngine/Components/DrawTextComponent";
import { Vector2 } from "$lib/GameEngine/Vector2";

export class Enemy extends GameObject {
    gfx:DrawRectangleComponent;
    namegfx:DrawTextComponent;
    private points: number;
    private speed: number;

    constructor(x: number, y: number) {
        super();
        this.speed = 5;
        this.getTransform().setPosition(new Vector2(x,y));
        this.setName("player");
        this.points = 0;
        this.setPoints( Math.random()*1000);
        this.gfx = new DrawElipseComponent(this, "red");
        this.namegfx = new DrawTextComponent(this);
        this.namegfx.setText("enemy pas beau");
        this.namegfx.setColor("white");
        this.namegfx.setSize(20);
    }

    setPoints(points: number): void {
        this.points = points;
        this.getTransform().getScale().setX(20+this.points* 0.05);
        this.getTransform().getScale().setY(20+this.points*0.05);
    }

    getPoints(): number {
        return this.points;
    }

    start(): void {
        this.addDrawComponent(this.gfx);
        this.addDrawComponent(this.namegfx);
        this.addColliderComponent(new ColliderComponent(this));
    }


}