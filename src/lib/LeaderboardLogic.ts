import { RequestSender } from "./RequestSender";
import { gameRequestFactory } from "./gameRequestFactory";
import { messageSubscriber } from "./messageSubscriber";

export class LeaderboardLogic extends messageSubscriber {
    static instance: LeaderboardLogic;
    private leaderboard: any = {};
    private sender: any;
    players: any = {};
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

        var computedRequest = gameRequestFactory.createFromJson(req);
        
        if (computedRequest.Type === "JoinRoom") {
            this.addPlayer(computedRequest.Metadata.playerId);
        }

        if (computedRequest.Type === "LeavingRoom") {
            this.removePlayer(computedRequest.Metadata.playerId);
        }

    }

    getSender(): RequestSender {
        return this.sender;
    }

    addPlayer(player: any) {
        this.players[player.id] = player;
    }

    removePlayer(player: any) {
        delete this.players[player.id];
    }

    getLeaderboard() {
        return this.leaderboard;
    }

}