import { wDObject } from './object.mjs';
import { wDLine } from './line.mjs';

export class wDBox extends wDObject
{
    constructor( instance ) 
    {	
        super( instance, 0, 0, 0, 0 );
        this.setDuty( false );
    }  
    destroy()
    {
	    this.borders.destroy();
    }
    async init() 
    {
	    let instance = this.getInstance();
	    this.borders = new wDLine( instance );
	    await this.borders.init();
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
    async draw( instance, colors = [ { from: [ 1.0, 1.0, 1.0, 1.0 ], to: [ 1.0, 1.0, 1.0, 1.0 ] } ]) 
    {
        let flag = this.isDuty();

        if ( flag == true ) {
            this.borders.clear();
            this.borders.setDuty( flag );
            this.setDuty( false );
        }

        let x = this.getX();
        let y = this.getY();

        let _width = this.getWidth();
        let _height = this.getHeight();
        let _weight = this.getWeight();	

        if ( colors.length == 1 )
        {
            colors.push( colors[0] );
            colors.push( colors[0] );
            colors.push( colors[0] );
        }

        this.borders.append( x + _width, y + _height, x + _width, y, _weight, colors[0] );
        this.borders.append( x + _width, y, x, y, _weight, colors[1] );
        this.borders.append( x, y, x, y + _height, _weight, colors[2] );
        this.borders.append( x, y + _height, x + _width, y + _height, _weight, colors[3] );

        await this.borders.draw( instance );
        
	    this.setDuty( true );
    }
};