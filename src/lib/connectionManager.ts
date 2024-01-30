
import { Dispatcher } from "./Dispatcher";
import { knownSockets } from "./Servers";
import { gameRequestFactory } from "./gameRequestFactory";
import type { gameRequest } from "./request";

export class SpringSocketServer{

    private socket: any;

    static instance: SpringSocketServer;

    private playername: string = "defaultname";

    private ClientID: string = "defaultUID";

    private IP: string = "defaultIP";

    private dispatcher: Dispatcher;


    constructor(){
        console.log("Creating socket server")
        this.dispatcher = new Dispatcher();
    }

    public getDispatcher() : Dispatcher {
        return this.dispatcher;    
    }

    public connectTo(socketName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (knownSockets[socketName]) {
                this.connect(knownSockets[socketName]);
                this.socket.onopen = () => {
                    resolve();
                    console.log("Socket connected");
                    var request = gameRequestFactory.getSuccesConnectionRequest();

                    this.send(request);
                };
                
            } else {
                reject(new Error("Socket not found"));
            }
        });
    }

    private connect = (url: string):boolean => {
        console.log("Connecting to " + url);
        this.socket = new WebSocket(url);
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
        return true;
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
        console.log("Socket error");
    }

    public send = (request:gameRequest ) => {
        if (this.socket.readyState === WebSocket.OPEN){
            request.ClientID = 5;
            this.socket.send( JSON.stringify(request));
        }
            
    }
    public close = () => {
        if (this.socket){
            if (this.socket.readyState === WebSocket.OPEN){
                var request = gameRequestFactory.getClosingRequest();
                request.Metadata = {
                    playername: this.playername,
                    ClientID: this.ClientID,
                    IP: this.IP
                }
                this.send(request);
                this.socket.close();
            }
        }
    }
}

