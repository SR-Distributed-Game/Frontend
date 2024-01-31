import { Game } from "../GameEngine/Game";
import { fruit } from "./fruit";
import { player } from "./player";

export class sweetGame extends Game {

    pl1: player;
    constructor() {
        super();
        this.pl1 = new player(100, 100, 0);
        this.addObject(this.pl1);
    }

    start(p: any): void {

        let sendButton = document.getElementById('sendButton');
        if (sendButton != null){
            sendButton.addEventListener('click', () => {
                this.addObject(new fruit(p.mouseX, p.mouseY, (Math.random()*1000)));
            });
        }

        p.mousePressed = () => {
            this.addObject(new fruit(p.mouseX, p.mouseY, (Math.random()*1000)));
        }

    }

    update(p: any): void {
        var currentx = this.pl1.getTransform().getPosition().getX();
        var currenty = this.pl1.getTransform().getPosition().getY();

        if (currentx > p.width) {
            this.pl1.getTransform().getPosition().setX(p.width);
        }
        if (currentx < 0) {
            this.pl1.getTransform().getPosition().setX(0);
        }
        if (currenty > p.height) {
            this.pl1.getTransform().getPosition().setY(p.height);
        }
        if (currenty < 0) {
            this.pl1.getTransform().getPosition().setY(0);
        }
    }

}
