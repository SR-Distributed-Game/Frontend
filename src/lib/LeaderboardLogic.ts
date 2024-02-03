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
        console.log("LeaderboardLogic received message: " + computedRequest);
            
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

    addPlayer(player: any) {
        this.leaderboard[player.id] = player;
        this.onAddPlayer();
    }

    removePlayer(player: any) {
        
        delete this.leaderboard[player.id];
        this.onRemovePlayer();
    }

    getLeaderboard() {
        return this.leaderboard;
    }

    asHTMLList() {
        var html = "<ul>";
        for (var key in this.leaderboard) {
            html += "<li>" + key + " : " + this.leaderboard[key].id + "</li>";
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