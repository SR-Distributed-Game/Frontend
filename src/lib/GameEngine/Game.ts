import { RequestSender } from '$lib/RequestSender';
import { gameRequestFactory } from '$lib/gameRequestFactory';
import { messageSubscriber } from '$lib/messageSubscriber';
import { gameRequest } from '$lib/request';
import { GameObject } from './GameObject';

export class Game extends messageSubscriber{

    static instance: Game;
    protected sender: RequestSender;
    private objects: GameObject[] = [];
    keys: any = {};

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    constructor(){
        super();
        this.sender = new RequestSender();
    }

    addObject(obj: GameObject){
        this.objects.push(obj);
        var request = gameRequestFactory.getSpawnRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    removeObject(obj: GameObject){
        this.objects = this.objects.filter((o) => o!== obj);
        var request = gameRequestFactory.getDestroyRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.transform.x = x;
        obj.transform.y = y;

        var request = gameRequestFactory.getUpdateRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    asyncAddObject(obj: GameObject){
        var request = gameRequestFactory.getSpawnRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    asyncRemoveObject(obj: GameObject){
        var request = gameRequestFactory.getDestroyRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    asyncMoveObject(obj: GameObject, x: number, y: number){
        var request = gameRequestFactory.getUpdateRequest();
        request.Metadata = obj.asMetadata();
        this.sender.sendRequest(request);
    }

    onMessage(req: any): void {
        console.log("handling message: " + req);
    }

    start(p:any){

    }

    Mstart(p:any){
        this.start(p);
    }

    update(p:any){
    
    }

    Mupdate(p:any){
        this.objects.forEach(obj => obj.update(p));
        this.update(p);
    }

    draw(p:any) {
        // Draw all game objects
        this.Mupdate(p);
        this.objects.forEach(obj => obj.draw(p));
    }


}