interface Shape {
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

export default Shape;