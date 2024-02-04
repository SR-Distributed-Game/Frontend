import { RequestSender } from "./RequestSender";
import type { gameRequest } from "./gameRequest";
import { gameRequestFactory } from "./gameRequestFactory";
import { messageSubscriber } from "./messageSubscriber";

export class LeaderboardLogic extends messageSubscriber {
    static instance: LeaderboardLogic;
    private leaderboard: any = {};
    private sender: any;
    history: any = {};

    public static getInstance() {
        if (!LeaderboardLogic.instance) {
            LeaderboardLogic.instance = new LeaderboardLogic();
        }
        return LeaderboardLogic.instance;
    }

    constructor() {
        super();
        this.sender = new RequestSender();
    }

    onMessage(req: any): void {
        var computedRequest:gameRequest = gameRequestFactory.createFromJson(req);

        if (computedRequest.Type == "JoinRoom") {
            this.addPlayer(computedRequest.Metadata.playerId);
        }

        if (computedRequest.Type == "LeavingRoom") {
            this.removePlayer(computedRequest.Metadata.playerId);
        }

    }

    getSender(): RequestSender {
        return this.sender;
    }

    addPlayer(playerId: any) {
        this.leaderboard[playerId] = playerId;
        this.onAddPlayer();
    }

    removePlayer(playerId: any) {
        
        delete this.leaderboard[playerId];
        this.onRemovePlayer();
    }

    getLeaderboard() {
        return this.leaderboard;
    }

    asHTMLList() {
        var html = "<ul>";
        for (var key in this.leaderboard) {
            html += "<li>" + key + " : " + this.leaderboard[key] + "</li>";
        }
        html += "</ul>";
        return html;
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