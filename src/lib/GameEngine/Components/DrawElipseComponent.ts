import type { GameObject } from "../GameObject";
import { drawComponent } from "../drawComponent";

export class DrawElipseComponent extends drawComponent {
    private color: string;
    constructor(parent: GameObject, color: string) {
        super(parent);
        this.color = color;
    }

    draw(p: any, camera: any) {
        p.fill(this.color);
        p.ellipse(this.getParent().getTransform().getPosition().getX() - camera.getTransform().getPosition().getX(), this.getParent().getTransform().getPosition().getY() - camera.getTransform().getPosition().getY(), this.getParent().getTransform().getScale().getX(), this.getParent().getTransform().getScale().getY());
    }
}
