import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class fruit extends GameObject {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.setName("fruit");
    }

    update(p:any) {
    }

    draw(p: any) {
        p.fill(100);
        p.ellipse(this.transform.x, this.transform.y, 40, 40);
        
    }
}