import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { PlayerMovementComponent } from "$lib/GameEngine/Components/PlayerMovementComponent";
import type p5 from "p5";
import { GameObject } from "../GameEngine/GameObject";
import  { Camera } from "$lib/GameEngine/Camera";
import  { DrawTextComponent } from "$lib/GameEngine/Components/DrawTextComponent";
import { SpringSocketServer } from "$lib/connectionManager";
import { Game } from "$lib/GameEngine/Game";

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
        this.id = 5000000;
        this.getTransform().getScale().setX(20);
        this.getTransform().getScale().setY(20);
        this.gfx = new DrawElipseComponent(this, "#b0ffb0b0");
        this.namegfx = new DrawTextComponent(this);
        this.namegfx.setText(SpringSocketServer.getInstance().getPlayerName()+"");
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
        console.log("player started");
        this.addDrawComponent(this.gfx);
        this.addDrawComponent(this.namegfx);
        this.addComponent(new PlayerMovementComponent(this,this.speed));
        this.addColliderComponent(new ColliderComponent(this));
        this.attachCamera();
    }


    onCollision(collider: ColliderComponent): void {
         collider.getParent();
         Game.getInstance().getScene().asyncRemoveObject(collider.getParent());
    }

    draw(p: p5, camera: Camera): void {
        p.textSize(20);
        p.text("Points: " + this.points, 10, 20);
    }

}