import { SpringSocketServer } from "./connectionManager"


export class RequestSender {
    
    sendObjectSpawnRequest(req: any, socket: SpringSocketServer) {
        socket.send(JSON.stringify(req));
    }

    sendObjectDestroyRequest(req: any, socket: SpringSocketServer) {
        socket.send(JSON.stringify(req));
    }

    sendObjectUpdateRequest(req: any, socket: SpringSocketServer) {
        socket.send(JSON.stringify(req));
    }

}