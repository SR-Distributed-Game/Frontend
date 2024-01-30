import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class fruit extends GameObject {
    constructor(x: number, y: number, id: string) {
        super(x, y, id);
        this.setName("fruit");
    }

    update(p:any) {

    }

    draw(p: any) {
        p.fill(100);
        p.ellipse(this.x, this.y, 40, 40);
        
    }
}