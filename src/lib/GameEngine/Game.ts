import { RequestSender } from '$lib/RequestSender';
import { messageSubscriber } from '$lib/messageSubscriber';
import type p5 from 'p5';
import { Camera } from './Camera';
import { SpatialHashmap } from './SpatialHashmap';
import { Vector2 } from './Vector2';
import { Scene } from './Scene';
import { defaultScene } from './defaultScene';
import { fruit } from '$lib/implementedGames/fruit';
import type { gameRequest } from '$lib/gameRequest';

export class Game extends messageSubscriber{

    static instance: Game;
    protected sender: RequestSender;
    private camera: Camera;
    private collisionSystem: SpatialHashmap;
    private scene: Scene;

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
        this.scene = new defaultScene(); 
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

    onMessage(req: gameRequest): void {
        if (req.Type == "SpawnObject"){
            this.scene.addObject(fruit.fromSerialized(req.Metadata.objectData));
        }
        if (req.Type == "DestroyObject"){
            console.log("Destroying object");
            console.log(req);
            this.scene.removeObjectById(req.Metadata.objectData.id);
        }

    }

    start(p:p5){

    }

    Mstart(p:p5){
        this.scene.Mstart(p);
        this.start(p);
    }


    Mupdate(p:p5){
        this.mousePosition.setX(p.mouseX + this.camera.getTransform().getPosition().getX());
        this.mousePosition.setY(p.mouseY + this.camera.getTransform().getPosition().getY());
        
        this.collisionSystem.getHashMap().clear();
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

    draw(p:p5) {
        this.scene.Mdraw(p,this.camera);
        //this.collisionSystem.draw(p);
    }
    
    runFrame(p:p5){
        this.Mupdate(p);
        this.draw(p);
    }
}