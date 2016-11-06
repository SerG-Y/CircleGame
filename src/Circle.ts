import Shape from './Shape';

export default class Circle implements Shape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 10;
    public lineWidth: number = 2;
    public color: string = "blue";
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string = "blue", lineWidth: number = 2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.ctx = ctx;
    }

    public draw(): void {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}