import type p5 from "p5";
import type { Camera } from "./Camera";
import type { Component } from "./Component";
import type { ColliderComponent } from "./Components/ColliderComponent";
import { Game } from "./Game";
import { Transform } from "./Transform";
import { Vector2 } from "./Vector2";
import type { drawComponent } from "./drawComponent";
import { Serializable } from "./Serialized";
import { SerializableGameObject } from "./SerializableGameObject";

export class GameObject extends SerializableGameObject{
    @Serializable
    protected transform : Transform;
    @Serializable
    protected name: string;
    @Serializable
    protected id: number;

    protected localTransform:Transform;
    protected lastx : number;
    protected lasty: number;

    protected components: Component[];
    protected drawComponents: drawComponent[];
    colliderComponents: ColliderComponent[];
    protected children: GameObject[];
    private shouldDestroy: boolean = false;
    private cameraAttached: boolean = false;

    constructor() {
        super();
        this.transform = new Transform(0, 0, 0, 0);
        this.localTransform = new Transform(0, 0, 0, 0);
        this.lastx = 0;
        this.lasty = 0;
        this.id = 0;
        this.name = "object";
        this.components = [];
        this.drawComponents = [];
        this.colliderComponents = [];
        this.children = [];

    }

    getName(): string {
        return this.name;
    }

    

    setId(id: number) {
        this.id = id;
    }

    destroy() {
        this.shouldDestroy = true;
    }
    
    shouldBeDestroyed(): boolean {
        return this.shouldDestroy;
    }

    attachCamera() {
        this.cameraAttached = true;
    }

    getTransform(): Transform {
        return this.transform;
    }

    addComponent(component: Component) {
        this.components.push(component);
    }

    addDrawComponent(component: drawComponent) {
        this.drawComponents.push(component);
    }

    addColliderComponent(component: ColliderComponent) {
        this.colliderComponents.push(component);
    }


    start(){
    }

    Mstart(){
        this.components.forEach(component => component.start());
        this.start();
    }

    asyncMove(vec:Vector2) {
        this.getTransform().getPosition().setX(vec.getX());
        this.getTransform().getPosition().setY(vec.getY());
        if (vec.getX() == this.lastx && vec.getY() == this.lasty) {
            return;
        }
        Game.getInstance().getScene().moveObject(this, vec.getX(),vec.getY());
        this.lastx = vec.getX();
        this.lasty = vec.getY();
    }

    move(x: number, y: number) {
        this.getTransform().getPosition().setX(x);
        this.getTransform().getPosition().setY(y);
    }

    setName(name: string) {
        this.name = name;
    }

    update(p:p5) {
        // Update logic for the object
    }

    Mupdate(p:p5) {
        this.colliderComponents.forEach(component => component.update(p));
        this.components.forEach(component => component.update(p));
        this.update(p);
        if (this.cameraAttached) {
            Game.getInstance().getCamera().getTransform().setPosition(this.getTransform().getPosition().sub(new Vector2(p.width/2,p.height/2)));
        }
    }

    draw(p:p5,camera: Camera) {
        // Drawing logic using p5 instance (p)
    }

    getId(): number {
        return this.id;
    }

    Mdraw(p:p5,camera: Camera) {
        
        this.drawComponents.forEach(drawComponent => {
            drawComponent.draw(p,camera);
        });

        this.draw(p,camera);
    }

    MonCollision(collider:ColliderComponent){
        this.onCollision(collider);
    }

    onCollision(collider:ColliderComponent){
        
    }

    Mend(){
        this.components.forEach(component => component.end());
        this.end();
    }

    end(){
        
    }

}