import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {
    constructor(x: number, y: number, id: string) {
        super(x, y, id);
        this.setName("player");
    }

    update(p:any) {

        if(p.keyIsDown(p.LEFT_ARROW)){
            this.move( this.x-1, this.y );
        }
        if(p.keyIsDown(p.RIGHT_ARROW)){
            this.move( this.x+1, this.y );
        }
        if(p.keyIsDown(p.UP_ARROW)){
            this.move( this.x, this.y-1 );
        }
        if(p.keyIsDown(p.DOWN_ARROW)){
            this.move( this.x, this.y+1 );
        }

    }

    draw(p: any) {
        p.ellipse(this.x, this.y, 40, 40);
        p.fill(0);
    }
}