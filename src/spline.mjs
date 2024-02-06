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
    }  

    destroy()
    {        
        this.axis.destroy();
        this.lines.destroy();
        this.border.destroy();

        this.clearLabels();
        this.setDuty( true );
    }

    async init() 
    {
        let instance = this.getInstance();
        
        this.border = new wDBox( instance );
        await this.border.init();

        this.axis = new wDLine( instance );
        await this.axis.init();

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

    setShaderBindGroup( shaderBind ) 
    {
        this.shaderBindGroup = shaderBind;
    }

    getShaderBindGroup() 
    {
        return this.shaderBindGroup;
    }

    setItX( itX ) { 
        this.itX = itX; 
    }

    getItX() { 
        return this.itX; 
    }

    setItY( itY ) { 
        this.itY = itY; 
    }

    getItY() { 
        return this.itY; 
    }

    setMinX( x ) { 
        this.minX = x; 
    }

    getMinX() { 
        return this.minX; 
    }

    setMaxX( x ) { 
        this.maxX = x; 
    }

    getMaxX() { 
        return this.maxX; 
    }

    setMinY( y ) { 
        this.minY = y; 
    }

    getMinY() { 
        return this.minY; 
    }

    setMaxY( y ) { 
        this.maxY = y; 
    }

    getMaxY() { 
        return this.maxY; 
    }

    getLabelsCount() {
        return this.labels.length;
    }

    getLabelAt( index ) {
        return this.labels[ index ];
    }

    appendToLabels( label ) {
        this.labels.push( label );
    }

    clearLabels()
    {
        let l = this.labels.length;
        if ( l > 0 ) {
            for ( let i = l - 1; i >= 0; i-- ) 
                this.labels[i].destroy();
        }
        this.labels = [];
    }    

    async draw( instance, object, samplerate, volumerate, kdX, kdY, zoomX, zoomY, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        await this.borderDraw( instance, this.getX(), this.getY(), this.getWidth(), this.getHeight(), _t, colors );
        await this.axisDraw( instance, samplerate, volumerate, this.getX(), this.getY(), this.getWidth(), this.getHeight(), kdX, kdY, zoomX, zoomY, _t, colors );
        if ( object.draw.length > 0 )
            for ( let i = 0; i < object.draw.length; i++ )
                await this.functionDraw( instance, object.draw[i] );
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

        ////////////////////////////////////////////////////////////////////////
        // _samplerate: 44100 - 1s           
        ////////////////////////////////////////////////////////////////////////
        // let sX = 2.0 * _samplerate / kdX;
        ////////////////////////////////////////////////////////////////////////

        let tX = 2.0 / kdX;
        let sX = tX * _samplerate;
        let vY = 2.0 * _volumerate / kdY;

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
            this.axis.clear();
            this.axis.setDuty( flag );

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

            let stepX = ( cX > 65 ) ? 1 : ( 65 / cX ) + 1;
            let stepY = ( cY > 25 ) ? 1 : ( 25 / cY ) + 1;

            ////////////////////////////////////////////////////////////////////
            // x: axis
            ////////////////////////////////////////////////////////////////////
            this.axis.append( 
                x + offX, 
                y + _height / 2.0,
                x - offX + _width,
                y + _height / 2.0,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // y: axis
            ////////////////////////////////////////////////////////////////////
            this.axis.append( 
                x + _width / 2.0, 
                y + offY,
                x + _width / 2.0,
                y - offY + _height,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // x: delimeters
            ////////////////////////////////////////////////////////////////////
            for ( let i = stepX; i < kdX / 2.0; i = i + stepX ) 
            {
                if ( ( x + _width / 2.0 + i * cX ) > _width ) 
                    continue;

                if ( ( x + _width / 2.0 - i * cX ) < x ) 
                    continue;
                    
                this.axis.append( 
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 - 5,
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 + 5,
                    _t, colors[0] );   
    
                let Llabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();
        
                Llabel.set( 10, x + _width / 2.0 - i * cX, y + _height / 2.0 );
                Llabel.draw( instance, textColor, backgroundColor, (-i * sX).toFixed(0) + "(" + ( i * tX ).toFixed(3) + ")", true, true );
    
                let _w = Llabel.getWidth();
                let _h = Llabel.getHeight();
                let _y = Llabel.getY();
                let _x = Llabel.getX();

                Llabel.setY( _y + 6 );
                Llabel.setX( _x );
    
                this.appendToLabels( Llabel );  

                this.axis.append( 
                    x + _width / 2.0 + i * cX, 
                    y + _height / 2.0 - 5,
                    x + _width / 2.0 + i * cX, 
                    y + _height / 2.0 + 5,
                    _t, colors[0] );    

                let Rlabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( 10, x + _width / 2.0 + i * cX, y + _height / 2.0 );
                Rlabel.draw( instance, textColor, backgroundColor, (i * sX).toFixed(0) + "(" + ( i * tX ).toFixed(3) + ")", true, true );
                
                _w = Rlabel.getWidth();
                _h = Rlabel.getHeight();
                _y = Rlabel.getY();
                _x = Rlabel.getX();

                Rlabel.setY( _y - _h - 6 );
                Rlabel.setX( _x - _w );

                this.appendToLabels( Rlabel );       
            }

            ////////////////////////////////////////////////////////////////////
            // y: delimeters
            ////////////////////////////////////////////////////////////////////
            for ( let i = stepY; i < kdY / 2.0; i = i + stepY ) 
            {
                if ( ( y + _height / 2.0 + i * cY ) > _height ) 
                    continue;

                if ( ( y + _height / 2.0 - i * cY ) < y ) 
                    continue;

                this.axis.append( 
                    x + _width / 2.0 - 5, 
                    y + _height / 2.0 + i * cY,
                    x + _width / 2.0 + 5, 
                    y + _height / 2.0 + i * cY,
                    _t, colors[0] ); 
                    
                let Rlabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( 10, x + _width / 2.0, y + _height / 2.0 + i * cY );
                Rlabel.draw( instance, textColor, backgroundColor, (-i * vY ).toFixed(3), true, true );

                let _h = Rlabel.getHeight();
                let _w = Rlabel.getWidth();
                let _x = Rlabel.getX();
                let _y = Rlabel.getY();
                Rlabel.setX( _x + 6 );
                Rlabel.setY( _y - _h );

                this.appendToLabels( Rlabel );

                this.axis.append( 
                    x + _width / 2.0 - 5, 
                    y + _height / 2.0 - i * cY,
                    x + _width / 2.0 + 5, 
                    y + _height / 2.0 - i * cY,
                    _t, colors[0] ); 

                let Llabel = new wDLabel( instance, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();

                Llabel.set( 10, x + _width / 2.0, y + _height / 2.0 - i * cY );
                Llabel.draw( instance, textColor, backgroundColor, (i * vY).toFixed(3), true, true );

                _h = Llabel.getHeight();
                _w = Llabel.getWidth();
                _x = Llabel.getX();
                _y = Llabel.getY();
                Llabel.setX( _x - _w - 6 );
                Llabel.setY( _y );

                this.appendToLabels( Llabel );
            }
        }

        await this.axis.draw( instance );

        let count = this.getLabelsCount();
        for ( let i = 0; i < count; i++ ) {
            await this.getLabelAt( i ).render( instance );
        }
    }

    async functionDraw( instance, _d ) 
    {
        let _axis = _d.axis;
        let _ac = _d.coords.color;

        let _dp = _d.dpoints;
        let _dc = _d.color;

        let _func = _d.func;

        let _xmin = _d.coords.x.min;
        let _xmax = _d.coords.x.max;
        let _xdpr = _d.coords.x.dprepeats;

        let _ymin = _d.coords.y.min;
        let _ymax = _d.coords.y.max;
        let _ydpr = _d.coords.y.dprepeats;

        

    }
};