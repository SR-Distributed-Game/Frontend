import type { Camera } from "$lib/GameEngine/Camera";
import { Game } from "$lib/GameEngine/Game";
import { GameObject } from "$lib/GameEngine/GameObject";
import { Serializable } from "$lib/GameEngine/Serialized";
import type p5 from "p5";

export class Leaderboard extends GameObject {
    
    @Serializable
    private leaderboard: any;

    
    constructor() {
        super();
        this.playercount = 0;
        this.leaderboard = {};
    }

    start(): void {
        this.tag = "Leaderboard";
    }


    draw(p: p5, camera: Camera): void {
        p.fill("black");
        p.rect(this.getTransform().getPosition().getX(), this.getTransform().getPosition().getY() ,15*20 , this.leaderboard.length*20 + 100);
        p.fill("white");
        p.textSize(32);
        p.text("Leaderboard", this.getTransform().getPosition().getX() + 10, this.getTransform().getPosition().getY()  + 40);
        
        p.textSize(16);
        var i = 0;
        for (const player in this.leaderboard) {
            p.text(Game.getInstance().getScene().gameObjects.get(parseInt(player))?.getName() + " : " + this.leaderboard[player], this.getTransform().getPosition().getX() + 10, this.getTransform().getPosition().getY()  + 80 + i*20);
            i++;
        }
        
    }

}