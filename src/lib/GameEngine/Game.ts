import * as PIXI from 'pixi.js';

export class Game extends PIXI.Application{

    static instance: Game;
    canvasContainer?: HTMLDivElement;
    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game({backgroundColor: 0x1099bb });
            Game.instance.init();
        }
        return Game.instance;
    }

    init(){
        this.canvasContainer = document.createElement("div");
        (this.view as unknown as HTMLDivElement).classList.add("rounded-lg", "shadow-xl");
        this.canvasContainer.appendChild(this.view as unknown as Node);
    }

    getContainer(){
        console.log(this.canvasContainer);
        return this.canvasContainer;
    }

    addObject(obj: PIXI.Container){
        this.stage.addChild(obj);
    }

    removeObject(obj: PIXI.Container){
        this.stage.removeChild(obj);
    }

}