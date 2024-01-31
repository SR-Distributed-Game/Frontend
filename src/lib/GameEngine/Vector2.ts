export class Vector2 {

    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }
    
    getY(): number {
        return this.y;
    }
    
    setX(x: number) {
        this.x = x;
    }
    
    setY(y: number) {
        this.y = y;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    
    sub(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mul(v: Vector2): Vector2 {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    div(v: Vector2): Vector2 {
        return new Vector2(this.x / v.x, this.y / v.y);
    }

    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        const l = this.length();
        return new Vector2(this.x / l, this.y / l);
    }

    distance(v: Vector2): number {
        return this.sub(v).length();
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    lerp(target:Vector2, alpha:number):Vector2 {
        return new Vector2(
            this.x + (target.x - this.x) * alpha,
            this.y + (target.y - this.y) * alpha
        );
    }

    static forward(): Vector2 {
        return new Vector2(1, 0);
    }

    static right(): Vector2 {
        return new Vector2(0, 1);
    }

    static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    static one(): Vector2 {
        return new Vector2(1, 1);
    }

    static random(): Vector2 {
        return new Vector2(Math.random(), Math.random());
    }

    static fromAngle(angle: number): Vector2 {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }



}