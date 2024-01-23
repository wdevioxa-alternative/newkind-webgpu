import { GObject } from './object.mjs';
import { GLine } from './line.mjs';

export class GBox extends GObject
{
    constructor( instance, x, y, width, height, weight = 1 ) 
    {	
        super( instance, x, y, width, height );
	this.line1 = new GLine( instance, x, y, width, weight );
	this.line2 = new GLine( instance, x + width, y, width, weight );
	this.line3 = new GLine( instance, x, y, width, weight );
	this.line4 = new GLine( instance, x, y, width, weight );
    }  
    destroy()
    {
        this.setColorsBuffer( null );
        this.setFragUVBuffer( null );
        this.setVertexBuffer( null );
	this.setShaderFlagBuffer( null );
    }
    async initialize() {
	let instance = this.getInstance();
        this.setColorsBuffer( null );
        this.setFragUVBuffer( null );
        this.setVertexBuffer( null );
        this.setShaderFlagBuffer( 
		this.createOnlyBuffer( 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC, instance.device ) 
	);
        this.setShaderFlag( true, 0 );
        this.setDuty( false );
    }
    setVertexBuffer( vertex )
    {
        if ( vertex == null )
            if ( this.vertexBuffer != null )
                this.vertexBuffer.destroy();
        this.vertexBuffer = vertex;
    }
    getVertexBuffer() 
    {
        return this.vertexBuffer;
    }
    setFragUVBuffer( fragUV )
    {
        if ( fragUV == null )
            if ( this.fragUVBuffer != null )
                this.fragUVBuffer.destroy();
        this.fragUVBuffer = fragUV;
    }
    getFragUVBuffer()
    {
        return this.fragUVBuffer;
    }
    setColorsBuffer( colors )
    {
        if ( colors == null )
            if ( this.colorsBuffer != null )
                this.colorsBuffer.destroy();
        this.colorsBuffer = colors;
    }
    getColorsBuffer() 
    {
        return this.colorsBuffer;
    }
    getVertex()
    {
        let objectWidth = this.getWidth();
        let objectHeight = this.getHeight();

        let offsetX = this.getX();
        let offsetY = this.getY();

        return new Float32Array( [
            this.instance.calcX( objectWidth + offsetX ), this.instance.calcY( objectHeight + offsetY ),
            this.instance.calcX( objectWidth + offsetX ), this.instance.calcY( offsetY ),
	    this.instance.calcX( offsetX ), this.instance.calcY( offsetY ),
            this.instance.calcX( objectWidth + offsetX ), this.instance.calcY( objectHeight + offsetY ),
	    this.instance.calcX( offsetX ), this.instance.calcY( offsetY ),
            this.instance.calcX( offsetX ), this.instance.calcY( objectHeight + offsetY )
        ] );
    }
    getFragUV()
    {
        return new Float32Array([
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 0.0,
            0.0, 1.0
        ]);
    }
    getColors( color = [ 0.0, 1.0, 1.0, 1.0 ] )
    {
	let transparentColor = [ 0.0, 0.0, 0.0, 0.0 ];

        let colorsBuffer = new Float32Array( 24 );
        let objectIndex = 0;
	
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = transparentColor[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = transparentColor[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
	
        return colorsBuffer;
    }

    async draw( instance, color = [ 1.0, 1.0, 1.0, 1.0 ] ) 
    {
        let objectRedraw = this.isDuty();
        if ( objectRedraw == true ) {
            this.setColorsBuffer( null );
            this.setFragUVBuffer( null );
            this.setVertexBuffer( null );
            this.setDuty( false );
        }

	let vertexBuffer = this.getVertexBuffer();
        if ( vertexBuffer == null ) {
		vertexBuffer = instance.createBuffer( this.getVertex(), GPUBufferUsage.VERTEX, instance.device );
                this.setVertexBuffer( vertexBuffer );
        }

        let fragUVBuffer = this.getFragUVBuffer();
        if ( fragUVBuffer == null ) {
		fragUVBuffer = instance.createBuffer( this.getFragUV(), GPUBufferUsage.VERTEX, instance.device );
                this.setFragUVBuffer( fragUVBuffer );
        }

        let colorsBuffer = this.getColorsBuffer();
        if ( colorsBuffer == null ) {
		colorsBuffer = instance.createBuffer( this.getColors( color ), GPUBufferUsage.VERTEX, instance.device );
                this.setColorsBuffer( colorsBuffer );
        }

        let shaderBindGroup = instance.device.createBindGroup( {
		layout: instance.pipeline.getBindGroupLayout(0),
		entries: [ {
			binding: 0,
			resource: {
				buffer: this.shaderFlagBuffer,
			}
		} ]
	} );

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );
        instance.passEncoder.setVertexBuffer( 0, vertexBuffer );
        instance.passEncoder.setVertexBuffer( 1, fragUVBuffer );
        instance.passEncoder.setVertexBuffer( 2, colorsBuffer );
        instance.passEncoder.draw( 6, 1, 0, 0 );
    }
};