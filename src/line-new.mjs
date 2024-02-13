import { wDObject } from './object.mjs';
import { wDDot } from './pointsarray.mjs';

export class wDNewLine extends wDObject
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
	    this.vertex = new wDDot( instance );
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
    append( _x1, _y1, _x2, _y2, _weight = 1, _colors = { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } )
    {
	    this.appendLine( { 'x1': _x1, 'y1': _y1, 'x2': _x2, 'y2': _y2, 'weight': _weight, 'colors' : _colors } );
    }
    set( _x1, _y1, _x2, _y2, _weight = 1 )
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
        if ( this.getWeight() != _weight ) {
            this.setWeight( _weight );
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

                let _weight = lines[i].weight;
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

                /////////////////////////////////////////////////////////////////////////////////////////////////////
                // console.log( "x1: " + _x0 + "; y1: " + _y0 + "; x2: " + _x1 + "; y2: " +  _y1 );
                /////////////////////////////////////////////////////////////////////////////////////////////////////
                for ( let i = 0; i < gyp; i++ )
                {
                    let _y = 0;
                    let _x = 0;

                    if ( _aX == 0 ) _x = 0
                    else _x = i * Math.cos( conerX );

                    //if ( _aX == 0 )
                    //    console.log( "ax: " + _aX );

                    if ( _aY == 0 ) _y = 0
                    else _y = i * Math.sin( conerY );

                    //if ( _aY == 0 )
                    //    console.log( "ay: " + _aY );

                    this.vertex.append( _x0 + _x, _y0 + _y, _weight, _colors.from );
                }          
            }
        }
        await this.vertex.draw( instance );
        this.resetDuty();
    }
};