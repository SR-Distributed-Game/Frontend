import { Vector2 } from "./Vector2";

export class Transform {

    private position: Vector2;
    private scale: Vector2;
    private rotation: number;

    constructor( x: number, y: number, dx: number, dy: number) {
        this.position = new Vector2(x, y);
        this.scale = new Vector2(dx, dy);
        this.rotation = 0;
    }

    toJson(): any {
        return {
            x: this.position.getX(),
            y: this.position.getY(),
            dx: this.scale.getX(),
            dy: this.scale.getY(),
            rot: this.rotation
        }
    }

    pointIsIn(x: number, y: number): boolean {
        return this.position.getX() == x && this.position.getY() == y;
    }

    getPosition(): Vector2 {
        return this.position;
    }

    getScale(): Vector2 {
        return this.scale;
    }

    getRotation(): number {
        return this.rotation;
    }

    setRotation(rotation: number) {
        this.rotation = rotation;
    }

    
}