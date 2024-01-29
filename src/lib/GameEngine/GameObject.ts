import { Game } from "./Game";

export class GameObject {
    x: number;
    y: number;
    
    lastx : number;
    lasty: number;
    name: string;
    id: string;

    constructor(x: number, y: number, id: string) {
        this.x = x;
        this.y = y;
        this.lastx = x;
        this.lasty = y;
        this.id = id;
        this.name = "object";

    }

    start(p:any){

    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
        if (x == this.lastx && y == this.lasty) {
            return;
        }
        Game.getInstance().moveObject(this, x,y);
        this.lastx = x;
        this.lasty = y;
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
}