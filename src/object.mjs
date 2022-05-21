export class GObject
{
    constructor( x, y, width, height )
    {
        this.setX(x);
        this.setY(y);
        this.setWidth( width );
        this.setHeight( height );
        this.setDuty( true );
    }
    setDuty( duty )
    {
        this.objectDuty = duty;
    }
    isDuty() {
        return this.getDuty();
    }
    getDuty()
    {
        return this.objectDuty;
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
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
};
