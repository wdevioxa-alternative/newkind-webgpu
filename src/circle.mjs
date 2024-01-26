import { wDObject } from './object.mjs';
import { wDDot } from './dot.mjs';

export class wDCircle extends wDObject
{
    constructor( instance ) 
    {	
        super( instance, 0, 0, 0, 0 );
        this.setDuty( false );
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
    setRadius( radius )
    {
        if ( this.radius != radius ) {
            this.setDuty( true );
            this.radius = radius;
        }
    }
    getRadius()
    {
    	return this.radius;
    }
    set( x, y, _radius = -1, _weight = -1 )
    {
        if ( this.getX() != x ) {
            this.setX( x );
            this.setDuty( true );
        }
        if ( this.getY() != y ) {
            this.setY( y );
            this.setDuty( true );
        }
        if ( _radius != -1 ) {
            if ( this.getRadius() != _radius ) {
                this.setRadius( _radius );
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
    async draw( instance, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        let flag = this.isDuty();
        if ( flag == true ) 
        {
            this.vertex.clear();

            let r = this.getRadius();
            let w = this.getWeight();	

            let x0 = this.getX();
            let y0 = this.getY();

            if ( r == 2 ) {
                    this.vertex.append( x0 + 2, y0 - 1, w, color );
                    this.vertex.append( x0 + 2, y0 + 0, w, color );
                    this.vertex.append( x0 + 2, y0 + 1, w, color );

                    this.vertex.append( x0 - 1, y0 - 2, w, color );
                    this.vertex.append( x0 + 0, y0 - 2, w, color );
                    this.vertex.append( x0 + 1, y0 - 2, w, color );

                    this.vertex.append( x0 - 2, y0 - 1, w, color );
                    this.vertex.append( x0 - 2, y0 + 0, w, color );
                    this.vertex.append( x0 - 2, y0 + 1, w, color );

                    this.vertex.append( x0 - 1, y0 + 2, w, color );
                    this.vertex.append( x0 + 0, y0 + 2, w, color );
                    this.vertex.append( x0 + 1, y0 + 2, w, color );
            } else if ( r == 3 ) {
                    this.vertex.append( x0 + 3, y0 - 1, w, color );
                    this.vertex.append( x0 + 3, y0 + 0, w, color );
                    this.vertex.append( x0 + 3, y0 + 1, w, color );

                    this.vertex.append( x0 + 2, y0 + 2, w, color );

                    this.vertex.append( x0 - 1, y0 - 3, w, color );
                    this.vertex.append( x0 + 0, y0 - 3, w, color );
                    this.vertex.append( x0 + 1, y0 - 3, w, color );

                    this.vertex.append( x0 + 2, y0 - 2, w, color );

                    this.vertex.append( x0 - 3, y0 - 1, w, color );
                    this.vertex.append( x0 - 3, y0 + 0, w, color );
                    this.vertex.append( x0 - 3, y0 + 1, w, color );

                    this.vertex.append( x0 - 2, y0 - 2, w, color );

                    this.vertex.append( x0 - 1, y0 + 3, w, color );
                    this.vertex.append( x0 + 0, y0 + 3, w, color );
                    this.vertex.append( x0 + 1, y0 + 3, w, color );

                    this.vertex.append( x0 - 2, y0 + 2, w, color );
            } else if ( r == 4 ) {
                    this.vertex.append( x0 + 4, y0 - 1, w, color );
                    this.vertex.append( x0 + 4, y0 + 0, w, color );
                    this.vertex.append( x0 + 4, y0 + 1, w, color );

                    this.vertex.append( x0 + 3, y0 + 2, w, color );
                    this.vertex.append( x0 + 2, y0 + 3, w, color );

                    this.vertex.append( x0 - 1, y0 - 4, w, color );
                    this.vertex.append( x0 + 0, y0 - 4, w, color );
                    this.vertex.append( x0 + 1, y0 - 4, w, color );

                    this.vertex.append( x0 + 3, y0 - 2, w, color );
                    this.vertex.append( x0 + 2, y0 - 3, w, color );

                    this.vertex.append( x0 - 4, y0 - 1, w, color );
                    this.vertex.append( x0 - 4, y0 + 0, w, color );
                    this.vertex.append( x0 - 4, y0 + 1, w, color );

                    this.vertex.append( x0 - 3, y0 - 2, w, color );
                    this.vertex.append( x0 - 2, y0 - 3, w, color );

                    this.vertex.append( x0 - 1, y0 + 4, w, color );
                    this.vertex.append( x0 + 0, y0 + 4, w, color );
                    this.vertex.append( x0 + 1, y0 + 4, w, color );

                    this.vertex.append( x0 - 3, y0 + 2, w, color );
                    this.vertex.append( x0 - 2, y0 + 3, w, color );
            } else if ( r == 5 ) {
                    this.vertex.append( x0 + 5, y0 - 1, w, color );
                    this.vertex.append( x0 + 5, y0 + 0, w, color );
                    this.vertex.append( x0 + 5, y0 + 1, w, color );

                    this.vertex.append( x0 + 4, y0 + 2, w, color );
                    this.vertex.append( x0 + 4, y0 + 3, w, color );
                    this.vertex.append( x0 + 3, y0 + 4, w, color );
                    this.vertex.append( x0 + 2, y0 + 4, w, color );

                    this.vertex.append( x0 - 1, y0 - 5, w, color );
                    this.vertex.append( x0 + 0, y0 - 5, w, color );
                    this.vertex.append( x0 + 1, y0 - 5, w, color );

                    this.vertex.append( x0 + 4, y0 - 2, w, color );
                    this.vertex.append( x0 + 4, y0 - 3, w, color );
                    this.vertex.append( x0 + 3, y0 - 4, w, color );
                    this.vertex.append( x0 + 2, y0 - 4, w, color );

                    this.vertex.append( x0 - 5, y0 - 1, w, color );
                    this.vertex.append( x0 - 5, y0 + 0, w, color );
                    this.vertex.append( x0 - 5, y0 + 1, w, color );

                    this.vertex.append( x0 - 4, y0 - 2, w, color );
                    this.vertex.append( x0 - 4, y0 - 3, w, color );
                    this.vertex.append( x0 - 3, y0 - 4, w, color );
                    this.vertex.append( x0 - 2, y0 - 4, w, color );

                    this.vertex.append( x0 - 1, y0 + 5, w, color );
                    this.vertex.append( x0 + 0, y0 + 5, w, color );
                    this.vertex.append( x0 + 1, y0 + 5, w, color );

                    this.vertex.append( x0 - 4, y0 + 2, w, color );
                    this.vertex.append( x0 - 4, y0 + 3, w, color );
                    this.vertex.append( x0 - 3, y0 + 4, w, color );
                    this.vertex.append( x0 - 2, y0 + 4, w, color );
             } else if ( r == 1 ) {
                    this.vertex.append( x0 + 1, y0 - 0, w, color );
                    this.vertex.append( x0 + 0, y0 - 1, w, color );
                    this.vertex.append( x0 - 1, y0 + 0, w, color );
                    this.vertex.append( x0 - 0, y0 + 1, w, color );

            } else {
        		let ang = 0;
                while ( ang < ( Math.PI / 2.0 ) ) {
                    let x1 = Math.trunc ( r * Math.sin( ang ) );
                    let y1 = Math.trunc ( r * Math.cos( ang ) );
                    this.vertex.append( x0 + x1, y0 + y1, w, color );
                    this.vertex.append( x0 - y1, y0 + x1, w, color );
                    this.vertex.append( x0 - x1, y0 - y1, w, color );
                    this.vertex.append( x0 + y1, y0 - x1, w, color );
		            ang = ang + Math.asin( 1.0 / ( 2.0 * r ) );
		        } 
            }
            this.setDuty( false );
        }
        const count = this.vertex.getDotsCount();
        if ( count != 0 ) await this.vertex.draw( instance );
    }
};