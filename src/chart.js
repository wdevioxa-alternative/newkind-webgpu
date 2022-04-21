import { GObject } from './object';

export class GChart extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
        this.clearItems();
    }  
    /**
     *  @param {this} instance 
     *  @param {Float32Array} position - The array of vertex
     *  @param {Float32Array} color - The array of vertex color
    */
    appendItem( instance, position, color )
    {
        let vpositions = new Float32Array(this.positions.length + position.length);
        for (let i=0; i<this.positions.length; i++) 
            vpositions[i] = this.positions[i];
        vpositions[0 + this.positions.length] = instance.calcX(position[0]);
        vpositions[1 + this.positions.length] = instance.calcY(position[1]);
        vpositions[2 + this.positions.length] = position[2];
        this.positions = vpositions;
        let vcolors = new Float32Array(this.colors.length + color.length);
        for (let i=0; i<this.colors.length; i++) 
            vcolors[i] = this.colors[i];
        vcolors[0 + this.colors.length] = color[0];
        vcolors[1 + this.colors.length] = color[1];
        vcolors[2 + this.colors.length] = color[2];
        this.colors = vcolors;
    }
    clearItems() {
        this.positions = new Float32Array();
        this.colors = new Float32Array();
    }
    getPositions( instance ) {
        return this.positions;
    }
    getColors( instance ) {
        return this.colors;
    }
    getBorderColors( instance )
    {
        return new Float32Array([
            1.0, 0.0, 0.0, // 🔴
            0.0, 1.0, 0.0, // 🟢
            0.0, 1.0, 0.0, // 🟢
            0.0, 0.0, 1.0, // 🔵
            0.0, 0.0, 1.0, // 🔵
            0.0, 1.0, 0.0, // 🟢
            0.0, 1.0, 0.0, // 🟢
            1.0, 0.0, 0.0  // 🔴
        ]);
    }
    getBorderPositions( instance )
    {
        let objectwidth = super.getWidth();
        let objectheight = super.getHeigth();
        let offsetx = super.getX();
        let offsety = super.getY();
        return new Float32Array([
            instance.calcX(1+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+objectheight+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+objectwidth+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(1+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(0+offsety), 0.0,
            instance.calcX(1+offsetx), instance.calcY(1+objectheight+offsety), 0.0
        ]);
    }
};