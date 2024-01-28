import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {
    constructor(x: number, y: number, id: string) {
        super(x, y, id);
        this.setName("player");
    }

    update(p:any) {
        let mouseX = p.mouseX;
        let mouseY = p.mouseY;
        
        Game.getInstance().moveObject(this, this.x + (mouseX - this.x) * 0.01, this.y + (mouseY - this.y) * 0.01);
    }

    draw(p: any) {
        p.ellipse(this.x, this.y, 40, 40);
        p.fill(0);
    }
}