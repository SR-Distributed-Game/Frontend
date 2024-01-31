export class Transform {

    x: number;
    y: number;
    dx: number;
    dy:number;

    constructor( x: number, y: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    toJson(): any {
        return {
            x: this.x,
            y: this.y,
            dx: this.dx,
            dy: this.dy
        }
    }

}