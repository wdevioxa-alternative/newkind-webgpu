export class GObject
{
    constructor( instance, x, y, width, height ) 
    {
        this.setX( x );
        this.setY( y );
        this.setWidth( width );
        this.setHeight( height );
        this.setDuty( true );
	this.setInstance( instance );
    }
    instance() {
	return this.instance;
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
        this.x = x;
    }
    getY() 
    {
        return this.y;
    }
    setY(y) 
    {
        this.y = y;
    }
    getWidth() 
    {
        return this.width;
    }
    setWidth(width) 
    {
        this.width = width;
    }
    getHeight() 
    {
        return this.height;
    }
    setHeight(height) 
    {
        this.height = height;
    }

    setShaderFlag( setFlag, shaderValue, flagBuffer = null )
    {
	if ( setFlag == true ) {
            let source = new Uint32Array(1);
            source[0] = shaderValue;
            if ( flagBuffer == null )
                this.attachBuffer( source, this.shaderFlagBuffer );
            else this.attachBuffer( source, flagBuffer );
        } else {
            if ( flagBuffer == null ) {
                this.shaderFlagBuffer.destroy();
                this.shaderFlagBuffer = null;
            } else flagBuffer.destroy();
	}
    }

    setShaderFlagBuffer( shaderFlagBuffer )
    {
	if ( this.shaderFlagBuffer != null ) {
            this.shaderFlagBuffer.destroy();
        }
	this.shaderFlagBuffer = shaderFlagBuffer;
    }

    getShaderFlagBuffer()
    {
        return this.shaderFlagBuffer;
    }

    attachBuffer(source, destination) 
    {
        let arrayBuffer = destination.getMappedRange();
        ( source instanceof Uint16Array )
                ? (new Uint16Array(arrayBuffer)).set(source)
                : (source instanceof Uint32Array) 
			? (new Uint32Array(arrayBuffer)).set(source)
			: (new Float32Array(arrayBuffer)).set(source)
        destination.unmap();
        return destination;
    }

    createBuffer(source, usage, device) 
    {
        let destination = device.createBuffer( {
            mappedAtCreation: true,
            size: source.byteLength,
            usage: usage
        } );
	return this.attachBuffer(source, destination) 
    }

    createOnlyBuffer(size, usage, device) 
    {
        return device.createBuffer( {
            mappedAtCreation: true,
            size: size,
            usage: usage
        } );
    }

};
