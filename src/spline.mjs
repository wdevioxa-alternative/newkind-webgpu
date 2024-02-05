import { wDObject } from './object.mjs';
import { wDLabel } from './label.mjs';
import { wDBox } from './box.mjs';
import { wDLine } from './line.mjs';

export class wDSpline extends wDObject
{
    constructor( instance, x, y, _width, _height, _weight = 1 ) 
    {
        super( instance, x, y, _width, _height, _weight );
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
    }  
    destroy()
    {
        this.clearLabels();
        
        this.border.destroy();
        this.lines.destroy();

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
        
        this.border = new wDBox( instance );
        await this.border.init();

        this.lines = new wDLine( instance );
        await this.lines.init();

        this.labels = [];

        this.defaultcolor = 0.1;
        this.coloriteration = 0.01;

        this.setShaderBindGroup( null );
        this.setUniformShaderLocation( 
            this.setUniformShaderFlag( instance.device, 0 ) 
        );

        this.setDuty( false );
    }
    set( x, y, _width = -1, _height = -1, _weight = -1 )
    {
        if ( this.getX() != x ) {
            this.setX( x );
            this.setDuty( true );
        }
        if ( this.getY() != y ) {
            this.setY( y );
            this.setDuty( true );
        }
        if ( _width != -1 ) {
            if ( this.getWidth() != _width ) {
                this.setWidth( _width );
                this.setDuty( true );
            }
        }
        if ( _height != -1 ) { 
            if ( this.getHeight() != _height ) {
                this.setHeight( _height );
                this.setDuty( true );
            }
        }
        if ( _weight != -1 ) { 
            if ( this.getWeight() != _weight ) {
                this.setWeight( _weight );
                this.setDuty( true );
            }
        }
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
        return this.labels.length;
    }
    getLabelAt( objectIndex ) {
        return this.labels[ objectIndex ];
    }
    appendLabel( label ) {
        this.labels.push( label );
        return this.labels.length;
    }
    clearLabels()
    {
        let l = this.labels.length;
        for ( let i = l - 1; i >= 0; i-- ) 
            this.labels[i].destroy();
        this.labels = [];
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
    getAxisPositions( instance, itX, itY )
    {
        //////////////////////////////////////////////////
        // количество линий
        //////////////////////////////////////////////////
        itX = itX | 1;
        itY = itY | 1;
	// [ 2; width - 3 ]

        let objectWidth = this.getWidth() - 3; // 3 border size
        let objectHeight = this.getHeight() - 3; // 3 border size

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
	
    async draw( instance, samplerate, volumerate, kdX, kdY, zoomX, zoomY, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        await this.borderDraw( instance, this.getX(), this.getY(), this.getWidth(), this.getHeight(), _t, colors );
        await this.axisDraw( instance, samplerate, volumerate, this.getX(), this.getY(), this.getWidth(), this.getHeight(), kdX, kdY, zoomX, zoomY, _t, colors );
    }

    async borderDraw( instance, x, y, _width, _height, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        this.border.set( x, y, _width, _height, _t );

        this.defaultcolor += this.coloriteration;

        if ( this.defaultcolor >= 1.0 ) {
            this.coloriteration = -0.01;
            this.defaultcolor = 1.0;
        } else if ( this.defaultcolor < 0 ) { 
            this.coloriteration = +0.01; 
            this.defaultcolor = 0;
        }

        await this.border.draw( instance, 
        [   
            { from: [ this.defaultcolor, 1.0 - this.defaultcolor, this.defaultcolor, 1.0 ], to: [ 1.0 - this.defaultcolor, this.defaultcolor, 1.0 - this.defaultcolor, 1.0 ] },
            { from: [ 1.0 - this.defaultcolor, this.defaultcolor, 1.0 - this.defaultcolor, 1.0 ], to: [ this.defaultcolor, 1.0 - this.defaultcolor, this.defaultcolor, 1.0 ] },
            { from: [ this.defaultcolor, 1.0 - this.defaultcolor, this.defaultcolor, 1.0 ], to: [ 1.0 - this.defaultcolor, this.defaultcolor, 1.0 - this.defaultcolor, 1.0 ] },
            { from: [ 1.0 - this.defaultcolor, this.defaultcolor, 1.0 - this.defaultcolor, 1.0 ], to: [ this.defaultcolor, 1.0 - this.defaultcolor, this.defaultcolor, 1.0 ] } 
        ] );
    }

    async axisDraw( instance, _samplerate, _volumerate, x, y, _width, _height, kdX, kdY, zoomX, zoomY, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        let kX = zoomX / 100.0;
        let kY = zoomY / 100.0;

        let cX = _width * kX / kdX;
        let cY = _height * kY / kdY;

        let sX = 2.0 * _samplerate / kdX
        let vY = 2.0 * _volumerate / kdY

        if ( this.vY == undefined || this.vY != vY ) {
            this.vY = vY;
            this.setDuty( true );
        }

        if ( this.sX == undefined || this.sX != sX ) {
            this.sX = sX;
            this.setDuty( true );
        } 

        if ( this.cX == undefined || this.cX != cX ) {
            this.cX = cX;
            this.setDuty( true );
        }

        if ( this.cY == undefined || this.cY != cY ) {
            this.cY = cY;
            this.setDuty( true );
        } 

        let flag = this.isDuty();

        if ( flag == true ) 
        {
            this.lines.clear();
            this.lines.setDuty( flag );

            this.clearLabels();
            this.setDuty( false );

            let textColor = "rgba(255, 255, 255, 1.0)";
            let backgroundColor = "rgba(0, 0, 0, 1.0)";

            let offX = 10.0;
            let offY = 10.0;

            if ( colors.length == 1 )
            {
                colors.push( colors[0] );
            }

            let stepX = ( cX > 50 ) ? 1 : ( 50 / cX ) + 1;
            let stepY = ( cY > 20 ) ? 1 : ( 20 / cY ) + 1;

            ////////////////////////////////////////////////////////////////////
            // x axis
            this.lines.append( 
                x + offX, 
                y + _height / 2.0,
                x - offX + _width,
                y + _height / 2.0,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // y axis
            this.lines.append( 
                x + _width / 2.0, 
                y + offY,
                x + _width / 2.0,
                y - offY + _height,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // x delimeters
            for ( let i = stepX; i < kdX / 2.0; i = i + stepX ) 
            {
                if ( ( x + _width / 2.0 + i * cX ) > _width - cX * 1.5 ) 
                    continue;

                if ( ( x + _width / 2.0 - i * cX ) < x ) 
                    continue;
                    
                this.lines.append( 
                    x + _width / 2.0 + i * cX, 
                    y + _height / 2.0 - 5,
                    x + _width / 2.0 + i * cX, 
                    y + _height / 2.0 + 5,
                    _t, colors[0] );    

                let Rlabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( 10, x + _width / 2.0 + i * cX, y + _height / 2.0 + 10 );
                Rlabel.draw( instance, textColor, backgroundColor, (i * sX).toFixed(1), true, true );
                
                let _w = Rlabel.getWidth();
                let _x = Rlabel.getX();
                Rlabel.setX( _x - _w / 2.0 );

                this.appendLabel( Rlabel );

                this.lines.append( 
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 - 5,
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 + 5,
                    _t, colors[0] );   

                let Llabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();
    
                Llabel.set( 10, x + _width / 2.0 - i * cX, y + _height / 2.0 + 10 );
                Llabel.draw( instance, textColor, backgroundColor, (-i * sX).toFixed(1), true, true );

                _w = Llabel.getWidth();
                _x = Llabel.getX();
                Llabel.setX( _x - _w / 2.0 );

                this.appendLabel( Llabel );                         
            }

            ////////////////////////////////////////////////////////////////////
            // y delimeters
            for ( let i = stepY; i < kdY / 2.0; i = i + stepY ) 
            {
                if ( ( y + _height / 2.0 + i * cY ) > _height ) 
                    continue;
                if ( ( y + _height / 2.0 - i * cY ) < y ) 
                    continue;

                this.lines.append( 
                    x + _width / 2.0 - 5, 
                    y + _height / 2.0 + i * cY,
                    x + _width / 2.0 + 5, 
                    y + _height / 2.0 + i * cY,
                    _t, colors[0] ); 
                    
                let Rlabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( 10, x + _width / 2.0 + 6, y + _height / 2.0 + i * cY );
                Rlabel.draw( instance, textColor, backgroundColor, (-i * vY ).toFixed(3), true, true );

                let _h = Rlabel.getHeight();
                let _y = Rlabel.getY();
                Rlabel.setY( _y - _h / 2.0 );

                this.appendLabel( Rlabel );

                this.lines.append( 
                    x + _width / 2.0 - 5, 
                    y + _height / 2.0 - i * cY,
                    x + _width / 2.0 + 5, 
                    y + _height / 2.0 - i * cY,
                    _t, colors[0] ); 

                let Llabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();

                Llabel.set( 10, x + _width / 2.0 + 6, y + _height / 2.0 - i * cY );

                Llabel.draw( instance, textColor, backgroundColor, (i * vY).toFixed(3), true, true );

                _h = Llabel.getHeight();
                _y = Llabel.getY();
                Llabel.setY( _y - _h / 2.0 );

                this.appendLabel( Llabel );
            }
        }

        await this.lines.draw( instance );

        let count = this.getLabelsCount();
        for ( let i = 0; i < count; i++ ) {
            await this.getLabelAt( i ).render( instance );
        }

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