import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { PlayerMovementComponent } from "$lib/GameEngine/Components/PlayerMovementComponent";
import type p5 from "p5";
import { GameObject } from "../GameEngine/GameObject";
import  { Camera } from "$lib/GameEngine/Camera";
import  { DrawTextComponent } from "$lib/GameEngine/Components/DrawTextComponent";
import { SpringSocketServer } from "$lib/connectionManager";

export class player extends GameObject {
    gfx:DrawRectangleComponent;
    namegfx:DrawTextComponent;
    private points: number;
    private speed: number;

    constructor(x: number, y: number) {
        super();
        this.speed = 5;
        this.points = 0;
        this.setName("player");
        this.getTransform().getScale().setX(20);
        this.getTransform().getScale().setY(20);
        this.gfx = new DrawRectangleComponent(this, "green");
        this.namegfx = new DrawTextComponent(this);
        this.namegfx.setText(SpringSocketServer.getInstance().getPlayerName());
        this.namegfx.setColor("white");
        this.namegfx.setSize(20);
    }

    setPoints(points: number): void {
        this.points = points;
    }

    getPoints(): number {
        return this.points;
    }

    start(): void {
        console.log("player started");
        this.addDrawComponent(this.gfx);
        this.addDrawComponent(this.namegfx);
        this.addComponent(new PlayerMovementComponent(this,this.speed));
        this.addColliderComponent(new ColliderComponent(this));
        this.attachCamera();
    }

    update(p: p5): void {
        this.gfx.setColor("green");
    }

    onCollision(collider: ColliderComponent): void {
        this.gfx.setColor("purple");
        collider.getParent().destroy();
        this.setPoints(this.getPoints() + 1);
    }

    draw(p: p5, camera: Camera): void {
        p.fill("white");
        p.textSize(20);
        p.text("Points: " + this.points, 10, 20);
    }

}