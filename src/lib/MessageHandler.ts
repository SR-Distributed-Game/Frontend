import { RequestReciever } from "./RequestReciever";
import { RequestSender } from "./RequestSender";

export class MessageHandler{
    requestReciever: RequestReciever;
    requestSender: RequestSender;
    
    constructor(){
        this.requestReciever = new RequestReciever();
        this.requestSender = new RequestSender();
    }

    dispatch(req: any){

    }




}