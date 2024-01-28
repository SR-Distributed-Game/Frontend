export class GameObject {
    x: number;
    y: number;
    name: string;
    id: string;

    constructor(x: number, y: number, id: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.name = "object";

    }

    setName(name: string) {
        this.name = name;
    }

    update(p:any) {
        // Update logic for the object
    }

    draw(p:any) {
        // Drawing logic using p5 instance (p)
    }
}