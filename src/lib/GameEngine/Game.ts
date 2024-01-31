import { RequestSender } from '$lib/RequestSender';
import { gameRequestFactory } from '$lib/gameRequestFactory';
import { messageSubscriber } from '$lib/messageSubscriber';
import { gameRequest } from '$lib/request';
import { Camera } from './Camera';
import { GameObject } from './GameObject';

export class Game extends messageSubscriber{

    static instance: Game;
    protected sender: RequestSender;
    private objects: GameObject[] = [];
    private camera: Camera;
    keys: any = {};

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    constructor(){
        super();
        this.camera = new Camera();
        this.sender = new RequestSender();
    }

    addObject(obj: GameObject){
        obj.Mstart();
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
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);

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
        this.objects.forEach(obj => obj.Mstart());
        this.start(p);
    }

    update(p:any){
    
    }

    Mupdate(p:any){
        this.objects.forEach(obj => obj.Mupdate(p));
        this.update(p);
    }

    pointInCanvas(x: number, y: number): boolean {
        return x >= 0 && x <= 400 && y >= 0 && y <= 400;
    }

    getCamera(): Camera {
        return this.camera;
    }

    draw(p:any) {
        // Draw all game objects
        this.Mupdate(p);
        this.objects.forEach(obj => obj.Mdraw(p, this.camera));
    }


}