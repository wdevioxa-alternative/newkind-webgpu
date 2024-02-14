import { wDObject } from './object.mjs';
import { wDLabel } from './label.mjs';
import { wDBox } from './box.mjs';
import { wDLine } from './line.mjs';
import { wDNativeLine } from './line-native.mjs';


export class wDSpline extends wDObject
{
    constructor( instance, x, y, _width, _height, _weight = 1 ) 
    {
        super( instance, x, y, _width, _height, _weight );

        this.setMinX( -Math.PI );
        this.setMinY( -1.0 );
        this.setMaxX( +Math.PI );
        this.setMaxY( +1.0 );
        this.setItX( 58 );
        this.setItY( 20 );

        this.fontsize = instance.getCanvasHeight() * 16 / 1366;
    }  

    destroy()
    {        
        this.border.destroy();
        this.clearLabels();
        this.axis.destroy();
        this.discretlines.destroy();
        this.setDuty();
    }

    async init() 
    {
        let instance = this.getInstance();
        
        this.border = new wDBox( instance );
        await this.border.init();

        this.axis = new wDNativeLine( instance );
        await this.axis.init();

        this.discretlines = new wDLine( instance );
        await this.discretlines.init();

        this.labels = [];

        this.defaultcolor = 0.1;
        this.itcolor = 0.01;

        this.setDuty();
    }

