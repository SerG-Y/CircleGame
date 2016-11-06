export default class MouseHandler {
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