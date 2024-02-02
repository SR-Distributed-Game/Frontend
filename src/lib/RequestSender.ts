import { SpringSocketServer } from "./connectionManager"
import type { gameRequest } from "./gameRequest";


export class RequestSender {
    socket: SpringSocketServer;
    constructor() {
        this.socket = SpringSocketServer.getInstance();
    }

    sendRequest(req: gameRequest) {
        this.socket.send(req);
    }


}