export class SpringSocketServer{

    private socket: any;

    static instance: SpringSocketServer;

    constructor(){
    }

    private knownSockets: { [key: string]: string } = {"1": "ws://localhost:8080/echo"};

    public connectTo = (socketName: string):boolean => {
        if(this.knownSockets[socketName]){
            console.log("Socket found");
            return this.connect(this.knownSockets[socketName]);
            
        } else {
            console.log("Socket not found");
            return false;
        }
    }

    private connect = (url: string):boolean => {
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
        return true;
    }

    static getInstance(){
        if(!SpringSocketServer.instance){
            SpringSocketServer.instance = new SpringSocketServer();
        }
        return SpringSocketServer.instance;
    }

    private onOpen = (event: Event) => {
        console.log("Socket connected");
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
        this.socket.send(message);
    }

    public close = () => {
        this.socket.send("closing connection");
        this.socket.close();
    }
}

