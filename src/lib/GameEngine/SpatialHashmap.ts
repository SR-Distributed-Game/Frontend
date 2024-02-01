import type { ColliderComponent } from "./Components/ColliderComponent";

export class SpatialHashmap {
    private cellSize: number;
    private map: Map<number, ColliderComponent[]>;
    private alreadyCollided: Map<string, boolean>;
    private cellMap: Map<ColliderComponent, number[]>;
    private colls: number;
    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.map = new Map<number, ColliderComponent[]>();
        this.alreadyCollided = new Map<string, boolean>();
        this.cellMap = new Map<ColliderComponent, number[]>();
        this.colls = 0;
    }

    getCollsCount(): number {
        return this.colls;
    }

    getTheoreticalCollsCount(): number {
        let count = 0;
        this.map.forEach((list) => count += list.length);
        return count;
    }

    insert(collider: ColliderComponent): void {
        const cells = this.getCells(collider);
        
        cells.forEach(cell => {
            if (!this.map.has(cell)) {
                this.map.set(cell, []);
            }
            this.map.get(cell)!.push(collider);            
        });
    }

    remove(collider: ColliderComponent): void {
        const cells = this.getCells(collider);
        cells.forEach(cell => {
            const list = this.map.get(cell);
            if (list) {
                const index = list.indexOf(collider);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        });
    }

    clear() {
        this.map.clear();
        this.cellMap.clear();
    }

    getCells(collider: ColliderComponent): number[] {

        const transform = collider.getParent().getTransform();
        
        const x = Math.floor(transform.getPosition().getX() / this.cellSize);
        const y = Math.floor(transform.getPosition().getY() / this.cellSize);
        const x2 = Math.floor((transform.getPosition().getX() + transform.getScale().getX()) / this.cellSize);
        const y2 = Math.floor((transform.getPosition().getY() + transform.getScale().getY()) / this.cellSize);

        const cellSet = new Set<number>();
        for (let i = x; i <= x2; i++) {
            for (let j = y; j <= y2; j++) {
                cellSet.add(this.getCellHash(i, j));
            }
        }
        const cells = Array.from(cellSet);
        this.cellMap.set(collider, cells);
        return cells;
    }

    getCellHash(x: number, y: number): number {
        return x * 31393 + y * 6353;
    }

    query(collider: ColliderComponent): Set<ColliderComponent> {
        const set = new Set<ColliderComponent>();
        const cells = this.getCells(collider);
        cells.forEach(cell => {
            const list = this.map.get(cell);
            if (list) {
                list.forEach(item => set.add(item));
            }
        });
        return set;
    }

    draw(p:any){
        p.stroke(255);
        p.strokeWeight(1);
        for (let i = 0; i < p.width; i += this.cellSize) {
            p.line(i, 0, i, p.height);
        }
        for (let i = 0; i < p.height; i += this.cellSize) {
            p.line(0, i, p.width, i);
        }
    }

    checkCollisions(collider: ColliderComponent) {
        const list = this.query(collider);
        list.forEach(g => {
            this.colls += 1;
            if (g === collider || this.checkCollisionHash(collider, g)) {
                return;
            }
            this.addCollisionHash(collider, g);
            const info = this.checkAABBCollision(collider, g);
            if (info) {
                collider.MonCollisionEnter(g);
                g.MonCollisionEnter(collider);
            }
        });
    }

    addCollisionHash(collider1: ColliderComponent, collider2: ColliderComponent) {
        this.alreadyCollided.set(this.getKeyForPair(collider1, collider2), true);
    }

    checkCollisionHash(collider1: ColliderComponent, collider2: ColliderComponent): boolean {
        return this.alreadyCollided.has(this.getKeyForPair(collider1, collider2));
    }

    getKeyForPair(collider1: ColliderComponent, collider2: ColliderComponent): string {
        return collider1.getParent().getId() + "_" + collider2.getParent().getId();
    }

    getHashMap(): Map<number, ColliderComponent[]> {
        return this.map;
    }

    update(){
        this.colls = 0;
        this.map.forEach(list => {
            list.forEach(collider => this.checkCollisions(collider));
        });

        this.alreadyCollided.clear();
    }

    // Assuming checkAABBCollision is a method that checks for Axis-Aligned Bounding Box collision
    // and returns a boolean or collision data. You'll need to implement this based on your collision detection needs.
    checkAABBCollision(collider1: ColliderComponent, collider2: ColliderComponent): any {
        
        var transform1 = collider1.getParent().getTransform();
        var transform2 = collider2.getParent().getTransform();

        var x1 = transform1.getPosition().getX();
        var y1 = transform1.getPosition().getY();
        var w1 = transform1.getScale().getX();
        var h1 = transform1.getScale().getY();

        var x2 = transform2.getPosition().getX();
        var y2 = transform2.getPosition().getY();
        var w2 = transform2.getScale().getX();
        var h2 = transform2.getScale().getY();

        if (x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            h1 + y1 > y2) {
            return true;
        }
        return false;
    }
}