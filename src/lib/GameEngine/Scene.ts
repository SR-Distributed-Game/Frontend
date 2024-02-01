import { gameRequestFactory } from "$lib/gameRequestFactory";
import { Camera } from "./Camera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";

export class Scene {
    
    gameObjects : GameObject[];
    game?:Game;

    constructor() {
        this.gameObjects = [];
    }

    attachGame(game: Game){
        this.game = game;
    }

    addObject(obj: GameObject){
        obj.Mstart();
        this.gameObjects.push(obj);
        var request = gameRequestFactory.getSpawnRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }

    removeObject(obj: GameObject){
        obj.Mend();
        this.gameObjects = this.gameObjects.filter((o) => o!== obj);
        var request = gameRequestFactory.getDestroyRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);

        var request = gameRequestFactory.getUpdateRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }

    asyncAddObject(obj: GameObject){
        var request = gameRequestFactory.getSpawnRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }

    asyncRemoveObject(obj: GameObject){
        var request = gameRequestFactory.getDestroyRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }

    asyncMoveObject(obj: GameObject, x: number, y: number){
        var request = gameRequestFactory.getUpdateRequest();
        request.addMetadata("objectData", obj.asMetadata());
        this.sendToGame(request);
    }


    sendToGame(req: any){
        Game.getInstance().getSender().sendRequest(req);
    }

    Mstart(p:any){
        //this.gameObjects.forEach(obj => obj.Mstart());
        this.start(p);
    }

    start(p:any){
    }

    Mupdate(p:any){
        for(var ob of this.gameObjects){
            ob.Mupdate(p);
            if (ob.shouldBeDestroyed()){
                this.removeObject(ob);
            }
        }
        //this.gameObjects.forEach(obj => obj.Mupdate(p));
        this.update(p);
    }

    update(p:any){
    }

    Mdraw(p:any,camera: Camera){
        this.gameObjects.forEach(obj => obj.Mdraw(p,camera));
        this.draw(p,camera);
    }

    draw(p:any,camera: Camera){
    
    }

}