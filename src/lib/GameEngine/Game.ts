import { RequestSender } from '$lib/RequestSender';
import { messageSubscriber } from '$lib/messageSubscriber';
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
        this.sender.sendObjectSpawnRequest({
            id: obj.name,
            x: obj.x,
            y: obj.y,
        });
    }

    removeObject(obj: GameObject){
        this.objects = this.objects.filter((o) => o!== obj);
        this.sender.sendObjectDestroyRequest({
            id: obj.name,
            x: obj.x,
            y: obj.y,
        });
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.x = x;
        obj.y = y;
        this.sender.sendObjectUpdateRequest({
            id: obj.name,
            x: obj.x,
            y: obj.y,
        });
    }


    onMessage(req: any): void {
        console.log("handling message: " + req);
    }

    start(p:any){

    }

    Mstart(p:any){
        p.keyPressed = () => {
            this.keys[p.key] = true;
        }
        
        p.keyReleased = () => {
            this.keys[p.key] = false;
        }
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