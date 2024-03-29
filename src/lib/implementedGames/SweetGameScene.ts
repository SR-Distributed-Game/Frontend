import type { Camera } from "$lib/GameEngine/Camera";
import { Scene } from "$lib/GameEngine/Scene";
import { Vector2 } from "$lib/GameEngine/Vector2";
import type p5 from "p5";
import { Game } from "../GameEngine/Game";
import { fruit } from "./fruit";
import { player } from "./player";
import { terrain } from "./terrain";
import { Leaderboard } from "./Leaderboard";

export class sweetGameScene extends Scene {

    pl1: player;
    terrainSize:Vector2;
    
    constructor() {
        super();
        this.pl1 = new player();
        this.pl1.getTransform().getPosition().setX(100);
        this.pl1.getTransform().getPosition().setY(100);
        this.asyncAddObject(this.pl1);
        this.terrainSize = new Vector2(2000, 2000);
    }

    start(p: p5) {
        //super important
        this.typeRegistry.registerType("fruit", fruit);
        this.typeRegistry.registerType("player", player);
        this.typeRegistry.registerType("Leaderboard", Leaderboard);

        this.addObject(new terrain(this.terrainSize));
        p.noStroke();

        p.mousePressed = () => {
            const f:fruit = new fruit();
            f.setPlayerRef(this.pl1);
            f.getTransform().getPosition().setX(Game.getInstance().getMousePosition().getX());
            f.getTransform().getPosition().setY(Game.getInstance().getMousePosition().getY());
            this.asyncAddObject(f);
        }
    }

    update(p: p5): void {

        
    }



}
