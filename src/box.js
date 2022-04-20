const GObject = require("./object");

export default class GBox extends GObject
{
    constructor( x, y, width, height ) {
        super.setX(x);
        super.setY(y);
        super.setWidth(width);
        super.setHeight(height);
    }
};