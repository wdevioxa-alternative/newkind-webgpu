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
        this.setPointsArray( [] );
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
        this.setDuty();
    }
    getPointsArrayCount()
    {
	    return this.dotsarray.length;
    }
    getPointsArray() {
    	return this.dotsarray;
    }
    setPointsArray( _dotsarray ) {
    	this.dotsarray = _dotsarray;
        this.setDuty();
    }
    clearPointsArray() {
	    this.setPointsArray( [] );
    }
    appendPointToArray( dot ) {
    	this.dotsarray.push( dot );
        this.setDuty();
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

        let _da = this.getPointsArray();
        let _cnt = this.getPointsArrayCount();

        let vb = new Float32Array( 12 * _cnt );
        let ii = 0;

        for ( let i = 0; i < _cnt; i++ )        
        {
            let Xv = _da[ i ].x;
            let Yv = _da[ i ].y;
            let Wv = _da[ i ].weight;

            let Xh = Wv / 2.0;
            let Yh = Wv / 2.0;

//////////////////////////////
//        
// (0;0) 2---------1 (1;0)
//       |         |
// (0;1) 3---------0 (1;1)
//
//////////////////////////////

            vb[ii++] = instance.calcX( Xv + Xh ); // 1 1 (0)
            vb[ii++] = instance.calcY( Yv + Yh ); // 1 1 (0)
            vb[ii++] = instance.calcX( Xv + Xh ); // 1 0 (1)
            vb[ii++] = instance.calcY( Yv - Yh ); // 1 0 (1)
            vb[ii++] = instance.calcX( Xv - Xh ); // 0 0 (2)
            vb[ii++] = instance.calcY( Yv - Yh ); // 0 0 (2)
            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 0 * 2 + k + i * 12 ]; // 1 1 (0)
            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 2 * 2 + k + i * 12 ]; // 0 0 (2)
            vb[ii++] = instance.calcX( Xv - Xh ); // 0 1 (3)
            vb[ii++] = instance.calcY( Yv + Yh ); // 0 1 (3)
        }

	    return vb;
    }

    getFragUV()
    {   
        let _cnt = this.getPointsArrayCount();

        let fb = new Float32Array( 12 * _cnt );
        let ii = 0;

        for (let i = 0; i < _cnt; i++ )        
        {	
            fb[ii++] = 1.0; // ( 1; 1 )
            fb[ii++] = 1.0;
            fb[ii++] = 1.0; // ( 1; 0 )
            fb[ii++] = 0.0;
            fb[ii++] = 0.0; // ( 0; 0 )
            fb[ii++] = 0.0;
            for ( let k = 0; k < 2; k++ ) fb[ii++] = fb[ 0 * 2 + k + i * 12 ];
            for ( let k = 0; k < 2; k++ ) fb[ii++] = fb[ 2 * 2 + k + i * 12 ];
            fb[ii++] = 0.0;  // ( 0; 1 )
            fb[ii++] = 1.0;
        }

        return fb;
    }

    getColors()
    {
        let _dotsarray = this.getPointsArray();
        let count = this.getPointsArrayCount();
        let cb = new Float32Array( 24 * count );
        let ii = 0;
        for (let i = 0; i < count; i++ ) {
		    let color = _dotsarray[i].color;
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
        	for ( let k = 0; k < 4; k++ ) cb[ii++] = cb[ 0 * 4 + k + i * 24 ];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = cb[ 2 * 4 + k + i * 24 ];
	        for ( let k = 0; k < 4; k++ ) cb[ii++] = color[k];
	    }
        return cb;
    }

    clear()
    {
	    this.clearPointsArray();
    }

    append( x, y, _weight = 1, _color = [ 1.0, 1.0, 1.0, 1.0 ] )
    {
	    this.appendPointToArray( { 'x': x, 'y': y, 'weight': _weight, 'color' : _color } );
    }

    async draw( instance ) 
    {
        let flag = this.isDuty();
        if ( flag == true ) 
	    {
            this.setColorsBuffer( null );
            this.setFragUVBuffer( null );
            this.setVertexBuffer( null );
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
					    buffer: this.uniformShaderLocation
				    }
			    } ]
		    } );
		    this.setShaderBindGroup( shaderBindGroup );
        }

	    let count = this.getPointsArrayCount();

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );
        instance.passEncoder.setVertexBuffer( 0, vertexBuffer );
        instance.passEncoder.setVertexBuffer( 1, fragUVBuffer );
        instance.passEncoder.setVertexBuffer( 2, colorsBuffer );

        instance.passEncoder.draw( 6 * count, 1, 0, 0 );

        this.resetDuty();
    }
};