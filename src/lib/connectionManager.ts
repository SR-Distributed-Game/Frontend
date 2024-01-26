import { knownSockets } from "./Servers";

export class SpringSocketServer{

    private socket: any;

    static instance: SpringSocketServer;

    private playername: string = "defaultname";

    private UID: string = "defaultUID";

    constructor(){
    }



    public connectTo(socketName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (knownSockets[socketName]) {
                this.connect(knownSockets[socketName]);
                this.socket.onopen = () => {
                    resolve();
                };
            } else {
                reject(new Error("Socket not found"));
            }
        });
    }

    private connect = (url: string):boolean => {
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onOpen;
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

    private onOpen = (event: Event) => {
        console.log("Socket connected");
        this.send("Hello from client" + this.playername);
    }

    private onClose = (event: CloseEvent) => {
        console.log("Socket disconnected");
    }

    private onMessage = (event: MessageEvent) => {
        console.log("Socket message: " + event.data);
    }

    private onError = (event: Event) => {
        console.log("Socket error");
    }

    public send = (message: string) => {
        if (this.socket.readyState === WebSocket.OPEN)
            this.socket.send( "from:" + this.playername + " | content: " +message);
    }

    public close = () => {
        if (this.socket){
            if (this.socket.readyState === WebSocket.OPEN){
                this.send("closing connection");
                this.socket.close();
            }
        }
    }
}

