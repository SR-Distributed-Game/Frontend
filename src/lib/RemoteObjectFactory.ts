import { RequestSender } from './RequestSender';
import type { SpringSocketServer } from './connectionManager';

export class RemoteObjectFactory {
    requestSender: RequestSender;



    constructor() {
        this.requestSender = new RequestSender();
    }

    /*createCircle(x: number, y: number, radius: number, color: string) {
        this.requestSender.sendObjectSpawnRequest({
            type: "spawn",
            x: x,
            y: y,
            radius: radius,
            color: color,
            playername: socket.getPlayerName()
        }, socket);
    }*/

}