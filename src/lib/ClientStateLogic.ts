import { RequestSender } from "./RequestSender";
import { SpringSocketServer } from "./connectionManager";
import type { gameRequest } from "./gameRequest";
import { gameRequestFactory } from "./gameRequestFactory";
import { messageSubscriber } from "./messageSubscriber";

export class ClientStateLogic extends messageSubscriber {
    static instance: ClientStateLogic;

    private sender: any;


    public static getInstance() {
        if (!ClientStateLogic.instance) {
            ClientStateLogic.instance = new ClientStateLogic();
        }
        return ClientStateLogic.instance;
    }

    constructor() {
        super();
        this.sender = new RequestSender();
    }

    onMessage(req: any): void {
        var computedRequest:gameRequest = gameRequestFactory.createFromJson(req);
        
        if (computedRequest.Type == "ConnectSucces") {
            if (SpringSocketServer.getInstance().getClientID() == -1)
                SpringSocketServer.getInstance().setClientID(computedRequest.Metadata.clientID);
        }

    }

    getSender(): RequestSender {
        return this.sender;
    }

    onAddPlayer() {
    }

    onRemovePlayer() {
    }

    addOnNewPlayerListener(callback: any) {
        this.onAddPlayer = callback;
    }

    addOnRemovePlayerListener(callback: any) {
        this.onRemovePlayer = callback;
    }

}