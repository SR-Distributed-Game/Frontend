import type { messageSubscriber } from "./messageSubscriber";

export class Dispatcher{

    subscribers:messageSubscriber[] = [];

    subscribe(subscriber:messageSubscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber:messageSubscriber) {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    }

    constructor(){
    }

    dispatch(req: any){ // later recieve a gameRequest
        //var req = JSON.parse(req);
        for(let subscriber of this.subscribers){

            subscriber.onMessage(req);
        }
    }
}
