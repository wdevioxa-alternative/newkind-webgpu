import { GObject } from './object.mjs';

export class GSpline extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
        this.clearItems();
    }  
    appendItem( instance, position, color )
    {
        var vpositions = new Float32Array(this.positions.length + position.length);
        for (let i=0; i<this.positions.length; i++) 
            vpositions[i] = this.positions[i];
        vpositions[0 + this.positions.length] = position[0];
        vpositions[1 + this.positions.length] = position[1];
        vpositions[2 + this.positions.length] = position[2];
        this.positions = vpositions;
        var vcolors = new Float32Array(this.colors.length + color.length);
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
        let vpositions = new Float32Array(this.positions.length);
        for ( let i = 0; i < this.positions.length; i = i + 3 ) {
            let x = this.getX() + this.positions[ i + 0 ] + 1 + 1;
            if ( x <= this.getX() + 1 ) x = this.getX() + 1 + 1;
            if ( x > this.getX() + this.getWidth() ) 
                x = this.getX() + this.getWidth();
            let y = this.getY() + this.positions[ i + 1 ] + 1 + 1;
            if ( y <= this.getY() + 1 ) y = this.getY() + 1 + 1;
            if ( y > this.getY() + this.getHeight() ) 
                y = this.getY() + this.getHeight();
            vpositions[ i + 0 ] = instance.calcX( ( i == 0 ) ? x - 1 : x );
            vpositions[ i + 1 ] = instance.calcY( y );
            vpositions[ i + 2 ] = this.positions[ i + 2 ];
        }
        return vpositions;
    }
    getColors( instance ) {
        return this.colors;
    }
    getBorderColors( instance ) {
        const now = Date.now();
        let g1 = Math.cos( now / 1000);
        let g2 = Math.cos( now / 1000 + Math.PI / 2.0  );
        let g3 = Math.cos( now / 1000 + Math.PI );
        let g4 = Math.cos( now / 1000 + 3.0 * Math.PI / 2.0 );
        let defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0, 1.0 ];
        let defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0, 1.0 ];
        let defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5, 1.0 ];
        let defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0, 1.0 ];   
        let index = 0;
        let colors = new Float32Array( 32 );
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor1[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor2[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor2[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor3[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor3[i];            
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor4[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor4[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = defaultColor1[i];
        return colors;
    }
    getBorderPositions( instance )
    {
        let objectwidth = this.getWidth();
        let objectheight = this.getHeight();
        let offsetx = this.getX() + 1; // border size
        let offsety = this.getY() + 1; // border size
        return new Float32Array([
            instance.calcX(offsetx-1), instance.calcY(offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(offsetx), instance.calcY(offsety), 0.0
        ]);
    }
    getAxisColors( instance, color )
    {
        let colors = new Float32Array( 16 );
        let index = 0;
        for ( let i = 0; i < 4; i++ ) colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ ) colors[index++] = color[i];
        return colors;
    }
    getAxisPositions( instance )
    {
        let objectwidth = this.getWidth();
        let objectheight = this.getHeight();
        let offsetx = this.getX() + 1;
        let offsety = this.getY() + 1;

        let iterationsX = 50;
        let iterationsY = 10;

        let stepX = objectwidth / iterationsX;
        let stepY = objectheight / iterationsY;

        let axis = new Float32Array([
            // vertical
            instance.calcX(offsetx-1), instance.calcY( offsety + objectheight / 2 ), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY( offsety + objectheight / 2 ), 0.0,
            // horizontal
            instance.calcX( objectwidth / 2 + offsetx ), instance.calcY( offsety ), 0.0,
            instance.calcX( objectwidth / 2 + offsetx ), instance.calcY( objectheight + offsety ), 0.0
        ]);

        for ( let i = 0; i < iterationsX; i++ ) {
            // на право
            instance.calcX( objectwidth / 2 + offsetx ), instance.calcY( offsety ), 0.0,
            instance.calcX( objectwidth / 2 + offsetx ), instance.calcY( objectheight + offsety ), 0.0
                
        }

        return axis;
    }
    async draw( instance, color ) {
        //////////////////////////////////
        // draw border
        //////////////////////////////////
        instance.positionBuffer = instance.createBuffer(this.getBorderPositions(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.colorBuffer = instance.createBuffer(this.getBorderColors(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.passEncoder.setVertexBuffer(0, instance.positionBuffer);
        instance.passEncoder.setVertexBuffer(1, instance.colorBuffer);
        instance.passEncoder.draw( 8, 1, 0, 0 );
        //////////////////////////////////
        // draw axis
        //////////////////////////////////        
        instance.positionBuffer = instance.createBuffer(this.getAxisPositions(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.colorBuffer = instance.createBuffer(this.getAxisColors(instance, color), GPUBufferUsage.VERTEX,instance.device);
        instance.passEncoder.setVertexBuffer(0, instance.positionBuffer);
        instance.passEncoder.setVertexBuffer(1, instance.colorBuffer);
        instance.passEncoder.draw( 4, 1, 0, 0 );
    }
    async functionDraw( instance, beginX, endX, beginY, endY, iterations, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) {
        let origWidth = this.getWidth();
        let origHeight = this.getHeight() ;				
        let complexWidth = endX - beginX;
        let complexHeight = endY - beginY ;
        var xCount = iterations;
        var xOffset = complexWidth / xCount;    
        var floatX = 0.0;
        var floatY = 0.0;
        this.clearItems();    
        for ( let i = 0; i < xCount; i++ ) {  
            floatX = ( i + 0 ) * xOffset;
            floatY = func( floatX + beginX );       
            let realX = instance.calcScale(origWidth,complexWidth,floatX);
            let realY = origHeight-instance.calcScale(origHeight,complexHeight,floatY - beginY);
            this.appendItem(instance,[realX,realY,0.0],color);
            floatX = ( i + 1 ) * xOffset;
            floatY = func( floatX + beginX );
            realX = instance.calcScale(origWidth,complexWidth,floatX);
            realY = origHeight - instance.calcScale(origHeight,complexHeight,floatY - beginY);
            this.appendItem(instance,[realX,realY,0.0],color);
            /////////////////////////////////////////////////////////////////////
            // рисование точки
            /////////////////////////////////////////////////////////////////////
            this.appendItem(instance,[realX-1,realY+1,0.0],color);
            this.appendItem(instance,[realX-1,realY-1,0.0],color);
            this.appendItem(instance,[realX-1,realY-1,0.0],color);
            this.appendItem(instance,[realX+1,realY-1,0.0],color);
            this.appendItem(instance,[realX+1,realY-1,0.0],color);
            this.appendItem(instance,[realX+1,realY+1,0.0],color);
            this.appendItem(instance,[realX+1,realY+1,0.0],color);
            this.appendItem(instance,[realX-1,realY+1,0.0],color);
        }
        let positions = this.getPositions(instance);
        let colors = this.getColors(instance);
        let vertexCount = positions.length / 3;
        instance.positionBuffer = instance.createBuffer(positions, GPUBufferUsage.VERTEX,instance.device);
        instance.colorBuffer = instance.createBuffer(colors, GPUBufferUsage.VERTEX,instance.device);
        instance.passEncoder.setVertexBuffer(0, instance.positionBuffer);
        instance.passEncoder.setVertexBuffer(1, instance.colorBuffer);
        instance.passEncoder.draw(vertexCount, 1, 0, 0 );
    }
};