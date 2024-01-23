import { wDObject } from './object.mjs';

//////////////////////////////
//        
// (0;0) 2---------1 (1;0)
//       |         |
// (0;1) 3---------0 (1;1)
//
//////////////////////////////

export class wDDot extends wDObject
{
    constructor( instance ) 
    {
        super( instance, 0, 0, 0, 0 );
	this.setDots( [] );
    }
    destroy()
    {
        this.setColorsBuffer( null );
        this.setVertexBuffer( null );
        this.setFragUVBuffer( null );
	this.setUniformShaderLocation( null ); 
	this.setShaderBindGroup( null );
    }  
    async init() 
    {
	let instance = this.getInstance();
        this.setVertexBuffer( null );
        this.setFragUVBuffer( null );
        this.setColorsBuffer( null );
	this.setShaderBindGroup( null );
	this.setUniformShaderLocation( 
		this.setUniformShaderFlag( instance.device, 0 ) 
	);
        this.setDuty( false );
    }
    getDotsCount()
    {
	return this.dots.length;
    }
    getDots() {
    	return this.dots;
    }
    setDots( dots ) {
	this.setDuty(true);
    	this.dots = dots;
    }
    clearDots() {
	this.setDots( [] );
    }
    appendDot( dot ) {
	this.setDuty(true);
    	this.dots.push( dot );
    }
    setWeight( weight )
    {
	this.weight = weight;
    }
    getWeight()
    {
	return this.weight;
    }
    setShaderBindGroup( shaderBind ) 
    {
        this.shaderBindGroup = shaderBind;
    }
    getShaderBindGroup() 
    {
        return this.shaderBindGroup;
    }
    setVertexBuffer( vertex )
    {
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
        let instance = this.getInstance();

	let dots = this.getDots();
	let count = this.getDotsCount();

	let vb = new Float32Array( 12 * count );
	let ii = 0;

	for (let cj = 0; cj < count; cj++ )        
	{
            let vX = dots[ cj ].x;
            let vY = dots[ cj ].y;

            let vW = dots[ cj ].weight;

            let Xh = vW / 2.0;
            let Yh = vW / 2.0;

//////////////////////////////
//        
// (0;0) 2---------1 (1;0)
//       |         |
// (0;1) 3---------0 (1;1)
//
//////////////////////////////

            vb[ii++] = instance.calcX( vX + Xh );
            vb[ii++] = instance.calcY( vY + Yh ); // 1 1

            vb[ii++] = instance.calcX( vX + Xh );
            vb[ii++] = instance.calcY( vY - Yh ); // 1 0

            vb[ii++] = instance.calcX( vX - Xh );
            vb[ii++] = instance.calcY( vY - Yh ); // 0 0

            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 0 * 2 + k + cj * 12 ];
            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 2 * 2 + k + cj * 12 ];

            vb[ii++] = instance.calcX( vX - Xh );
            vb[ii++] = instance.calcY( vY + Yh ); // 0 1
        }
	return vb;
    }

    getFragUV()
    {   
	let dots = this.getDots();
	let count = this.getDotsCount();
	let fb = new Float32Array(12 * count);
	let ii = 0;
	for (let cj = 0; cj < count; cj++ )        
	{	
		fb[ii++] = 1.0; // ( 1; 1 )
		fb[ii++] = 1.0;

		fb[ii++] = 1.0; // ( 1; 0 )
		fb[ii++] = 0.0;

		fb[ii++] = 0.0; // ( 0; 0 )
		fb[ii++] = 0.0;

	       	for ( let k = 0; k < 2; k++ ) fb[ii++] = fb[ 0 * 2 + k + cj * 12 ];

	        for ( let k = 0; k < 2; k++ ) fb[ii++] = fb[ 2 * 2 + k + cj * 12 ];

		fb[ii++] = 0.0;  // ( 0; 1 )
		fb[ii++] = 1.0;
	}
	return fb;
    }
    getColors()
    {
	let dots = this.getDots();
	let count = this.getDotsCount();
        let cb = new Float32Array( 24 * count );
	let ii = 0;	
	for (let cj = 0; cj < count; cj++ ) {
		let color = dots[cj].color;
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
        	for ( let k = 0; k < 4; k++ ) cb[ii++] = cb[ 0 * 4 + k + cj * 24];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = cb[ 2 * 4 + k + cj * 24 ];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	}
        return cb;
    }

    clear()
    {
	this.clearDots();
    }

    append( x, y, weight, color = [ 1.0, 1.0, 1.0, 1.0 ] )
    {
	this.appendDot( { 'x': x, 'y': y, 'weight': weight, 'color' : color } );
    }

    async draw( instance ) 
    {
        let flag = this.isDuty();
        if ( flag == true ) 
	{
            this.setColorsBuffer( null );
            this.setFragUVBuffer( null );
            this.setVertexBuffer( null );
            this.setDuty( false );
        }
	let vertexBuffer = this.getVertexBuffer();
        if ( vertexBuffer == null ) {
		vertexBuffer = instance.createBuffer(this.getVertex(), GPUBufferUsage.VERTEX, instance.device );
                this.setVertexBuffer( vertexBuffer );
        }
        let fragUVBuffer = this.getFragUVBuffer();
        if ( fragUVBuffer == null ) {
		fragUVBuffer = instance.createBuffer( this.getFragUV(), GPUBufferUsage.VERTEX, instance.device );
                this.setFragUVBuffer( fragUVBuffer );
        }
        let colorsBuffer = this.getColorsBuffer();
        if ( colorsBuffer == null ) {
		colorsBuffer = instance.createBuffer( this.getColors(), GPUBufferUsage.VERTEX, instance.device );
                this.setColorsBuffer( colorsBuffer );
        }	    
        let shaderBindGroup = this.getShaderBindGroup();
	if ( shaderBindGroup == null ) {
		shaderBindGroup = instance.device.createBindGroup( {
			layout: instance.pipeline.getBindGroupLayout(0),
			entries: [ {
				binding: 0,
				resource: {
					buffer: this.uniformlShaderLocation
				}
			} ]
		} );
		this.setShaderBindGroup( shaderBindGroup );
        }

	let count = this.getDotsCount();

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );
        instance.passEncoder.setVertexBuffer( 0, vertexBuffer );
        instance.passEncoder.setVertexBuffer( 1, fragUVBuffer );
        instance.passEncoder.setVertexBuffer( 2, colorsBuffer );

        instance.passEncoder.draw(6 * count, 1, 0, 0 );
    }
};