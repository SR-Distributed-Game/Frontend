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
import type { terrain } from "./terrain";
import { Vector2 } from "$lib/GameEngine/Vector2";
import { InterpolationComponent } from "$lib/GameEngine/Components/InterpolationComponent";

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

    terrain? : terrain;

    constructor() {
        super();
        console.log("player created in constructor");
        this.tag = "player";
        this.clientID = SpringSocketServer.getInstance().getClientID(); 
        this.speed = 0.2;
        this.points = 0;
        this.namegfx = new DrawTextComponent(this);
        this.setName(SpringSocketServer.getInstance().getPlayerName()+"");
        this.terrain = undefined;
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
        this.terrain = Game.getInstance().getScene().getObjectsByTag("terrain").at(0) as terrain;
        this.addDrawComponent(this.namegfx);
        if (this.clientID == SpringSocketServer.getInstance().getClientID()){
            //this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            //this.addComponent(new InterpolationComponent(this,0.5));
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


    update(p: p5,dt:number): void {
        if(this.clientID == SpringSocketServer.getInstance().getClientID()){
            if (this.hasBeenEaten){
                GameStateManager.getInstance().setEndGameState();
            }
            var posx = this.getTransform().getPosition().getX();
            var posy = this.getTransform().getPosition().getY();
            if (posx < 0){
                posx = 0;
            }
            if (posy < 0){
                posy = 0;
            }
            if (posx > this.terrain!.getTransform().getScale().getX() - this.getTransform().getScale().getX()){
                posx = this.terrain!.getTransform().getScale().getX() - this.getTransform().getScale().getX();
            }
            if (posy > this.terrain!.getTransform().getScale().getY() - this.getTransform().getScale().getY()){
                posy = this.terrain!.getTransform().getScale().getY() - this.getTransform().getScale().getY();
            }
            this.asyncMove(new Vector2(posx, posy));
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
