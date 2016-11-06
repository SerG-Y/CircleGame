import Circle from './Circle';

export default class Mob extends Circle {
    private right: boolean;
    private up: boolean;

    constructor(x: number, y: number, radius: number, color: string = "green", lineWidth: number = 2) {
        super(x, y, radius, color, lineWidth);
        this.right = true;
        this.up = true;

        setInterval(this.changeDirection.bind(this), 3000);
    }

    public update(): void {
        if(this.x >= 1280 || this.x <= 0
            || this.y <= 0 || this.y >= 720) {
            this.x = 1280 / 2;
            this.y = 720 / 2;
        }

        if(this.right)
            this.x++;
        else
            this.x--;

        if(this.up)
            this.y++;
        else
            this.y--;
    }

    private changeDirection(): void{
        this.right = Math.random() >= 0.5;
        this.up = Math.random() >= 0.6;
    }
}