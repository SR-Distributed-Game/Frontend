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
        p.noStroke();
        let sendButton = document.getElementById('sendButton');
        if (sendButton != null){
            sendButton.addEventListener('click', () => {
                this.addObject(new fruit(p.mouseX, p.mouseY, (Math.random()*1000)));
            });
        }

        p.mousePressed = () => {
            this.addObject(new fruit(p.mouseX, p.mouseY, (Math.random()*1000)));
        }
        for (let i = 0; i < 1000; i++) {
            this.addObject(new fruit(Math.random() * p.width, Math.random() * p.height, (Math.random()*1000)));
        }

    }

    update(p: any): void {
        var currentx = this.pl1.getTransform().getPosition().getX();
        var currenty = this.pl1.getTransform().getPosition().getY();
        var currentdx = this.pl1.getTransform().getScale().getX();
        var currentdy = this.pl1.getTransform().getScale().getY();

        if (currentx+ currentdx/2 > p.width) {
            this.pl1.getTransform().getPosition().setX(p.width - currentdx/2);
        }
        if (currentx - currentdx/2 < 0) {
            this.pl1.getTransform().getPosition().setX(currentdx/2);
        }
        if (currenty + currentdy/2 > p.height) {
            this.pl1.getTransform().getPosition().setY(p.height - currentdy/2);
        }
        if (currenty - currentdy/2 < 0) {
            this.pl1.getTransform().getPosition().setY(currentdy/2);
        }
    }

}
