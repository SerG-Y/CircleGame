import Circle from './Circle';
import MouseHandler from './MouseHandler';

export default class Player extends Circle {
    private speed: number = 2;
    private mouseHandler: MouseHandler;

    constructor(x: number, y: number, radius: number, speed: number = 2, color: string = "green", lineWidth: number = 2) {
        super(x, y, radius, color, lineWidth);
        this.speed = speed;
        this.mouseHandler = new MouseHandler(document);
    }

    public update(): void {
        if(this.mouseHandler.isMouseIn() && !this.isMouseOnPlayer()) {
            let mousePosition = this.mouseHandler.getPosition();
            let dx = mousePosition.x - this.x;
            let dy = mousePosition.y - this.y;

            let dist = Math.sqrt((dx * dx) + (dy * dy));

            let newVelX = (dx / dist) * this.speed;
            let newVelY = (dy / dist) * this.speed;

            this.x += newVelX;
            this.y += newVelY;
        }
    }

    private isMouseOnPlayer(): boolean {
        let mousePosition = this.mouseHandler.getPosition();

        return mousePosition.x <= this.x + this.radius && mousePosition.y <= this.y + this.radius
            && mousePosition.x >= this.x && mousePosition.y >= this.y;
    }
}