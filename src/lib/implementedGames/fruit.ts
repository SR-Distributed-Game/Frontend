import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { Vector2 } from "$lib/GameEngine/Vector2";
import type p5 from "p5";
import { GameObject } from "../GameEngine/GameObject";

import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { Serializable } from "$lib/GameEngine/Serialized";

export class fruit extends GameObject {
    gfx:DrawRectangleComponent;
    randomColor:string;

    @Serializable
    public SerializationTest: string;

    constructor() {
        super();
        this.SerializationTest = "";
        this.setName("fruit");
        this.setId((Math.random()*1000));
        this.getTransform().getScale().setX(10);
        this.getTransform().getScale().setY(10);
        this.getTransform().setRotation(Math.random()*360);
        this.randomColor = this.getRandomHexColor();
        this.gfx = new DrawElipseComponent(this, this.randomColor);
    }

    getRandomHexColor(): string {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    start(): void {
        this.addDrawComponent(this.gfx);
        this.addComponent( new ColliderComponent(this));
        console.log("fruit started with serialization test: "+this.SerializationTest);
    }

    update(p: p5): void {
        
        this.gfx.setColor(this.randomColor);
    }

    onCollision(collider: ColliderComponent): void {
        this.randomColor = this.getRandomHexColor();
    }

}