import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { PlayerMovementComponent } from "$lib/GameEngine/Components/PlayerMovementComponent";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {
    gfx:DrawRectangleComponent;
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
        this.addComponent(new PlayerMovementComponent(this,this.speed));
        this.addColliderComponent(new ColliderComponent(this));
        this.attachCamera();
    }

    update(p: any): void {
        this.gfx.setColor("green");
    }

    onCollision(collider: ColliderComponent): void {
        this.gfx.setColor("purple");
        collider.getParent().destroy();
        this.setPoints(this.getPoints() + 1);
    }

}