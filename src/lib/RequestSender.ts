import { SpringSocketServer } from "./connectionManager"


export class RequestSender {
    socket: SpringSocketServer;
    constructor() {
        this.socket = SpringSocketServer.getInstance();
    }

    sendObjectSpawnRequest(req: any) {
        req.type = "spawn";
        req.playername = this.socket.getPlayerName();
        this.socket.send(JSON.stringify(req));
    }

    sendObjectDestroyRequest(req: any) {
        req.type = "destroy";
        req.playername = this.socket.getPlayerName();
        this.socket.send(JSON.stringify(req));
    }

    sendObjectUpdateRequest(req: any) {
        req.type = "update";
        req.playername = this.socket.getPlayerName();
        this.socket.send(JSON.stringify(req));
    }

}