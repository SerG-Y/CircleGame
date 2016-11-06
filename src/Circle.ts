import Shape from './Shape';

export default class Circle implements Shape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 10;
    public lineWidth: number = 2;
    public color: string = "blue";

    constructor(x: number, y: number, radius: number, color: string = "blue", lineWidth: number = 2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    public update(): void {}
}