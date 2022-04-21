import { GObject } from './object';

export class GSpline extends GObject
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
        vpositions[0 + this.positions.length] = position[0];
        vpositions[1 + this.positions.length] = position[1];
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
        let vcopy = new Float32Array(this.positions);
        vcopy[0] = vcopy[0] - 1;
        let vpositions = new Float32Array(vcopy.length);
        for ( let i = 0; i < vcopy.length; i = i + 3 ) {
            let x = this.getX() + vcopy[ i + 0 ] + 1 + 1;
            if ( x < this.getX() ) x = this.getX() + 1;
            if ( x > this.getX() + this.getWidth() ) 
                x = this.getX() + this.getWidth() - 1;
            let y = this.getY() + vcopy[ i + 1 ] + 1 + 1;
            if ( y < this.getY() ) y = this.getY() + 1;
            if ( y > this.getY() + this.getHeigth() ) 
                y = this.getY() + this.getHeigth() - 1;
            vpositions[ i + 0 ] = instance.calcX(x);
            vpositions[ i + 1 ] = instance.calcY(y);
            vpositions[ i + 2 ] = vcopy[ i + 2 ];
        }
        return vpositions;
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