import { RequestSender } from "./RequestSender";
import type { gameRequest } from "./gameRequest";
import { gameRequestFactory } from "./gameRequestFactory";
import { messageSubscriber } from "./messageSubscriber";

export class LeaderboardLogic extends messageSubscriber {
    static instance: LeaderboardLogic;
    private leaderboard: any = {};
    private sender: any;
    private players: any = {};

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
            this.updateLeaderboard(computedRequest.Metadata.leaderboard,computedRequest.Metadata.players);
        }

        if (computedRequest.Type == "LeavingRoom") {
            this.updateLeaderboard(computedRequest.Metadata.leaderboard,computedRequest.Metadata.players);
        }

    }

    getSender(): RequestSender {
        return this.sender;
    }

    updateLeaderboard(newLeaderboard:any,players:any){
        this.players = players;
        this.leaderboard = newLeaderboard;
        this.updateLeaderboardListener();
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

    updateLeaderboardListener() {
    }

    onRemovePlayer() {
    }

    addupdateLeaderboardListener(callback: any) {
        this.updateLeaderboardListener = callback;
    }


}