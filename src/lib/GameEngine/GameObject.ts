import { Game } from "./Game";
import { Transform } from "./Transform";

export class GameObject {
    transform : Transform;
    lastx : number;
    lasty: number;
    name: string;
    id: number;

    constructor(x: number, y: number, id: number) {
        this.transform = new Transform(x, y, 0, 0);
        this.lastx = x;
        this.lasty = y;
        this.id = id;
        this.name = "object";
    }

    start(p:any){
    }

    requestMove(x: number, y: number) {
        this.transform.x = x;
        this.transform.y = y;
        if (x == this.lastx && y == this.lasty) {
            return;
        }
        Game.getInstance().moveObject(this, x,y);
        this.lastx = x;
        this.lasty = y;
    }

    move(x: number, y: number) {
        this.transform.x = x;
        this.transform.y = y;
    }

    setName(name: string) {
        this.name = name;
    }

    update(p:any) {
        // Update logic for the object
    }

    draw(p:any) {
        // Drawing logic using p5 instance (p)
    }

    asMetadata(): any {
        return {
            "transform": this.transform.toJson(),
            "targetedObjectId": this.id,
            "objectType": this.constructor.name
        }
    }


}