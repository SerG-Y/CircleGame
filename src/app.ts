import Shape from './Shape';
import Circle from './Circle';
import Player from './Player';
import Mob from './Mob'

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let shapes: Array<Shape> = [];

function gameLoop() {
    requestAnimationFrame(gameLoop);

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 1280, 720);

    for(let shape of shapes) {
        shape.update();
        shape.draw(ctx);
    }
}

window.onload = () => {
    const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'brown', 'violet'];
    canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    shapes.push(new Player(200, 300, 12));
    for(let i = 0; i < 5; i++) {
        let colors = COLORS[Math.floor(Math.random() * 7)];
        let x = Math.floor(Math.random() * (1280 - 50)) + 50;
        let y =  Math.floor(Math.random() * (720 - 50)) + 50;

        shapes.push(new Circle(x, y, 8, colors));
    }

    shapes.push(new Mob(100, 200, 14, "blue"));
    gameLoop();
};