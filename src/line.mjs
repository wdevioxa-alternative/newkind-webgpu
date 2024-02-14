import { wDObject } from './object.mjs';
import { wDPoint } from './point.mjs';

export class wDLine extends wDObject
{
    constructor( instance ) 
    {	
        super( instance, 0, 0, 0, 0 );
        this.setLines( [] );
    }  
    destroy()
    {
	    this.vertex.destroy();
    }
    async init() 
    {
	    let instance = this.getInstance();
	    this.vertex = new wDPoint( instance );
	    await this.vertex.init();
    }
    getLinesCount()
    {
	    return this.lines.length;
    }
    getLines() 
    {
    	return this.lines;
    }
    setLines( lines ) 
    {
    	this.lines = lines;
        this.setDuty();
    }
    clearLines() 
    {
	    this.setLines( [] );
    }
    appendLine( line ) 
    {
        this.lines.push( line );
	    this.setDuty();
    }
    setX1( _x1 )
    {
        if ( this.getX1() != _x1 ) {
            this.x1 = _x1;
            this.setDuty();
        }
    }
    getX1()
    {
    	return this.x1;
    }
    setY1( _y1 )
    {
        if ( this.getY1() != _y1 ) {
            this.y1 = _y1;
            this.setDuty();
        }
    }
    getY1()
    {
    	return this.y1;
    }
    setX2( _x2 )
    {
        if ( this.x2 != _x2 ) {
            this.x2 = _x2;
            this.setDuty();
        }
    }
    getX2()
    {
    	return this.x2;
    }
    setY2( _y2 )
    {
        if ( this.y2 != _y2 ) {
            this.y2 = _y2;
            this.setDuty();
        }
    }
    getY2()
    {
    	return this.y2;
    }
    count()
    {
        return this.getLinesCount();
    }
    clear()
    {
	    this.clearLines();
    }
    append( _x1, _y1, _x2, _y2, _t = 1, _colors = { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } )
    {
	    this.appendLine( { 'x1': _x1, 'y1': _y1, 'x2': _x2, 'y2': _y2, 't': _t, 'colors' : _colors } );
    }
    set( _x1, _y1, _x2, _y2, _t = 1 )
    {
        if ( this.getX1() != _x1 ) {
            this.setX1( _x1 );
            this.setDuty();
        }
        if ( this.getY1() != _y1 ) {
            this.setY1( _y1 );
            this.setDuty();
        }
        if ( this.getX2() != _x2 ) {
            this.setX2( _x2 );
            this.setDuty();
        }
        if ( this.getY2() != _y2 ) {
            this.setY2( _y2 );
            this.setDuty();
        }
        if ( this.getThickness() != _t ) {
            this.setThickness( _t );
            this.setDuty();
        }      
    }
    async draw( instance ) 
    {
        let flag = this.isDuty();
        if ( flag == true ) 
        {
            this.vertex.clear();

            let lines = this.getLines();
            let count = this.getLinesCount();

            for ( let i = 0; i < count; i++ )
            {
                let _x0 = lines[ i ].x1;
                let _y0 = lines[ i ].y1;
                let _x1 = lines[ i ].x2;
                let _y1 = lines[ i ].y2;

                let _t = ( lines[i].t < 1.0 ) ? 1.0 : lines[i].t;
                let _colors = lines[i].colors;

                let dx = _x1 - _x0;
                let dy = _y1 - _y0;

                let gyp = Math.floor( Math.sqrt( Math.abs( dx ) * Math.abs( dx ) + Math.abs( dy ) * Math.abs( dy ) ) );
                let conerX = Math.acos( dx / gyp );
                let conerY = Math.asin( dy / gyp );    

                let _aX = 0;                                         //  0: horizontal line
                _aX = ( conerX > Math.PI / 2.0 ) ? 1 : -1;           //  1: to the right; -1: to the left

                let _aY = 0;                                         //  0: vertical line
                _aY = ( conerY > 0 ) ? 1 : -1;                       //  1: to the bottom; -1: to the top    

                if ( gyp == 0.0 ) {
                    console.log( "null?????" );
                    continue;
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////
                // console.log( "x1: " + _x0 + "; y1: " + _y0 + "; x2: " + _x1 + "; y2: " +  _y1 );
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                for ( let i = 0; i < gyp; i++ ) {
                    let _y = 0;
                    let _x = 0;

                    if ( _aX == 0 ) _x = 0
                    else _x = i * Math.cos( conerX );

                    if ( _aY == 0 ) _y = 0
                    else _y = i * Math.sin( conerY );

                    let color = [  _colors.from[0] + ( (_colors.to[0] - _colors.from[0]) * i / gyp ), _colors.from[1] + ( (_colors.to[1] - _colors.from[1]) * i / gyp ),
                            _colors.from[2] + ( (_colors.to[2] - _colors.from[2]) * i / gyp ), _colors.from[3] + ( (_colors.to[3] - _colors.from[3]) * i / gyp ) ];

                    this.vertex.append( _x0 + _x, _y0 + _y, _t, color );
                }          
            }
        }
        await this.vertex.draw( instance );
        this.resetDuty();
    }
};