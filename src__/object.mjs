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
    setInstance( instance )
    {
        this.instance = instance;
    }
    getInstance()
    {
        return this.instance;
    }
    setDuty( duty )
    {
        this.objectDuty = duty;
    }
    isDuty() {
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
    setX(x) 
    {
	if ( this.x != x ) {
		this.setDuty( true );
	        this.x = x;
	}
    }
    getY() 
    {
        return this.y;
    }
    setY(y) 
    {
	if ( this.y != y ) {
		this.setDuty( true );
	        this.y = y;
	}
    }
    getWidth() 
    {
        return this.width;
    }
    setWidth(width) 
    {
	if ( this.width != width ) {
		this.setDuty( true );
	        this.width = width;
	}
    }
    getHeight() 
    {
        return this.height;
    }
    setHeight(height) 
    {
	if ( this.height != height ) {
		this.setDuty( true );
	        this.height = height;
	}
    }
    setUniformShaderLocation( uniform )
    {
	if ( this.uniformlShaderLocation != null ) 
		this.uniformlShaderLocation.destroy();
	this.uniformlShaderLocation = uniform;
    }
    getUniformShaderLocation()
    {
    	return this.uniformlShaderLocation;
    }
    setUniformShaderFlag( device, shaderValue )
    {
        let source = new Uint32Array(1);
        source[0] = shaderValue;
        const uniformBuffer = device.createBuffer( {
            label: 'uniform flag buffer',
            size: source.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        } );
        device.queue.writeBuffer(uniformBuffer, 0, source);
	return uniformBuffer;
    }
};
