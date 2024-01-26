
import { knownSockets } from "./Servers";

export class SpringSocketServer{

    private socket: any;

    static instance: SpringSocketServer;

    private playername: string = "defaultname";

    private UID: string = "defaultUID";

    private IP: string = "defaultIP";

    constructor(){
        getIp().then((ip) => {
            this.IP = ip;
        });
    }



    public connectTo(socketName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (knownSockets[socketName]) {
                this.connect(knownSockets[socketName]);
                this.socket.onopen = () => {
                    resolve();
                    console.log("Socket connected");
                    this.send("new connection from client " + this.playername);
                };
                
            } else {
                reject(new Error("Socket not found"));
            }
        });
    }

    private connect = (url: string):boolean => {
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
                this.send("closing connection " + this.getPlayerName());
                this.socket.close();
            }
        }
    }
}

function getIp(): Promise<string>{
    //get the public ip
    let ip = "";
    fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        ip = data.ip;
    });
    return new Promise((resolve, reject) => {
        resolve(ip);
    });
}