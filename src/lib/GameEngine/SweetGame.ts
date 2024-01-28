import { Game } from "./Game";
import { player } from "./player";

export class sweetGame extends Game {

    pl1: player;
    constructor() {
        super();
        this.pl1 = new player(100, 100, "player");
        this.addObject(this.pl1);
    }

    update(p: any): void {
        if (this.pl1.x > p.width) {
            this.pl1.x = p.width;
        }
        if (this.pl1.x < 0) {
            this.pl1.x = 0;
        }
        if (this.pl1.y > p.height) {
            this.pl1.y = p.height;
        }
        if (this.pl1.y < 0) {
            this.pl1.y = 0;
        }

    }


}