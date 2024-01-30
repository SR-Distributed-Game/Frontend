export class gameRequest {
    Type: string;
    ClientID: number;
    Metadata: any;

    constructor(type: string) {
        this.Type = type;
        this.ClientID = -1;
        this.Metadata = {};
    }
}
