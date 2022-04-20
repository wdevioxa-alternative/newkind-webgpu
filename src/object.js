
export default class GObject
{
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    constructor( x, y, width, height ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeigth() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
};