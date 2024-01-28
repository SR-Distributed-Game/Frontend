import type { SpringSocketServer } from '$lib/connectionManager';
import { messageSubscriber } from '$lib/messageSubscriber';
import * as PIXI from 'pixi.js';

export class Game extends messageSubscriber{

    static instance: Game;
    public pixiApp!: PIXI.Application;
    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    constructor(){
        super();
    }

    registerWindow(pixiApp: PIXI.Application){
        this.pixiApp = pixiApp;
    }

    addObject(obj: PIXI.Container){
        this.pixiApp.stage.addChild(obj);
    }

    removeObject(obj: PIXI.Container){
        this.pixiApp.stage.removeChild(obj);
    }


    onMessage(req: any): void {
        console.log("handling message: " + req);
    }

}