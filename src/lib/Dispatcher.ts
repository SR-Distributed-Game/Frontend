import type { gameRequest } from "./gameRequest";
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

    dispatch(req: gameRequest){ // later recieve a gameRequest
        
        for(let subscriber of this.subscribers){

            subscriber.onMessage(req);
        }
    }
}
