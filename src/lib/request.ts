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

    addMetadata(key: string, value: any) {
        this.Metadata[key] = value;
    }

    addObjectMetadata(value:any) {
        this.addMetadata("objectData", value);
    }

}
