import { DrawPolyComponent } from "$lib/GameEngine/Components/DrawPolyComponent";
import { GameObject } from "$lib/GameEngine/GameObject";
import { Vector2 } from "$lib/GameEngine/Vector2";

export class terrain extends GameObject {

    constructor(size: Vector2) {
        super();
        this.setName("terrain");
        this.getTransform().setPosition(new Vector2(0,0));
        this.getTransform().setScale(new Vector2(size.getX(),size.getY()));

    }

    start(): void {

        var points = [
            new Vector2(this.getTransform().getPosition().getX() ,
                        this.getTransform().getPosition().getY()),
    
            new Vector2(this.getTransform().getPosition().getX() + this.getTransform().getScale().getX(),
                        this.getTransform().getPosition().getY()),
    
            new Vector2(this.getTransform().getPosition().getX() + this.getTransform().getScale().getX(),
                        this.getTransform().getPosition().getY() + this.getTransform().getScale().getY()),
    
            new Vector2(this.getTransform().getPosition().getX(),
                        this.getTransform().getPosition().getY() + this.getTransform().getScale().getY()),
        ]
        this.addDrawComponent(new DrawPolyComponent(this, points ,"#00000020"));
    }
}