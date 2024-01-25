import { wDObject } from './object.mjs';
import { wDLabel } from './label.mjs';

export class wDSpline extends wDObject
{
    constructor( instance, x, y, _width, _height ) 
    {
        super( instance, x, y, _width, _height );
        this.setMinX( -Math.PI );
        this.setMinY( -1 );
        this.setMaxX( +Math.PI );
        this.setMaxY( +1 );
        this.setItX( 58 );
        this.setItY( 20 );
        this.clearItems();
        this.setColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setShaderBindGroup( null );
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
        this.setShaderBindGroup( null );
        this.setDuty( true );
    }
    async init() 
    {
        let instance = this.getInstance();
        this.setShaderBindGroup( null );
        this.setUniformShaderLocation( 
            this.setUniformShaderFlag( instance.device, 0 ) 
        );
        this.setDuty( false );
    }
    setItX( itX )
    { 
        this.itX = itX; 
    }
    getItX()
    { 
        return this.itX; 
    }
    setItY( itY )
    { 
        this.itY = itY; 
    }
    getItY()
    { 
        return this.itY; 
    }
    setMinX( x )
    { 
        this.minX = x; 
    }
    getMinX()
    { 
        return this.minX; 
    }
    setMaxX( x )
    { 
        this.maxX = x; 
    }
    getMaxX()
    { 
        return this.maxX; 
    }
    setMinY( y )
    { 
        this.minY = y; 
    }
    getMinY()
    { 
        return this.minY; 
    }
    setMaxY( y )
    { 
        this.maxY = y; 
    }
    getMaxY()
    { 
        return this.maxY; 
    }
    setShaderBindGroup( shaderBind ) 
    {
        this.shaderBindGroup = shaderBind;
    }
    getShaderBindGroup() 
    {
        return this.shaderBindGroup;
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
        let vpositions = new Float32Array(this.positions.length + position.length);
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
        var objectWidth = this.getWidth() - 1;	        // [ 1; width - 1 ]
        var objectHeight = this.getHeight() - 1;	// [ 1; height - 1 ]
        var offsetX = this.getX() + 1;
        var offsetY = this.getY() + 1;
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
    getBorderColors( instance ) 
    {
        const now = new Date().getTime();

        var g1 = Math.cos( now / 1000 + 2.0 * Math.PI * 1.0 / 4.0  );
        var g2 = Math.cos( now / 1000 + 2.0 * Math.PI * 2.0 / 4.0 );
        var g3 = Math.cos( now / 1000 + 2.0 * Math.PI * 3.0 / 4.0 );
        var g4 = Math.cos( now / 1000 + 2.0 * Math.PI * 4.0 / 4.0 );

        var defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0, 1.0 ];
        var defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0, 1.0 ];
        var defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5, 1.0 ];
        var defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0, 1.0 ];   

        var objectIndex = 0;
        var borderColors = new Float32Array( 32 );

        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor1[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor2[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor2[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor3[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor3[i];            
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor4[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor4[i];
        for ( var i = 0; i < 4; i++ ) borderColors[objectIndex++] = defaultColor1[i];

        return borderColors;
    }
    getAxisPositions( instance, iterationsX, iterationsY )
    {
        //////////////////////////////////////////////////
        // количество линий
        //////////////////////////////////////////////////
        var itX = iterationsX | 1;
        var itY = iterationsY | 1;
	// [ 2; width - 3 ]

        var objectWidth = this.getWidth() - 3; // 3 border size
        var objectHeight = this.getHeight() - 3; // 3 border size

        var offsetX = this.getX() + 2; // 2 border size
        var offsetY = this.getY() + 2; // 2 border size

        var stepX = objectWidth / ( itX - 1 );
        var stepY = objectHeight / ( itY - 1 ) ;

        var objectIndex = 0;
        var axisPositions = new Float32Array( 3 * ( ( itX + itY + 2 ) * 2 ) );

        for ( var i = 0; i < 3 * 4; i++ ) {
            axisPositions[objectIndex++] = [
                instance.calcX( ( objectIndex == 0 ) ? offsetX - 1 : offsetX ), instance.calcY( offsetY + objectHeight / 2 ), 0.0,
                instance.calcX( objectWidth + offsetX ), instance.calcY( offsetY + objectHeight / 2 ), 0.0,
                instance.calcX( objectWidth / 2 + offsetX ), instance.calcY( offsetY ), 0.0,
                instance.calcX( objectWidth / 2 + offsetX ), instance.calcY( objectHeight + offsetY ), 0.0 
            ][i];
        }
        for ( var i = 0; i < itX; i++ ) {
            for ( var j = 0; j < 6; j++ ) {
                axisPositions[objectIndex++] = [ 
                    instance.calcX( i * stepX + offsetX ), instance.calcY( objectHeight / 2 + offsetY - 1 ), 0.0,
                    instance.calcX( i * stepX + offsetX ), instance.calcY( objectHeight / 2 + offsetY + 2 ), 0.0 
                ][j];
            }
        }
        for ( var i = 0; i < itY; i++ ) { 
            for ( var j = 0; j < 6; j++ ) {
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
        var it = iterations;
        var axisColors = new Float32Array( 4 * ( ( it + 2 ) * 2 ) );
        var objectIndex = 0;
        for ( var i = 0; i < ( it + 2 ) * 2; i++ ) {
            for ( var j = 0; j < 4; j++ ) 
                axisColors[objectIndex++] = color[j];
        }
        return axisColors;
    }
	
    async draw( instance, minX, minY, maxX, maxY, itX, itY, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        await this.borderDraw( instance, minX, minY, maxX, maxY, itX, itY, color );
        await this.axisDraw( instance, minX, maxX, itX, minY, maxY, itY, color );
    }

    async borderDraw( instance, minX, minY, maxX, maxY, itX, itY, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        //////////////////////////////////
        // set border initial values
        //////////////////////////////////
        this.setMinX( minX );
        this.setMinY( minY );
        this.setMaxX( maxX );
        this.setMaxY( maxY );
        this.setItX( itX );
        this.setItY( itY );
        ////////////////////////////////////////////////////////////////
        // recreate border buffers
        ////////////////////////////////////////////////////////////////
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
        ////////////////////////////////////////////////////////////////
        // create border buffers if not created
        ////////////////////////////////////////////////////////////////
        let borderPositionsBuffer = this.getBorderPositionsBuffer();
        if ( borderPositionsBuffer == null ) {
            borderPositionsBuffer = instance.createBuffer( this.getBorderPositions( instance ), GPUBufferUsage.VERTEX, instance.device );
            this.setBorderPositionsBuffer( borderPositionsBuffer );
        }
        ////////////////////////////////////////////////////////////////
        // recreate border colors buffer ( animation )
        ////////////////////////////////////////////////////////////////
        this.setBorderColorsBuffer( null );
        let borderColorsBuffer = instance.createBuffer( this.getBorderColors( instance ), GPUBufferUsage.VERTEX, instance.device );
        this.setBorderColorsBuffer( borderColorsBuffer );

        let shaderBindGroup = this.getShaderBindGroup();
	    if ( shaderBindGroup == null ) {
		    shaderBindGroup = instance.device.createBindGroup( {
			    layout: instance.pipeline.getBindGroupLayout(0),
			    entries: [ {
				    binding: 0,
				    resource: {
					    buffer: this.uniformlShaderLocation
    				}
	    		} ]
		    } );
		    this.setShaderBindGroup( shaderBindGroup );
        }

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );
        instance.passEncoder.setVertexBuffer(0, borderPositionsBuffer );
        instance.passEncoder.setVertexBuffer(1, borderColorsBuffer );
        instance.passEncoder.draw( 8, 1, 0, 0 );
    }

    async axisDraw( instance, minX, minY, maxX, maxY, itX, itY, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        //////////////////////////////////
        // draw axis
        //////////////////////////////////        
        var itX = itX | 1;
        var itY = itY | 1;

        var stepX = ( maxX - minX ) / ( itX - 1 );
        var stepY = ( maxY - minY ) / ( itY - 1 );

        var positions = this.getAxisPositions(instance, itX, itY);
        var colors = this.getAxisColors(instance, itX + itY, color);

        var labelsCount = this.getLabelsCount();
        if ( labelsCount == 0 )
        {
            for ( var i = 0; i < itX; i++ ) 
            {
                var label = new wDLabel( 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );

                label.setX( instance.calcRX( positions[12 + i * 6 + 0] ) + 0 );
                label.setY( instance.calcRY( positions[12 + i * 6 + 1] ) + 4 );
                label.setDuty( true );

                this.appendLabel( label );
            }
            for ( var i = 0; i < itY; i++ ) 
            {
                var label = new wDLabel( 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );

                label.setX( instance.calcRX( positions[12 + (itX + i) * 6 + 0] ) + 4 );
                label.setY( instance.calcRY( positions[12 + (itX + i) * 6 + 1] ) + 0 );
                label.setDuty( true );

                this.appendLabel( label );
            }
        }
        var itL = 0;
        var storedDesc = null;
        for ( var i = 0; i < itX; i++ ) 
        {
            var stringValue = '';
            var numberValue = ( minX + ( stepX * i ) );

            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';

            if ( i != ( itX - 1 ) / 2 ) 
            {
		var oldDesc = storedDesc;
                var textOut = stringValue + numberValue.toFixed(2).toString();
	        var textColor = 'rgb(255, 255, 255)';
	        var backgroundColor = 'rgb(0, 0, 0)';
		var objectLabel = this.getLabelAt( itL );
                var newDesc = await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, true );
		if ( newDesc != null ) 
                {
                    if ( oldDesc == null ) oldDesc = newDesc;
                    if (( oldDesc == newDesc ) || (( newDesc.x - oldDesc.x ) > ( 2 * newDesc.width ) && 
                        ( newDesc.x + newDesc.width < this.getX() + this.getWidth() ))) 
                    {
                        await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, false );
                        storedDesc = newDesc;
                    }
                }
            }
            itL++;
        }
        storedDesc = null;
        for ( var i = 0; i < itY; i++ ) 
        {
            var stringValue = '';
            var numberValue = ( maxY - ( stepY * i ) );

            ////////////////////////////////
            // value sign		
            ////////////////////////////////
            ( numberValue > 0 ) ? stringValue = '+' : stringValue = '';

            if ( i % 4 == 0 )
	    {
                    var oldDesc = storedDesc;
                    var textOut = stringValue + numberValue.toFixed(2).toString();
                    var textColor = 'rgb(255, 255, 255)';
	            var backgroundColor = 'rgb(0, 0, 0)';
                    var objectLabel = this.getLabelAt( itL );
                    var newDesc = await objectLabel.draw( instance, textColor, backgroundColor, textOut, true, true );
                    if ( newDesc != null ) 
                    {
                        if ((( newDesc.y - this.getY() ) > ( newDesc.height )) && (( this.getHeight() + this.getY() - newDesc.y ) > ( newDesc.height )))
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
        var axisPositionsBuffer = this.getAxisPositionsBuffer();
        if ( axisPositionsBuffer == null ) {
            axisPositionsBuffer = instance.createBuffer(positions, GPUBufferUsage.VERTEX, instance.device);
            this.setAxisPositionsBuffer( axisPositionsBuffer );
        }
        var axisColorsBuffer = this.getAxisColorsBuffer();
        if ( axisColorsBuffer == null ) {
            axisColorsBuffer = instance.createBuffer(colors, GPUBufferUsage.VERTEX, instance.device);
            this.setAxisColorsBuffer( axisColorsBuffer );
        }
        var vertexCount = positions.length / 3;
        
        let shaderBindGroup = this.getShaderBindGroup();
	    if ( shaderBindGroup == null ) {
		    shaderBindGroup = instance.device.createBindGroup( {
			    layout: instance.pipeline.getBindGroupLayout(0),
			    entries: [ {
				    binding: 0,
				    resource: {
					    buffer: this.uniformlShaderLocation
    				}
	    		} ]
		    } );
		    this.setShaderBindGroup( shaderBindGroup );
        }

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );

        instance.passEncoder.setVertexBuffer(0, axisPositionsBuffer);
        instance.passEncoder.setVertexBuffer(1, axisColorsBuffer);
        instance.passEncoder.draw( vertexCount, 1, 0, 0 );
    }
    async functionSimpleDraw( instance, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        this.functionDraw( instance, this.getMinX(), this.getMaxX(), true, this.getItX(), func, color );
    }
    async functionDraw( instance, minX, maxX, itX, points, func, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        var origWidth = this.getWidth() - 2;
        var origHeight = this.getHeight() - 2;

//////////////////////////////////////////////////////
//	let wOffset = this.getMinX() - minX;
//////////////////////////////////////////////////////

        var maxXX = ( maxX < this.getMaxX() ) ? maxX : this.getMaxX();
        var minXX = ( minX > this.getMinX() ) ? minX : this.getMinX();
        
        var drawWidth = maxXX - minXX;

        var wholeWidth = this.getMaxX() - this.getMinX();
        var wholeHeight = this.getMaxY() - this.getMinY();

        var itL = itX | 1;

        var wStep = drawWidth / ( itL - 1 );

        var floatX = 0.0;
        var floatY = 0.0;

        this.clearItems();

        for ( var i = 0; i < ( itL - 1); i++ ) 
        {  
            /////////////////////////////////////////////////////////////////////
            // рисование точки
            /////////////////////////////////////////////////////////////////////
            floatX = i * wStep + minXX;
            floatY = func( floatX );

            /////////////////////////////////////////////////////////////////////////////
            // axis coordinates in center
            /////////////////////////////////////////////////////////////////////////////
            var floatXX = floatX - this.getMinX();
            var floatYY = floatY - this.getMinY();

            var realX = instance.calcScale( origWidth, wholeWidth, floatXX );
            var realY = origHeight - instance.calcScale( origHeight, wholeHeight, floatYY );

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
            if ( points == true ) {
                this.appendItem( instance, [ realX - 1, realY + 1, 0.0 ], color );
                this.appendItem( instance, [ realX - 1, realY - 1, 0.0 ], color );
                this.appendItem( instance, [ realX - 1, realY - 1, 0.0 ], color );
                this.appendItem( instance, [ realX + 1, realY - 1, 0.0 ], color );
                this.appendItem( instance, [ realX + 1, realY - 1, 0.0 ], color );
                this.appendItem( instance, [ realX + 1, realY + 1, 0.0 ], color );
                this.appendItem( instance, [ realX + 1, realY + 1, 0.0 ], color );
                this.appendItem( instance, [ realX - 1, realY + 1, 0.0 ], color );
            }
        }

        var positions = this.getPositions(instance);
        var colors = this.getColors(instance);

        //let positionsBuffer = this.getPositionsBuffer();

        var newPositionsBuffer = instance.createBuffer(positions, GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push(newPositionsBuffer);
        //this.setPositionsBuffer( newPositionsBuffer );
        //let colorsBuffer = this.getColorsBuffer();

        var newColorsBuffer = instance.createBuffer(colors, GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push(newColorsBuffer);
        //this.setColorsBuffer( newColorsBuffer );

        var vertexCount = positions.length / 3;

        instance.passEncoder.setPipeline( instance.linePipeline );
        instance.passEncoder.setVertexBuffer( 0, newPositionsBuffer );
        instance.passEncoder.setVertexBuffer( 1, newColorsBuffer );
        instance.passEncoder.draw( vertexCount, 1, 0, 0 );
    }
};