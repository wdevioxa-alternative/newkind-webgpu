import { wDObject } from './object.mjs';
import { wDLine } from './line.mjs';

export class wDBox extends wDObject
{
    constructor( instance ) 
    {	
        super( instance, 0, 0, 0, 0 );
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
    setWeight( weight )
    {
	    if ( this.weight != weight ) {
		    this.weight = weight;
	    }
    }
    getWeight()
    {
	    return this.weight;
    }
    set( x, y, width, height, weight )
    {
    	this.setX(x);
	    this.setY(y);
	    this.setWidth( width );
	    this.setHeight( height );
	    this.setWeight( weight );
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