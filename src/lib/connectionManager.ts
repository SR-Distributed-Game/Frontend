export class SpringSocketServer{

    private socket: WebSocket;

    constructor(){
        this.socket = new WebSocket("ws://localhost:8080/echo");
        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
    }

    private onOpen = (event: Event) => {
        console.log("Socket connected");
    }

    private onClose = (event: CloseEvent) => {
        console.log("Socket disconnected");
    }

    private onMessage = (event: MessageEvent) => {
        console.log("Socket message received");
    }

    private onError = (event: Event) => {
        console.log("Socket error");
    }

    public send = (message: string) => {
        this.socket.send(message);
    }

    public close = () => {
        this.socket.close();
    }
}

