import { Game } from "../GameEngine/Game";
import { GameObject } from "../GameEngine/GameObject";

export class player extends GameObject {
    constructor(x: number, y: number, id: number) {
        super(x, y, id);
        this.setName("player");
    }

    update(p:any) {

        if(p.keyIsDown(p.LEFT_ARROW)){
            this.requestMove( this.transform.x-1, this.transform.y );
        }
        if(p.keyIsDown(p.RIGHT_ARROW)){
            this.requestMove( this.transform.x+1, this.transform.y );
        }
        if(p.keyIsDown(p.UP_ARROW)){
            this.requestMove( this.transform.x, this.transform.y-1 );
        }
        if(p.keyIsDown(p.DOWN_ARROW)){
            this.requestMove( this.transform.x, this.transform.y+1 );
        }

    }

    draw(p: any) {
        p.fill(0);
        p.ellipse(this.transform.x, this.transform.y, 40, 40);
        
    }
}