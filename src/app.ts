let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let mouseHandler;

interface Shape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class Circle implements Shape {
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

    public draw = (): void => {
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
}

class Player extends Circle {
    private speed: number = 2;

    constructor(x: number, y: number, radius: number, speed: number = 2, color: string = "green", lineWidth: number = 2) {
        super(x, y, radius, color, lineWidth);
        this.speed = speed;
    }

    public draw = (): void => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.lineWidth;

        //to make player follow the mouse
        if(mouseHandler.isMouseIn() && !this.isMouseOnPlayer()) {
            let mousePosition = mouseHandler.getPosition();
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
    };

    private isMouseOnPlayer() {
        let mousePosition = mouseHandler.getPosition();

        return mousePosition.x <= this.x + this.radius && mousePosition.y <= this.y + this.radius
            && mousePosition.x >= this.x && mousePosition.y >= this.y;
    }
}

class MouseHandler {
    private x: number;
    private y: number;
    private mouseIn;

    constructor(attachEventToDocument) {
        this.x = 0;
        this.y = 0;
        this.mouseIn = false;
        attachEventToDocument.addEventListener('mousemove', this.onMouseMove.bind(this));
        attachEventToDocument.addEventListener('mouseout', this.onMouseOut.bind(this));
        attachEventToDocument.addEventListener('mouseover', this.onMouseOver.bind(this));
    }

    private onMouseMove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    private onMouseOut() {
        this.mouseIn = false;
    }

    private onMouseOver() {
        this.mouseIn = true;
    }

    public getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    public isMouseIn(): boolean {
        return this.mouseIn;
    }
}

let player: Player = new Player(200, 300, 12);
let circles = [];

function gameLoop() {
    requestAnimationFrame(gameLoop);

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 1280, 720);

    for(let circle of circles)
        circle.draw();

    player.draw();
}

window.onload = () => {
    const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'brown', 'violet'];
    mouseHandler = new MouseHandler(document);
    canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    for(let i = 0; i < 5; i++) {
        let colors = COLORS[Math.floor(Math.random() * 7)];
        let x = Math.floor(Math.random() * (1280 - 50)) + 50;
        let y =  Math.floor(Math.random() * (720 - 50)) + 50;

        circles.push(new Circle(x, y, 8, colors));
    }

    gameLoop();
};