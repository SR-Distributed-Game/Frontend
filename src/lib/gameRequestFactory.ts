import { gameRequest } from "./request"

export class gameRequestFactory {

    static getUpdateRequest():gameRequest {
        return new gameRequest("UpdateObject");
    }

    static getSpawnRequest():gameRequest{
        return new gameRequest("SpawnObject");
    }

    static getDestroyRequest():gameRequest{
        return new gameRequest("DestroyObject");
    }

    static getJoinRoomRequest():gameRequest{
        return new gameRequest("JoinRoom");
    }

    static getCreateRoomRequest():gameRequest{
        return new gameRequest("CreateRoom");
    }

    static getClosingRequest():gameRequest{
        return new gameRequest("Closing");
    }

    static getLeavingRoomRequest():gameRequest{
        return new gameRequest("LeavingRoom");
    }

    static getSuccesConnectionRequest():gameRequest{
        return new gameRequest("ConnectSucces");
    }

}