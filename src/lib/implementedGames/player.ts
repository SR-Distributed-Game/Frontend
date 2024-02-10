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
import { Serializable } from "$lib/GameEngine/Serialized";
import { PlayerMovementMouseComponent } from "$lib/GameEngine/Components/PlayerMovementMouseComponent";
import { GameStateManager } from "./GameStateManager";

export class player extends GameObject {
    namegfx:DrawTextComponent;

    @Serializable
    private points: number;

    @Serializable
    private speed: number;

    @Serializable
    private hasBeenEaten: boolean = false;

    @Serializable
    private clientID: number;

    constructor() {
        super();
        console.log("player created in constructor");
        this.tag = "player";
        this.clientID = SpringSocketServer.getInstance().getClientID(); 
        this.speed = 5;
        this.points = 0;
        this.namegfx = new DrawTextComponent(this);
        this.setName(SpringSocketServer.getInstance().getPlayerName()+"");
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
        
        this.addDrawComponent(this.namegfx);
        if (this.clientID == SpringSocketServer.getInstance().getClientID()){
            //this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            this.attachCamera();
        }
        this.addDrawComponent(new DrawElipseComponent(this, "#b0ffb0b0"));
        this.addColliderComponent(new ColliderComponent(this));
        this.getTransform().getScale().setX(20);
        this.getTransform().getScale().setY(20);

        this.namegfx.setText(this.getName());
        this.namegfx.setColor("white");
        this.namegfx.setSize(20);
        
    }


    update(p: p5): void {
        if(this.clientID == SpringSocketServer.getInstance().getClientID()){
            if (this.hasBeenEaten){
                console.log("player has been eaten");
                GameStateManager.getInstance().setEndGameState();
            }
        }
    
    }

    end(): void {
        if(this.clientID == SpringSocketServer.getInstance().getClientID()){
            Game.getInstance().getScene().asyncRemoveObject(this);
            if (parseInt(localStorage.getItem("bestScore")+"") < this.points){
                localStorage.setItem("bestScore", this.points+"");
            }
            window.location.assign("/");
        }
    }

}
