import { GObject } from './object.js';
import { GLabel } from './label.js';

export class GSpline extends GObject
{
    constructor( x, y, width, height ) 
    {
        super( x, y, width, height );

        this.clearItems();
        this.setColorsBuffer( null );
        this.setPositionsBuffer( null );

        this.setMaxX( +Math.PI );
        this.setMinX( -Math.PI );
        this.setItX( 58 );

        this.setMaxY( +1 );
        this.setMinY( -1 );
        this.setItY( 20 );

        this.setDuty( false );

        this.objectLabels = [];
    }  
    destroy()
    {
        for ( let i = this.objectLabels.length - 1; i >= 0; i-- ) 
            this.objectLabels[i].destroy();
        this.objectLabels = [];
        this.setBorderPositionsBuffer( null );
        this.setBorderColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setColorsBuffer( null );
        this.setAxisPositionsBuffer( null );
        this.setAxisColorsBuffer( null );
        this.setDuty( true );
    }
    setItX( itX )
    { this.itX = itX; }
    getItX()
    { return this.itX; }
    setItY( itY )
    { this.itY = itY; }
    getItY()
    { return this.itY; }
    setMinX( x )
    { this.minX = x; }
    getMinX()
    { return this.minX; }
    setMaxX( x )
    { this.maxX = x; }
    getMaxX()
    { return this.maxX; }
    setMinY( y )
    { this.minY = y; }
    getMinY()
    { return this.minY; }
    setMaxY( y )
    { this.maxY = y; }
    getMaxY()
    { return this.maxY; }

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
        return this.objectLabels.length;
    }
    getLabelAt( objectIndex ) {
        return this.objectLabels[ objectIndex ];
    }
    appendLabel( label ) {
        this.objectLabels.push( label );
        return this.objectLabels.length - 1;
    }
    getPositions( instance ) {
        let vpositions = new Float32Array(this.positions.length);
        for ( let i = 0; i < this.positions.length; i = i + 3 ) {

            let x = this.getX() + this.positions[ i + 0 ] + 2;
            if ( x < this.getX() + 2 ) x = this.getX() + 2;
            if ( x > this.getX() + this.getWidth() - 1 ) x = this.getX() + this.getWidth() - 1;

            let y = this.getY() + this.positions[ i + 1 ] + 2;
            if ( y < this.getY() + 2 ) y = this.getY() + 2;
            if ( y > this.getY() + this.getHeight() - 1 ) y = this.getY() + this.getHeight() - 1;

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
        let objectWidth = this.getWidth() - 1;	        // [ 1; width - 1 ]
        let objectHeight = this.getHeight() - 1;	// [ 1; height - 1 ]
        let offsetX = this.getX() + 1;
        let offsetY = this.getY() + 1;
        return new Float32Array([
            instance.calcX(offsetX - 1), instance.calcY(offsetY), 0.0,
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
        let itX = iterationsX | 1;
        let itY = iterationsY | 1;
	// [ 2; width - 3 ]
        let objectWidth = this.getWidth() - 3; // 3 border size
        let objectHeight = this.getHeight() - 3; // 3 border size
        let offsetX = this.getX() + 2; // 2 border size
        let offsetY = this.getY() + 2; // 2 border size
        let stepX = objectWidth / ( itX - 1 );
        let stepY = objectHeight / ( itY - 1 );
        let objectIndex = 0;
        let axisPositions = new Float32Array( 3 * ( ( itX + itY + 2 ) * 2 ) );
        for ( let i = 0; i < 3 * 4; i++ ) {
            axisPositions[objectIndex++] = [
                instance.calcX( ( objectIndex == 0 ) ? offsetX - 1 : offsetX ), instance.calcY( offsetY + objectHeight / 2 ), 0.0,
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
            for ( let j = 0; j < 6; j++ ) {
                axisPositions[objectIndex++] = [
                    instance.calcX( objectWidth / 2 + offsetX - 1 ), instance.calcY( i * stepY + offsetY ), 0.0,
                    instance.calcX( objectWidth / 2 + offsetX + 2 ), instance.calcY( i * stepY + offsetY ), 0.0 
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
        let it = iterations;
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
	this.setMinX( minX );
	this.setMaxX( maxX );
	this.setItX( iterationsX );

	this.setMinY( minY );
	this.setMaxY( maxY );
	this.setItY( iterationsY );
	
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
        //////////////////////////////////
        // draw borders
        //////////////////////////////////        
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
        let itX = iterationsX | 1;
        let itY = iterationsY | 1;

        let stepX = ( maxX - minX ) / ( itX - 1 );
        let stepY = ( maxY - minY ) / ( itY - 1 );

        let positions = this.getAxisPositions(instance, itX, itY);
        let colors = this.getAxisColors(instance, itX + itY, color);

	let labelsCount = this.getLabelsCount()
        if ( labelsCount == 0 )
        {
            for ( let i = 0; i < itX; i++ ) 
            {
                let label = new GLabel( 'lighter', 10,'Segoe UI Light', 0, 0, 128, 128 );

                label.setX( instance.calcRX( positions[12 + i * 6 + 0] ) );
                label.setY( instance.calcRY( positions[12 + i * 6 + 1] ) + 4 );
                label.setDuty( true );

                this.appendLabel( label );
            }
            for ( let i = 0; i < itY; i++ ) 
            {
                let label = new GLabel( 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );

                label.setX( instance.calcRX( positions[12 + (itX + i) * 6 + 0] ) + 4);
                label.setY( instance.calcRY( positions[12 + (itX + i) * 6 + 1] ) );
                label.setDuty( true );

                this.appendLabel( label );
            }
        }
        let itL = 0;
        let storedDesc = null;
        for ( let i = 0; i < itX; i++ ) 
        {
            let stringValue = '';
            let numberValue = ( minX + ( stepX * i ) );
            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';
            if ( i != ( itX - 1 ) / 2 ) 
            {
		        let oldDesc = storedDesc;
                let textOut = stringValue + numberValue.toFixed(2).toString();
	            let textColor = 'rgba(255, 255, 255, 0.6)';
	            let backgroundColor = 'rgba(0, 0, 0, 1.0)';
		        let objectLabel = this.getLabelAt( itL );
                let newDesc = await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, true );
		        if ( newDesc != null ) {
                    if ( oldDesc == null ) oldDesc = newDesc;
                    if ( ( oldDesc == newDesc ) || 
                        ( ( newDesc.x - oldDesc.x ) > ( 2 * newDesc.width ) && 
                        ( newDesc.x + newDesc.width < this.getX() + this.getWidth() ) ) ) 
                    {
                        await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, false );
                        storedDesc = newDesc;
		            }
                }
            }
            itL++;
        }
	    storedDesc = null;
        for ( let i = 0; i < itY; i++ ) 
        {
            let stringValue = '';
            let numberValue = ( maxY - ( stepY * i ) );
            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';
            if ( i != ( itY - 1 ) / 2 ) 
            {
                let oldDesc = storedDesc;
                let textOut = stringValue + numberValue.toFixed(2).toString();
                let textColor = 'rgba(255, 255, 255, 0.6)';
                let backgroundColor = 'rgba(0, 0, 0, 1.0)';
                let objectLabel = this.getLabelAt( itL );
                let newDesc = await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, true );
                if ( newDesc != null ) 
                {
                    if ( ( ( newDesc.y - this.getY() ) > ( newDesc.height ) ) &&
                            ( ( this.getHeight() + this.getY() - newDesc.y ) > ( newDesc.height ) ) )
                    {
                            objectLabel.setY( newDesc.y - newDesc.height / 2 - 1 );
                            await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, false );
                            objectLabel.setY( newDesc.y );
                            storedDesc = newDesc;
                    }
                }
            }
            itL++;
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
    async functionSimpleDraw( instance, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        await this.functionDraw( instance, this.getMinX(), this.getMaxX(), this.getItX(), func, color );
    }
    async functionDraw( instance, minX, maxX, itX, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        let origWidth = this.getWidth() - 2;
        let origHeight = this.getHeight() - 2;

//////////////////////////////////////////////////////
//	let wOffset = this.getMinX() - minX;
//////////////////////////////////////////////////////

        let maxXX = ( maxX < this.getMaxX() ) ? maxX : this.getMaxX();
        let minXX = ( minX > this.getMinX() ) ? minX : this.getMinX();

        let drawWidth = maxXX - minXX;

        let wholeWidth = this.getMaxX() - this.getMinX();
        let wholeHeight = this.getMaxY() - this.getMinY();

        let itL = itX | 1;

        let wStep = drawWidth / ( itL - 1 );

        let floatX = 0.0;
        let floatY = 0.0;

        this.clearItems();

        for ( let i = 0; i < ( itL - 1); i++ ) 
        {  
            /////////////////////////////////////////////////////////////////////
            // рисование точки
            /////////////////////////////////////////////////////////////////////
            floatX = i * wStep + minXX;
            floatY = func( floatX );

            /////////////////////////////////////////////////////////////////////////////
            // axis coordinates in center
            /////////////////////////////////////////////////////////////////////////////
            let floatXX = floatX - this.getMinX();
            let floatYY = floatY - this.getMinY();

            let realX = instance.calcScale( origWidth, wholeWidth, floatXX );
            let realY = origHeight - instance.calcScale( origHeight, wholeHeight, floatYY );

            this.appendItem( instance, [ realX, realY, 0.0 ], color );

            floatX = ( i + 1 ) * wStep + minXX;
            floatY = func( floatX );

            /////////////////////////////////////////////////////////////////////////////
            // axis coordinates in center
            /////////////////////////////////////////////////////////////////////////////
            floatXX = floatX - this.getMinX();
            floatYY = floatY - this.getMinY();

            realX = instance.calcScale( origWidth, wholeWidth, floatXX );
            realY = origHeight - instance.calcScale( origHeight, wholeHeight, floatYY );

            this.appendItem( instance, [ realX, realY, 0.0 ], color );

            /////////////////////////////////////////////////////////////////////
            // рисование точки
            /////////////////////////////////////////////////////////////////////
            this.appendItem( instance, [ realX - 1, realY + 1, 0.0 ], color );
            this.appendItem( instance, [ realX - 1, realY - 1, 0.0 ], color );
            this.appendItem( instance, [ realX - 1, realY - 1, 0.0 ], color );
            this.appendItem( instance, [ realX + 1, realY - 1, 0.0 ], color );
            this.appendItem( instance, [ realX + 1, realY - 1, 0.0 ], color );
            this.appendItem( instance, [ realX + 1, realY + 1, 0.0 ], color );
            this.appendItem( instance, [ realX + 1, realY + 1, 0.0 ], color );
            this.appendItem( instance, [ realX - 1, realY + 1, 0.0 ], color );
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