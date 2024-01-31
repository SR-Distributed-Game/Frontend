import type { Camera } from "./Camera";
import type { Component } from "./Component";
import { Game } from "./Game";
import { Transform } from "./Transform";
import type { Vector2 } from "./Vector2";
import type { drawComponent } from "./drawComponent";

export class GameObject {
    protected transform : Transform;
    protected lastx : number;
    protected lasty: number;
    protected name: string;
    protected id: number;
    protected components: Component[];
    protected drawComponents: drawComponent[];

    constructor(x: number, y: number, id: number) {
        this.transform = new Transform(x, y, 0, 0);
        this.lastx = x;
        this.lasty = y;
        this.id = id;
        this.name = "object";
        this.components = [];
        this.drawComponents = [];
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
        Game.getInstance().moveObject(this, vec.getX(),vec.getY());
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

    update(p:any) {
        // Update logic for the object
    }

    Mupdate(p:any) {
        this.components.forEach(component => component.update(p));
        this.update(p);
    }

    draw(p:any,camera: Camera) {
        // Drawing logic using p5 instance (p)
    }

    Mdraw(p:any,camera: Camera) {
        
        this.drawComponents.forEach(drawComponent => {
            drawComponent.draw(p,camera);
        });

        this.draw(p,camera);
    }



    asMetadata(): any {
        return {
            "transform": this.transform.toJson(),
            "targetedObjectId": this.id,
            "objectType": this.constructor.name
        }
    }


}