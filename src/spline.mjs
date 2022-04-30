import { GObject } from './object.mjs';
import { GLabel } from './label.mjs';

export class GSpline extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
        this.clearItems();
        this.setColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setDuty( false );
        this.labels = [];
    }  
    destroy()
    {
        for ( let i = this.labels.length - 1; i >= 0; i-- ) 
            this.labels[i].destroy();
        this.labels = [];
        this.setBorderPositionsBuffer( null );
        this.setBorderColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setColorsBuffer( null );
        this.setAxisPositionsBuffer( null );
        this.setAxisColorsBuffer( null );
        this.setDuty( true );
    }
    setBorderPositionsBuffer( positions )
    {
        if ( positions == null )
            if ( this.borderPositionsBuffer != null )
                this.borderPositionsBuffer.destroy();
        this.borderPositionsBuffer = positions;
    }
    getBorderPositionsBuffer() 
    {
        return this.borderPositionsBuffer;
    }
    setBorderColorsBuffer( colors )
    {
        if ( colors == null )
            if ( this.borderColorsBuffer != null )
                this.borderColorsBuffer.destroy();
        this.borderColorsBuffer = colors;
    }
    getBorderColorsBuffer() 
    {
        return this.borderColorsBuffer;
    }
    setAxisPositionsBuffer( positions )
    {
        if ( positions == null )
            if ( this.axisPositionsBuffer != null )
                this.axisPositionsBuffer.destroy();
        this.axisPositionsBuffer = positions;
    }
    getAxisPositionsBuffer() 
    {
        return this.axisPositionsBuffer;
    }
    setAxisColorsBuffer( colors )
    {
        if ( colors == null )
            if ( this.axisColorsBuffer != null )
                this.axisColorsBuffer.destroy();
        this.axisColorsBuffer = colors;
    }
    getAxisColorsBuffer() 
    {
        return this.axisColorsBuffer;
    }
    setPositionsBuffer( positions )
    {
        if ( positions == null )
            if ( this.positionsBuffer != null )
                this.positionsBuffer.destroy();
        this.positionsBuffer = positions;
    }
    getPositionsBuffer() 
    {
        return this.positionsBuffer;
    }
    setColorsBuffer( colors )
    {
        if ( colors == null )
            if ( this.colorsBuffer != null )
                this.colorsBuffer.destroy();
        this.colorsBuffer = colors;
    }
    getColorsBuffer() 
    {
        return this.colorsBuffer;
    }
    appendItem( instance, position, color )
    {
        var vpositions = new Float32Array(this.positions.length + position.length);
        for (let i = 0; i < this.positions.length; i++) 
            vpositions[i] = this.positions[i];
        vpositions[0 + this.positions.length] = position[0];
        vpositions[1 + this.positions.length] = position[1];
        vpositions[2 + this.positions.length] = position[2];
        this.positions = vpositions;
        var vcolors = new Float32Array(this.colors.length + color.length);
        for (let i = 0; i < this.colors.length; i++) 
            vcolors[i] = this.colors[i];
        vcolors[0 + this.colors.length] = color[0];
        vcolors[1 + this.colors.length] = color[1];
        vcolors[2 + this.colors.length] = color[2];
        vcolors[3 + this.colors.length] = color[3];
        this.colors = vcolors;
    }
    clearItems() {
        this.positions = new Float32Array();
        this.colors = new Float32Array();
    }
    getLabelsCount() {
        return this.labels.length;
    }
    getLabelAt( objectIndex ) {
        return this.labels[ objectIndex ];
    }
    appendLabel( label ) {
        this.labels.push( label );
        return this.labels.length - 1;
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
    getBorderPositions( instance )
    {
        let objectWidth = this.getWidth();
        let objectHeight = this.getHeight();
        let offsetX = this.getX() + 1; // border size
        let offsetY = this.getY() + 1; // border size
        return new Float32Array([
            instance.calcX(offsetX-1), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(offsetY), 0.0
        ]);
    }
    getBorderColors( instance ) {
        const now = Date.now();
        let g1 = Math.cos( now / 1000 );
        let g2 = Math.cos( now / 1000 + Math.PI / 2.0  );
        let g3 = Math.cos( now / 1000 + Math.PI );
        let g4 = Math.cos( now / 1000 + 3.0 * Math.PI / 2.0 );
        let defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0, 1.0 ];
        let defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0, 1.0 ];
        let defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5, 1.0 ];
        let defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0, 1.0 ];   
        let objectIndex = 0;
        let borderColors = new Float32Array( 32 );
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor1[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor2[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor2[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor3[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor3[i];            
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor4[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor4[i];
        for ( let i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor1[i];
        return borderColors;
    }
    getAxisPositions( instance, iterationsX, iterationsY )
    {
        //////////////////////////////////////////////////
        // количество линий
        //////////////////////////////////////////////////
        let itX = (iterationsX + 1) & ~1;
        let itY = (iterationsY + 1) & ~1;
        let objectWidth = this.getWidth();
        let objectHeight = this.getHeight();
        let offsetX = this.getX() + 1;
        let offsetY = this.getY() + 1;
        let stepX = objectWidth / itX;
        let stepY = objectHeight / itY;
        let objectIndex = 0;
        let axisPositions = new Float32Array( 3 * ( ( itX + itY + 2 ) * 2 ) );
        for ( let i = 0; i < 3 * 4; i++ ) {
            axisPositions[objectIndex++] = [
                instance.calcX( offsetX - 1 ), instance.calcY( offsetY + objectHeight / 2 ), 0.0,
                instance.calcX( objectWidth + offsetX ), instance.calcY( offsetY + objectHeight / 2 ), 0.0,
                instance.calcX( objectWidth / 2 + offsetX ), instance.calcY( offsetY ), 0.0,
                instance.calcX( objectWidth / 2 + offsetX ), instance.calcY( objectHeight + offsetY ), 0.0 
            ][i];
        }
        for ( let i = 0; i < itX; i++ ) {
            for ( let j = 0; j < 6; j++ ) {
                axisPositions[objectIndex++] = [ 
                    instance.calcX( i * stepX + offsetX ), instance.calcY( objectHeight / 2 + offsetY - 1 ), 0.0,
                    instance.calcX( i * stepX + offsetX ), instance.calcY( objectHeight / 2 + offsetY + 2 ), 0.0 
                ][j];
            }
        }
        for ( let i = 0; i < itY; i++ ) { 
            if ( i == itY / 2 - 1 ) continue;
            for ( let j = 0; j < 6; j++ ) {
                axisPositions[objectIndex++] = [
                    instance.calcX( objectWidth / 2 + offsetX - 2 ), instance.calcY( ( i + 1 ) * stepY + offsetY ), 0.0,
                    instance.calcX( objectWidth / 2 + offsetX + 1), instance.calcY( ( i + 1 ) * stepY + offsetY ), 0.0 
                ][j];
            }
        }

        return axisPositions;
    }
    getAxisColors( instance, iterations, color )
    {
        //////////////////////////////////////////////////
        // количество линий
        //////////////////////////////////////////////////
        let it = (iterations + 1) & ~1;
        let axisColors = new Float32Array( 4 * ( ( it + 2 ) * 2 ) );
        let objectIndex = 0;
        for ( let i = 0; i < ( it + 2 ) * 2; i++ ) {
            for ( let j = 0; j < 4; j++ ) 
                axisColors[objectIndex++] = color[j];
        }
        return axisColors;
    }
    async draw( instance, minX, maxX, iterationsX, minY, maxY, iterationsY, color = [ 1.0, 1.0, 1.0, 1.0 ]) 
    {
        //////////////////////////////////
        // draw border
        //////////////////////////////////
        let objectRedraw = this.isDuty();
        if ( objectRedraw == true ) {
            this.setPositionsBuffer( null );
            this.setColorsBuffer( null );
            this.setBorderPositionsBuffer( null );
            this.setBorderColorsBuffer( null );
            this.setAxisPositionsBuffer( null );
            this.setAxisColorsBuffer( null );
            this.setDuty( false );
        }
        let borderPositionsBuffer = this.getBorderPositionsBuffer();
        if ( borderPositionsBuffer == null ) {
            borderPositionsBuffer = instance.createBuffer(this.getBorderPositions(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setBorderPositionsBuffer( borderPositionsBuffer );
        }
        this.setBorderColorsBuffer( null );
        let borderColorsBuffer = this.getBorderColorsBuffer();
        if ( borderColorsBuffer == null ) {
            borderColorsBuffer = instance.createBuffer(this.getBorderColors(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setBorderColorsBuffer( borderColorsBuffer );
        }
        instance.passEncoder.setPipeline(instance.linePipeline);
        instance.passEncoder.setVertexBuffer(0, borderPositionsBuffer);
        instance.passEncoder.setVertexBuffer(1, borderColorsBuffer);
        instance.passEncoder.draw( 8, 1, 0, 0 );
        //////////////////////////////////
        // draw axis
        //////////////////////////////////        
        let itX = (iterationsX + 1) & ~1;
        let itY = (iterationsY + 1) & ~1;
        let stepX = ( maxX - minX ) / itX;
        let stepY = ( maxY - minY ) / itY;
        let positions = this.getAxisPositions(instance, iterationsX, iterationsY);
        let colors = this.getAxisColors(instance, iterationsX + iterationsY, color);
        if ( this.getLabelsCount() == 0 )
        {
            for ( let i = 12; i < 12 + itX * 3 * 2; i = i + 12 ) 
            {
                let label = new GLabel( 100, 8,'Verdana', 0, 0, 128, 128 );
                label.setX(instance.calcRX( positions[i + 0] ));
                label.setY(instance.calcRY( positions[i + 1] ) + 2);
                label.setDuty( true );
                this.appendLabel( label );
            }
            for ( let i = 12 + itX * 3 * 2; i < 12 + ( itX + itY ) * 3 * 2; i = i + 6 ) 
            {
                let label = new GLabel( 100, 8,'Verdana', 0, 0, 128, 128 );
                label.setX(instance.calcRX( positions[i + 0] ) + 4);
                label.setY(instance.calcRY( positions[i + 1] ) - 6);
                label.setDuty( true );
                this.appendLabel( label );
            }
        }
        let iteration = 0;
        for ( let i = 0; i < itX; i = i + 2 ) {
            let stringValue = '';
            let numberValue = ( minX + ( stepX * i ) );
            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';
            this.getLabelAt( iteration ).draw( instance, 'rgba(255, 255, 255, 1.0)', 'rgba(0, 0, 0, 1.0)', stringValue + numberValue.toFixed(2).toString(), true );
            iteration++;
        }
        for ( let i = 0; i < itY - 1; i++ ) {         
            let stringValue = '';
            let numberValue = ( maxY - ( stepY * (i + 1) ) );
            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';
            if ( i != itY / 2 - 1 ) {
                this.getLabelAt( iteration ).draw( instance, 'rgba(255, 255, 255, 1.0)', 'rgba(0, 0, 0, 1.0)', stringValue + numberValue.toFixed(2).toString(), true );
                iteration++;
            }
        }
        let axisPositionsBuffer = this.getAxisPositionsBuffer();
        if ( axisPositionsBuffer == null ) {
            axisPositionsBuffer = instance.createBuffer(positions, GPUBufferUsage.VERTEX, instance.device);
            this.setAxisPositionsBuffer( axisPositionsBuffer );
        }
        let axisColorsBuffer = this.getAxisColorsBuffer();
        if ( axisColorsBuffer == null ) {
            axisColorsBuffer = instance.createBuffer(colors, GPUBufferUsage.VERTEX, instance.device);
            this.setAxisColorsBuffer( axisColorsBuffer );
        }
        let vertexCount = positions.length / 3;
        instance.passEncoder.setPipeline(instance.linePipeline);
        instance.passEncoder.setVertexBuffer(0, axisPositionsBuffer);
        instance.passEncoder.setVertexBuffer(1, axisColorsBuffer);
        instance.passEncoder.draw( vertexCount, 1, 0, 0 );
    }
    async functionDraw( instance, beginX, endX, beginY, endY, iterations, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
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

        //let positionsBuffer = this.getPositionsBuffer();

        let newPositionsBuffer = instance.createBuffer(positions, GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push(newPositionsBuffer);
        //this.setPositionsBuffer( newPositionsBuffer );
        //let colorsBuffer = this.getColorsBuffer();

        let newColorsBuffer = instance.createBuffer(colors, GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push(newColorsBuffer);
        //this.setColorsBuffer( newColorsBuffer );

        let vertexCount = positions.length / 3;

        instance.passEncoder.setPipeline(instance.linePipeline);
        instance.passEncoder.setVertexBuffer(0, newPositionsBuffer);
        instance.passEncoder.setVertexBuffer(1, newColorsBuffer);
        instance.passEncoder.draw( vertexCount, 1, 0, 0 );
    }
};