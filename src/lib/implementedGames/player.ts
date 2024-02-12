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
        var plcolor = "#b0ffb0b0";
        if (this.clientID == SpringSocketServer.getInstance().getClientID()){
            //this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            this.addComponent(new PlayerMovementMouseComponent(this,this.speed));
            this.addComponent(new InterpolationComponent(this,0.05));
            this.attachCamera();
            plcolor = JSON.parse(localStorage.getItem("playerInfo")+"").color;
        }

        this.addDrawComponent(new DrawElipseComponent(this,plcolor));
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
            var playerInfo = JSON.parse(localStorage.getItem("playerInfo")+"");
            Game.getInstance().getScene().asyncRemoveObject(this);
            if ( playerInfo.bestScore < this.points){
                playerInfo.bestScore = this.points;
                var newbestScore = document.createElement("div");
                newbestScore.style.position = "absolute";
                newbestScore.style.width = "100%";
                newbestScore.style.height = "100%";
                newbestScore.style.zIndex = "101";
                newbestScore.style.color = "white";
                newbestScore.style.fontSize = "50px";
                newbestScore.style.textAlign = "center";
                newbestScore.style.transform = "translateY(40%)";
                newbestScore.innerHTML = "New best score: " + this.points;
                document.body.appendChild(newbestScore);

            }
            playerInfo.lastScore = this.points;

            localStorage.setItem("playerInfo", JSON.stringify(playerInfo));

            //add blured background with html dom
            var blur = document.createElement("div");
            blur.style.position = "absolute";
            blur.style.top = "0";
            blur.style.left = "0";
            blur.style.width = "100%";
            blur.style.height = "100%";
            blur.style.backgroundColor = "rgba(0,0,0,0.8)";
            blur.style.zIndex = "100";
            document.body.appendChild(blur);
            //add score with html dom
            var score = document.createElement("div");
            score.style.position = "absolute";
            score.style.width = "100%";
            score.style.height = "100%";
            score.style.zIndex = "101";
            score.style.color = "white";
            score.style.fontSize = "50px";
            score.style.textAlign = "center";

            score.style.transform = "translateY(-50%)";
            score.innerHTML = "Your score: " + this.points;
            document.body.appendChild(score);
            //add button with html dom
            var button = document.createElement("button");
            button.style.position = "absolute";
            button.style.marginTop = "20px";
            button.style.width = "200px";
            button.style.height = "50px";
            button.style.zIndex = "101";
            button.style.color = "white";
            button.style.fontSize = "20px";
            button.style.textAlign = "center";
            button.style.top = "60%";
            button.style.backgroundColor = "rgba(10,10,10,0.8)";
            button.style.borderRadius = "10px";
            button.style.left = "50%";
            button.style.transform = "translate(-50%,-50%)";
            button.innerHTML = "Play again";
            button.onclick = function(){
                window.location.assign("/");
            }
            document.body.appendChild(button);

            
        }
    }

}
