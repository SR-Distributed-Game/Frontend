import { gameRequestFactory } from "$lib/gameRequestFactory";
import type p5 from "p5";
import { Camera } from "./Camera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { fruit } from "$lib/implementedGames/fruit";
import type { Class } from "estree";
import { TypeRegistry } from "./TypeRegistry";

export abstract class Scene {

    //this counter will be decrease to avoid id conflicts with server objects
    LocalObjectIdCounter: number = -100;
    
    //now game objects will be stored in the game object with the id as the key

    gameObjects:Map<number, GameObject>;;

    typeRegistry = new TypeRegistry();

    game?:Game;

    constructor() {
        this.gameObjects = new Map<number, GameObject>();
    }

    attachGame(game: Game){
        this.game = game;
    }

    addObject(obj: GameObject){
        obj.Mstart();
        if (obj.getId() == -1){
            obj.setId(this.getnewLocalObjectId());
        }
        this.gameObjects.set(obj.getId(),obj);
    }

    removeObject(obj: GameObject){
        obj.Mend();
        this.gameObjects.delete(obj.getId());
    }

    removeObjectById(id: number){
        this.gameObjects.get(id)?.Mend();
        this.gameObjects.delete(id);
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);
    }

    asyncAddObject(obj: GameObject){
        var request = gameRequestFactory.getSpawnRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncRemoveObject(obj: GameObject){
        var request = gameRequestFactory.getDestroyRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncMoveObject(obj: GameObject, x: number, y: number){
        var request = gameRequestFactory.getUpdateRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    UpdateState(serverState: any) {
        const serverIds = new Set<number>();
    
        // Iterate over server state to update and add new objects
        for (const key in serverState) {
            if (serverState.hasOwnProperty(key)) {
                const obj = serverState[key];
                const type = obj.Type;
                const cls: any = this.getTypeRegistry().getTypeClass(type);
                if (cls) {
                    // Assuming `fromSerialized` is a static method that correctly instantiates objects
                    const gameObject = cls.fromSerialized(obj);
                    this.addObject(gameObject);
                    
                    serverIds.add(gameObject.getId());
                }
            }
        }
    
        // Collect all local object IDs
        const localObjectIds = new Set<number>(this.gameObjects.keys());
    
        // Determine objects missing from server state
        const objectsToRemove = Array.from(localObjectIds).filter(id => !serverIds.has(id) && id > 0);
    
        // Remove objects not present in server state
        objectsToRemove.forEach(id => this.removeObjectById(id));
    }


    sendToGame(req: any){
        Game.getInstance().getSender().sendRequest(req);
    }

    Mstart(p:p5){
        this.start(p);
    }

    start(p:p5){
    }

    Mupdate(p:p5){
        for(var ob of this.gameObjects.values()){
            ob.Mupdate(p);
            if (ob.shouldBeDestroyed()){
                this.removeObject(ob);
            }
        }
        this.update(p);
    }

    update(p:p5){
    }

    Mdraw(p:p5,camera: Camera){
        this.gameObjects.forEach(obj => obj.Mdraw(p,camera));
        this.draw(p,camera);
    }

    draw(p:p5,camera: Camera){
    
    }

    getnewLocalObjectId(): number {
        console.log("new local object id: " + this.LocalObjectIdCounter);
        return this.LocalObjectIdCounter--;
    }

    getTypeRegistry(): TypeRegistry {
        return this.typeRegistry;
    }

}