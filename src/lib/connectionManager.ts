
import { Dispatcher } from "./Dispatcher";
import { knownSockets } from "./Servers";
import { gameRequestFactory } from "./gameRequestFactory";
import type { gameRequest } from "./request";

export class SpringSocketServer{

    private socket: any;

    static instance: SpringSocketServer;

    private playername: string = "defaultname";

    private roomId: number = -1;

    private clientID: number = -1;

    private dispatcher: Dispatcher;

    private errorState:boolean;

    constructor(){
        console.log("Creating socket server")
        this.dispatcher = new Dispatcher();
        this.errorState = false;
    }

    public getDispatcher() : Dispatcher {
        return this.dispatcher;    
    }

    public resetErrorState() {
        this.errorState = false;
    }

    public async connectTo(socketName: string): Promise<void> {
        console.log(this.errorState);
        return new Promise((resolve, reject) => {

            if (knownSockets[socketName]) {
                
                this.connect(knownSockets[socketName]);
                this.socket.onopen = () => {
                    resolve();
                    console.log("Socket connected");
                    var request = gameRequestFactory.getSuccesConnectionRequest();
                    request.Metadata = {
                        playername: this.playername
                    }
                    this.send(request);
                };
            }else {
                reject(new Error("Socket not found"));
            }
        });
    }

    private connect = async (url: string) => {
        try{
            console.log("Connecting to " + url);
            this.socket = new WebSocket(url);
        }catch(error){
            throw new Error("Socket not found");
        }
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
    }

    getPlayerName = () => {
        return this.playername;
    }

    setPlayerName = (name: string) => {
        this.playername = name;
    }

    static getInstance(){
        if(!SpringSocketServer.instance){
            SpringSocketServer.instance = new SpringSocketServer();
        }
        return SpringSocketServer.instance;
    }

    public setRoomId = (id: number) => {
        this.roomId = id;
    }

    public getRoomId = () => {
        return this.roomId;
    }

    public setClientID = (id: number) => {
        this.clientID = id;
    }

    public getClientID = () => {
        return this.clientID;
    }

    public getState = () => {
        return this.socket.readyState;
    }


    private onClose = (event: CloseEvent) => {
        console.log("Socket disconnected");
    }

    private onMessage = (event: MessageEvent) => {
        this.dispatcher.dispatch(event.data);
    }

    private onError = (event: Event) => {
        this.errorState = true;
        console.log(this.errorState);
    }

    public getErrorState = () => {
        return this.errorState;
    }

    public send = (request:gameRequest ) => {
        if (this.socket.readyState === WebSocket.OPEN){
            request.ClientID = this.getClientID();
            request.RoomID = this.getRoomId();
            this.socket.send( JSON.stringify(request));
        }
    }

    public close = () => {
        if (this.socket){
            if (this.socket.readyState === WebSocket.OPEN){
                var request = gameRequestFactory.getClosingRequest();
                request.addMetadata("playername",this.getPlayerName()),
                request.ClientID =  this.getClientID(),
                this.send(request);
                this.socket.close();
            }
        }
    }
}

