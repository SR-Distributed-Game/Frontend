import * as PIXI from 'pixi.js';
import { RequestSender } from './RequestSender';
import type { SpringSocketServer } from './connectionManager';

export class RemoteObjectFactory {
    requestSender: RequestSender;

    constructor() {
        this.requestSender = new RequestSender();
    }

    createCircle(x: number, y: number, radius: number, color: string, socket: SpringSocketServer) {
        this.requestSender.sendObjectSpawnRequest({
            type: "circle",
            x: x,
            y: y,
            radius: radius,
            color: color,
            playername: socket.getPlayerName()
        }, socket);
    }

}