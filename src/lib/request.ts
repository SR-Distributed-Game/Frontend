export class gameRequest {
    Type: string;
    ClientID: number;
    Metadata: any;
    RoomID : number;

    constructor(type: string) {
        this.Type = type;
        this.ClientID = -1;
        this.RoomID  = -1;
        this.Metadata = {};
    }

}
