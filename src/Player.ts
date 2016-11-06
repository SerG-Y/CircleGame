import Circle from './Circle';
import MouseHandler from './MouseHandler';

export default class Player extends Circle {
    private speed: number = 2;
    private mouseHandler: MouseHandler;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, speed: number = 2, color: string = "green", lineWidth: number = 2) {
        super(ctx, x, y, radius, color, lineWidth);
        this.speed = speed;
        this.mouseHandler = new MouseHandler(document);
    }

    public draw(): void {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = this.lineWidth;

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

        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    private isMouseOnPlayer() {
        let mousePosition = this.mouseHandler.getPosition();

        return mousePosition.x <= this.x + this.radius && mousePosition.y <= this.y + this.radius
            && mousePosition.x >= this.x && mousePosition.y >= this.y;
    }
}