    set( x, y, _width = -1, _height = -1, _thickness = -1 )
    {
        if ( this.getX() != x ) {
            this.setX( x );
            this.setDuty();
        }
        if ( this.getY() != y ) {
            this.setY( y );
            this.setDuty();
        }
        if ( _width != -1 ) {
            if ( this.getWidth() != _width ) {
                this.setWidth( _width );
                this.setDuty();
            }
        }
        if ( _height != -1 ) { 
            if ( this.getHeight() != _height ) {
                this.setHeight( _height );
                this.setDuty();
            }
        }
        if ( _thickness != -1 ) { 
            if ( this.getThickness() != _thickness ) {
                this.setThickness( _thickness );
                this.setDuty();
            }
        }
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
            for ( let i = l - 1; i >= 0; i-- ) {
                this.labels[i].destroy();
            }
        }
        this.labels = [];
    }    

    async borderDraw( instance, x, y, _width, _height, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        this.border.set( x, y, _width, _height, _t );

        this.defaultcolor += this.itcolor;

        if ( this.defaultcolor >= 1.0 ) {
            this.itcolor = -0.01;
            this.defaultcolor = 1.0;
        } else if ( this.defaultcolor < 0 ) { 
            this.itcolor = +0.01; 
            this.defaultcolor = 0;
        }

        this.border.setDuty();

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

        if ( this.zoomX == undefined || this.zoomX != zoomX ) {
            this.zoomX = zoomX;
            this.setDuty();
        }

        if ( this.zoomY == undefined || this.zoomY != zoomY ) {
            this.zoomY = zoomY;
            this.setDuty();
        }

        if ( this.kdX == undefined || this.kdX != kdX ) {
            this.kdX = kdX;
            this.setDuty();
        }

        if ( this.kdY == undefined || this.kdY != kdY ) {
            this.kdY = kdY;
            this.setDuty();
        }

        if ( this.vY == undefined || this.vY != vY ) {
            this.vY = vY;
            this.setDuty();
        }

        if ( this.sX == undefined || this.sX != sX ) {
            this.sX = sX;
            this.setDuty();
        } 

        if ( this.cX == undefined || this.cX != cX ) {
            this.cX = cX;
            this.setDuty();
        }

        if ( this.cY == undefined || this.cY != cY ) {
            this.cY = cY;
            this.setDuty();
        } 

        let flag = this.isDuty();

        if ( flag == true ) 
        {
            this.axis.clear();
            this.clearLabels();

            let textColor = "rgba(255, 255, 255, 1.0)";
            let backgroundColor = "rgba(0, 0, 0, 1.0)";

            //let offX = 10.0;
            //let offY = 10.0;

            if ( colors.length == 1 )
            {
                colors.push( colors[0] );
            }

            let stepX = ( cX > this.fontsize * 8.0 ) ? 1 : ( this.fontsize * 8.0 / cX ) + 1;
            let stepY = ( cY > this.fontsize * 2.0 ) ? 1 : ( this.fontsize * 2.0 / cY ) + 1;

            ////////////////////////////////////////////////////////////////////
            // x: axis
            ////////////////////////////////////////////////////////////////////
            this.axis.append( 
                x, 
                y + _height / 2.0,
                x + _width,
                y + _height / 2.0,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // y: axis
            ////////////////////////////////////////////////////////////////////
            this.axis.append( 
                x + _width / 2.0, 
                y,
                x + _width / 2.0,
                y + _height,
                _t, colors[0] );

            ////////////////////////////////////////////////////////////////////
            // x: delimeters
            ////////////////////////////////////////////////////////////////////
            for ( let i = stepX; i < kdX / 2.0; i = i + stepX ) 
            {
                if ( ( x + _width / 2.0 + i * cX ) >= _width ) 
                    continue;

                if ( ( x + _width / 2.0 - i * cX ) <= x ) 
                    continue;
                    
                this.axis.append( 
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 - 5,
                    x + _width / 2.0 - i * cX, 
                    y + _height / 2.0 + 5,
                    _t, colors[0] );   
    
                let Llabel = new wDLabel( instance, 'lighter', this.fontsize, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();
        
                Llabel.set( this.fontsize, x + _width / 2.0 - i * cX, y + _height / 2.0 );
                Llabel.draw( instance, textColor, backgroundColor, ( -i * sX ).toFixed(0) + "(" + ( i * tX ).toFixed(3) + ")", true, true );
    
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

                let Rlabel = new wDLabel( instance, 'lighter', this.fontsize, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( this.fontsize, x + _width / 2.0 + i * cX, y + _height / 2.0 );
                Rlabel.draw( instance, textColor, backgroundColor, ( i * sX ).toFixed(0) + "(" + ( i * tX ).toFixed(3) + ")", true, true );
                
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
                if ( ( y + _height / 2.0 + i * cY ) >= _height ) 
                    continue;

                if ( ( y + _height / 2.0 - i * cY ) <= y ) 
                    continue;

                this.axis.append( 
                    x + _width / 2.0 - 5, 
                    y + _height / 2.0 + i * cY,
                    x + _width / 2.0 + 5, 
                    y + _height / 2.0 + i * cY,
                    _t, colors[0] ); 
                    
                let Rlabel = new wDLabel( instance, 'lighter', this.fontsize, 'Segoe UI Light', 0, 0, 128, 128 );
                await Rlabel.init();

                Rlabel.set( this.fontsize, x + _width / 2.0, y + _height / 2.0 + i * cY );
                Rlabel.draw( instance, textColor, backgroundColor, ( -i * vY ).toFixed( 3 ), true, true );

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

                let Llabel = new wDLabel( instance, 'lighter', this.fontsize, 'Segoe UI Light', 0, 0, 128, 128 );
                await Llabel.init();

                Llabel.set( this.fontsize, x + _width / 2.0, y + _height / 2.0 - i * cY );
                Llabel.draw( instance, textColor, backgroundColor, ( i * vY ).toFixed( 3 ), true, true );

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

    async functionDraw( instance, _object, _samplerate, _volumerate, x, y, _width, _height, _t = 1 ) 
    {
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        // _samplerate: 44100 - 1s           
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        // let sX = 2.0 * _samplerate / kdX;
        // let sX = tX * _samplerate;
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

        if ( this.zoomX == undefined ) return;

        if ( this.zoomY == undefined ) return;

        if ( this.vY == undefined ) return;

        if ( this.sX == undefined ) return;

        if ( this.cX == undefined ) return;

        if ( this.cY == undefined ) return;

        if ( this.kdX == undefined ) return;

        if ( this.kdY == undefined ) return;

        let flag = this.isDuty();

        if ( flag == true )
        {
            let kX = this.zoomX / 100.0;
            let kY = this.zoomY / 100.0;

            //let offX = 10.0;
            //let offY = 10.0;

            ////////////////////////////////////////////////////////////////////////
            // let cX = _width * kX / kdX;  this.cX
            // let cY = _height * kY / kdY; this.cY
            ////////////////////////////////////////////////////////////////////////

            // let tX = 2.0 / this.kdX;

            // let sX = 2.0 * _samplerate / this.kdX;
            // let vY = 2.0 * _volumerate / this.kdY;

            let _vdp = ( _object.dpoints == undefined ) ? false : _object.dpoints;
            let _dpc = ( _object.dcolor == undefined ) ? [ 1.0, 1.0, 1.0, 1.0 ] : _object.dcolor;
            let _lgc = ( _object.coords.color == undefined ) ? [ 1.0, 1.0, 1.0, 1.0 ] : _object.coords.color;

            let dcolors = [ { from: _dpc, to: _dpc } ];
            let lcolors = [ { from: _lgc, to: _lgc } ];

            let _func = _object.func;

            let _x_min_ = _object.coords.x.min;
            let _x_max_ = _object.coords.x.max;

            ///////////////////////////////////////////////////////////////////
            // Количество отсчетов
            ///////////////////////////////////////////////////////////////////
            // let _xdp = _object.coords.x.dprepeats;
            // let _y_min_ = _object.coords.y.min;
            // let _y_max_ = _object.coords.y.max;
            ///////////////////////////////////////////////////////////////////

            let _rs_bx = undefined;
            let _rs_by = undefined;
            let _ls_bx = undefined;
            let _ls_by = undefined;
            let _i_last_bi = undefined;

            ///////////////////////////////////////////////////////////////////
            // Step in radians on x axis
            ///////////////////////////////////////////////////////////////////
            let _istep = ( _x_max_ - _x_min_ ) / this.kdX;

            ///////////////////////////////////////////////////////////////////
            // Step in pixels with scale on x and y axis
            ///////////////////////////////////////////////////////////////////
            //let cX = _width * kX / this.kdX;
            //let cY = _height * kY / this.kdY;

            let _centX = x + _width / 2.0;
            let _centY = y + _height / 2.0;

            for ( let i = 0; i < this.kdX / 2.0; i++ )
            {
                /////////////////////////////////////////////////
                // x and y: one step to right side 
                let _rs_ex = (+1) * _istep * i + _x_min_;
                let _rs_ey = _func( _rs_ex );

                /////////////////////////////////////////////////
                // x and y: one step to left side 
                let _ls_ex = (-1) * _istep * i + _x_min_;
                let _ls_ey = _func( _ls_ex );

                if ( _rs_bx == undefined || _rs_by == undefined || _ls_bx == undefined || _ls_by == undefined || _i_last_bi == undefined ) 
                {
                    _rs_bx = _rs_ex;
                    _rs_by = _rs_ey;
                    _ls_bx = _ls_ex;
                    _ls_by = _ls_ey;

                    _i_last_bi = i;
                    continue;
                }

                let _sc_rs_bx = _centX + _i_last_bi * _width * kX / this.kdX;
                let _sc_rs_by = _centY + _rs_by * _height * kY / 2.0; 

                let _sc_rs_ex = _centX + i * _width * kX / this.kdX;
                let _sc_rs_ey = _centY + _rs_ey * _height * kY / 2.0; 

                ///////////////////////////////////////////////////////////////////
                // console.log( "i: " + i + "; " + _x + ": " + _y );
                ///////////////////////////////////////////////////////////////////
                        
                // if ( _rs_sc_bx == _rs_sc_ex || _rs_sc_by == _rs_sc_ey ) console.log( "possible skipping" );
                // if ( _rs_sc_ex > ( x + _width - offX ) ) continue;

                this.discretlines.append( 
                    _sc_rs_bx, 
                    _sc_rs_by,
                    _sc_rs_ex, 
                    _sc_rs_ey,
                    _t, 
                    lcolors[0] 
                );

                if ( _vdp == true )
                {
                    this.discretlines.append( 
                        _sc_rs_ex, 
                        _sc_rs_ey,
                        _sc_rs_ex + 5, 
                        _sc_rs_ey,
                        _t, 
                        dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_rs_ex, 
                        _sc_rs_ey,
                        _sc_rs_ex - 5, 
                        _sc_rs_ey,
                        _t, 
                        dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_rs_ex, 
                        _sc_rs_ey,
                        _sc_rs_ex, 
                        _sc_rs_ey + 5,
                        _t, 
                        dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_rs_ex, 
                        _sc_rs_ey,
                        _sc_rs_ex, 
                        _sc_rs_ey - 5,
                        _t, 
                        dcolors[0] 
                    );                                        
                }

                let _sc_ls_bx = _centX - _i_last_bi * _width * kX / this.kdX;
                let _sc_ls_by = _centY + _ls_by * kY * _height / 2.0; 
        
                let _sc_ls_ex = _centX - i * _width * kX / this.kdX;
                let _sc_ls_ey = _centY + _ls_ey * kY * _height / 2.0; 
        
                // if ( _ls_sc_bx == _ls_sc_ex || _ls_sc_by == _ls_sc_ey ) console.log( "possible skipping" );
                // if ( _ls_sc_ex < ( x + offX ) ) continue;

                this.discretlines.append( 
                    _sc_ls_bx, 
                    _sc_ls_by,
                    _sc_ls_ex, 
                    _sc_ls_ey,
                    _t, lcolors[0] 
                );                             

                if ( _vdp == true )
                {
                    this.discretlines.append( 
                        _sc_ls_ex, 
                        _sc_ls_ey,
                        _sc_ls_ex + 5, 
                        _sc_ls_ey,
                        _t, dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_ls_ex, 
                        _sc_ls_ey,
                        _sc_ls_ex - 5, 
                        _sc_ls_ey,
                        _t, dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_ls_ex, 
                        _sc_ls_ey,
                        _sc_ls_ex, 
                        _sc_ls_ey + 5,
                        _t, dcolors[0] 
                    );
                    this.discretlines.append( 
                        _sc_ls_ex, 
                        _sc_ls_ey,
                        _sc_ls_ex, 
                        _sc_ls_ey - 5,
                        _t, dcolors[0] 
                    );
                }

                _rs_bx = _rs_ex;
                _rs_by = _rs_ey;
                _ls_bx = _ls_ex;
                _ls_by = _ls_ey;

                _i_last_bi = i;
            }
        }

    }

    async draw( instance, object, _samplerate, _volumerate, kdX, kdY, zoomX, zoomY, _t = 1, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ] ) 
    {
        let x = this.getX();
        let y = this.getY();
        
        let _width = this.getWidth();
        let _height = this.getHeight();

        await this.borderDraw( instance, x, y, _width, _height, _t, colors );
        await this.axisDraw( instance, _samplerate, _volumerate, x, y, _width, _height, kdX, kdY, zoomX, zoomY, _t, colors );

        if ( object.draw != undefined ) 
        {
            if ( object.draw.length != undefined ) 
            {
                if ( object.draw.length > 0 ) 
                {
                    let flag = this.isDuty();
                    if ( flag == true ) 
                    {
                        this.discretlines.clear();
                        for ( let i = 0; i < object.draw.length; i++ ) {
                            await this.functionDraw( instance, object.draw[i], _samplerate, _volumerate, x, y, _width, _height, _t );
                        }
                    }
                    await this.discretlines.draw( instance );
                }
            }
        }

        this.resetDuty();
    }
};