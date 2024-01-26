export class wDObject
{
    constructor( instance, x, y, width, height ) 
    {
    	this.setInstance( instance );
        this.setX( x );
        this.setY( y );
        this.setWidth( width );
        this.setHeight( height );
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
        this.objectDuty = _duty;
    }
    isDuty() 
    {
        return this.getDuty();
    }
    getDuty()
    {
        return this.objectDuty;
    }
    getX() 
    {
        return this.x;
    }
    setX(_x) 
    {
        if ( this.x != _x )
            this.x = _x;
    }
    getY() 
    {
        return this.y;
    }
    setY(_y) 
    {
    	if ( this.y != _y )
	        this.y = _y;
    }
    getWidth() 
    {
        return this.width;
    }
    setWidth(_width) 
    {
	    if ( this.width != _width )
	        this.width = _width;
    }
    getHeight() 
    {
        return this.height;
    }
    setHeight(_height) 
    {
	    if ( this.height != _height )
	        this.height = _height;
    }
    setUniformShaderLocation( _uniform )
    {
	    if ( this.uniformlShaderLocation != null ) 
		    this.uniformlShaderLocation.destroy();
	    this.uniformlShaderLocation = _uniform;
    }
    getUniformShaderLocation()
    {
    	return this.uniformlShaderLocation;
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
