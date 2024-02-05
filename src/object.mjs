export class wDObject
{
    constructor( instance, x, y, width, height, weight = -1 ) 
    {
    	this.setInstance( instance );
        this.setX( x );
        this.setY( y );
        this.setWidth( width );
        this.setHeight( height );
        this.setWeight( weight );
        this.setDuty( true );
    }
    setInstance( _instance )
    {
        this.instance = _instance;
    }
    getInstance()
    {
        return this.instance;
    }
    setDuty( _duty )
    {
        this.recreate = _duty;
    }
    isDuty() 
    {
        return this.getDuty();
    }
    getDuty()
    {
        return this.recreate;
    }
    getWeight() 
    {
        return this.weight;
    }
    setWeight(_w) 
    {
        this.weight = _w;
    }    
    getX() 
    {
        return this.x;
    }
    setX(_x) 
    {
        this.x = _x;
    }
    getY() 
    {
        return this.y;
    }
    setY(_y) 
    {
	    this.y = _y;
    }
    getWidth() 
    {
        return this.width;
    }
    setWidth(_w) 
    {
	    this.width = _w;
    }
    getHeight() 
    {
        return this.height;
    }
    setHeight(_h) 
    {
	    this.height = _h;
    }
    setUniformShaderLocation( _uniform )
    {
	    if ( this.uniformShaderLocation != null ) 
		    this.uniformShaderLocation.destroy();
	    this.uniformShaderLocation = _uniform;
    }
    getUniformShaderLocation()
    {
    	return this.uniformShaderLocation;
    }
    setUniformShaderFlag( device, _shaderValue )
    {
        let source = new Uint32Array( 1 );
        source[0] = _shaderValue;
        const uniformBuffer = device.createBuffer( {
            label: 'uniform flag buffer',
            size: source.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        } );
        device.queue.writeBuffer( uniformBuffer, 0, source );
    	return uniformBuffer;
    }
};
