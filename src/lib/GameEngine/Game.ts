import { RequestSender } from '$lib/RequestSender';
import { gameRequestFactory } from '$lib/gameRequestFactory';
import { messageSubscriber } from '$lib/messageSubscriber';
import { gameRequest } from '$lib/request';
import { Camera } from './Camera';
import { GameObject } from './GameObject';
import { SpatialHashmap } from './SpatialHashmap';
import { Vector2 } from './Vector2';

export class Game extends messageSubscriber{

    static instance: Game;
    protected sender: RequestSender;
    private objects: GameObject[] = [];
    private camera: Camera;
    private collisionSystem: SpatialHashmap;
    private scene: any;

    private mousePosition:Vector2 = new Vector2(0,0); 

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
        this.collisionSystem = new SpatialHashmap(50);
    }

    setScene(scene: any){
        this.scene = scene;
        this.scene.attachGame(this);
    }

    getScene(){
        return this.scene;
    }

    

    getSender(): RequestSender {
        return this.sender;
    }

    onMessage(req: any): void {
        //console.log("handling message: " + req);
    }

    start(p:any){

    }

    Mstart(p:any){
        this.scene.Mstart(p);
        this.start(p);
    }


    Mupdate(p:any){
        this.mousePosition.setX(p.mouseX + this.camera.getTransform().getPosition().getX());
        this.mousePosition.setY(p.mouseY + this.camera.getTransform().getPosition().getY());
        
        this.collisionSystem.getHashMap().clear();
        this.objects.forEach(obj => obj.Mupdate(p));
        this.scene.Mupdate(p);
        this.collisionSystem.update();
    }

    getMousePosition():Vector2{
        return this.mousePosition;
    }

    getCollisionSystem(): SpatialHashmap {
        return this.collisionSystem;
    }

    getCamera(): Camera {
        return this.camera;
    }

    draw(p:any) {
        this.scene.Mdraw(p,this.camera);
        //this.collisionSystem.draw(p);
    }
    
    runFrame(p:any){
        this.Mupdate(p);
        this.draw(p);
    }
}