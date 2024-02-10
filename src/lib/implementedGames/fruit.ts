import { ColliderComponent } from "$lib/GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "$lib/GameEngine/Components/DrawRectangleComponent";
import { Vector2 } from "$lib/GameEngine/Vector2";
import type p5 from "p5";
import { GameObject } from "../GameEngine/GameObject";

import { DrawElipseComponent } from "$lib/GameEngine/Components/DrawElipseComponent";
import { Serializable } from "$lib/GameEngine/Serialized";
import { InertiaFrictionComponent } from "$lib/GameEngine/Components/InnertiaComponent";
import type { player } from "./player";
import { DrawTextComponent } from "$lib/GameEngine/Components/DrawTextComponent";

export class fruit extends GameObject {
    gfx:DrawRectangleComponent;
    randomColor:string;
    plRef:player | null;
    @Serializable
    public SerializationTest: string;

    @Serializable
    private lifeTime: number;

    constructor() {
        super();
        this.plRef = null;
        this.tag = "fruit";
        this.SerializationTest = "";
        this.setName("fruit");
        this.setId(-1);
        this.getTransform().getScale().setX(10);
        this.getTransform().getScale().setY(10);
        this.lifeTime = 0;
        this.randomColor = this.getRandomHexColor();
        this.gfx = new DrawElipseComponent(this, this.randomColor);

    }

    setPlayerRef(pl:player){
        this.plRef = pl;
    }

    getRandomHexColor(): string {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    start(): void {
        this.addDrawComponent(this.gfx);
        this.addComponent( new ColliderComponent(this));
        
    }

    update(p: p5): void {
        this.gfx.setColor(this.randomColor);
    }

    onCollision(collider: ColliderComponent): void {
        console.log("fruit collided with " + collider.getParent().getName());
        this.randomColor = this.getRandomHexColor();
        if (collider.getParent().getTag() == "player"){
            this.gfx.setColor("#00000000");
        }
    }

}