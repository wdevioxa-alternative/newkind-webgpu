import { GObject } from './object';

export class GBox extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
    }  
    getColors( instance )
    {
        let colors = new Float32Array([
            1.0, 0.0, 0.0, // 🔴
            0.0, 1.0, 0.0, // 🟢
            0.0, 1.0, 0.0, // 🟢
            0.0, 0.0, 1.0, // 🔵
            0.0, 0.0, 1.0, // 🔵
            0.0, 1.0, 0.0, // 🟢
            0.0, 1.0, 0.0, // 🟢
            1.0, 0.0, 0.0  // 🔴
        ]);
        return colors;
    }
    getPositions( instance )
    {
        let objectwidth = super.getWidth();
        let objectheight = super.getHeigth();
        let offsetx = super.getX();
        let offsety = super.getY();
        let positions = new Float32Array([
            instance.calcX(1+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(0+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(1+objectheight+offsety), 0.0
        ]);
        return positions;
    }
};