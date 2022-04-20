import { GObject } from './object';

export class GGraph extends GObject
{
    constructor( x, y, width, height ) {
        this.colors = new Float32Array();
        this.positions = new Float32Array();

        super( x, y, width, height );
    }  
    setItem( position: Float32Array, color: Float32Array )
    {
        //let poslen = this.positions.length;
        alert(position.length);
        alert(color.length);
        //let clen = this.colors.length;
    
    }
    getColors( instance ) {
        return this.colors;
    }
    getPositions( instance ) {
        return this.positions;
    }
    getBorderColors( instance )
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
    getBorderPositions( instance )
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