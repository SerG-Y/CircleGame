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

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.lineWidth;

        //to make player follow the mouse
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

        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    private isMouseOnPlayer() {
        let mousePosition = this.mouseHandler.getPosition();

        return mousePosition.x <= this.x + this.radius && mousePosition.y <= this.y + this.radius
            && mousePosition.x >= this.x && mousePosition.y >= this.y;
    }
}