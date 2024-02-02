import type { Camera } from "$lib/GameEngine/Camera";
import { Scene } from "$lib/GameEngine/Scene";
import { Vector2 } from "$lib/GameEngine/Vector2";
import type p5 from "p5";
import { Game } from "../GameEngine/Game";
import { fruit } from "./fruit";
import { player } from "./player";
import { terrain } from "./terrain";
import { Enemy } from "./Enemy";

export class sweetGameScene extends Scene {

    pl1: player;
    terrainSize:Vector2;
    
    constructor() {
        super();
        this.pl1 = new player(100, 100);
        this.addObject(this.pl1);
        this.terrainSize = new Vector2(2000, 2000);
    }

    start(p: p5) {
        this.addLocalObject(new terrain(this.terrainSize));
        p.noStroke();

        p.mousePressed = () => {
            this.addObject(new fruit(Game.getInstance().getMousePosition().getX(), Game.getInstance().getMousePosition().getY()));
        }

        /*for (let i = 0; i < 200; i++) {
            this.addObject(new fruit(Math.random() * this.terrainSize.getX(), Math.random() * this.terrainSize.getY()));
        }*/

        //simulate server init
        //this.simulate();
    }

    simulate() {
        //simulation of server send fruit
        setInterval(() => {
            this.addObject(new fruit(Math.random() * this.terrainSize.getX(), Math.random() * this.terrainSize.getY()));
        }, 1000);

        //simulation of server send enemy
        this.spawnEnemy();
    }

    spawnEnemy() {
        this.addObject(new Enemy(this.terrainSize.getX()*Math.random(),this.terrainSize.getY()*Math.random()));
    }


    update(p: p5): void {
        var currentx = this.pl1.getTransform().getPosition().getX();
        var currenty = this.pl1.getTransform().getPosition().getY();
        var currentdx = this.pl1.getTransform().getScale().getX();
        var currentdy = this.pl1.getTransform().getScale().getY();
        
        //checkCollision with the terrain
        if ( currentx < 0 ){
            this.pl1.getTransform().getPosition().setX(0);
        }
        if ( currenty < 0 ){
            this.pl1.getTransform().getPosition().setY(0);
        }
        if ( currentx + currentdx > this.terrainSize.getX() ){
            this.pl1.getTransform().getPosition().setX(this.terrainSize.getX() - currentdx);
        }
        if ( currenty + currentdy > this.terrainSize.getY() ){
            this.pl1.getTransform().getPosition().setY(this.terrainSize.getY() - currentdy);
        }
        
    }

}
