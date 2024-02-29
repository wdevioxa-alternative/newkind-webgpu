import { wDObject } from './object.mjs';

//////////////////////////////
//        
// (0;0) 2---------1 (1;0)
//       |         |
// (0;1) 3---------0 (1;1)
//
//////////////////////////////

export class wDPoint extends wDObject
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
	    return this.pointsarray.length;
    }
    getPointsArray() {
    	return this.pointsarray;
    }
    setPointsArray( _pointsarray ) {
    	this.pointsarray = _pointsarray;
        this.setDuty();
    }
    clearPointsArray() {
	    this.setPointsArray( [] );
    }
    appendPointToArray( point ) {
    	this.pointsarray.push( point );
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
        if ( this.vertexBuffer != null ) {
            this.vertexBuffer.destroy();
        }

        this.vertexBuffer = vertex;
    }
    getVertexBuffer() 
    {
        return this.vertexBuffer;
    }
    setFragUVBuffer( fragUV )
    {
        if ( this.fragUVBuffer != null ) {
            this.fragUVBuffer.destroy();
        }

        this.fragUVBuffer = fragUV;
    }
    getFragUVBuffer()
    {
        return this.fragUVBuffer;
    }
    setColorsBuffer( colors )
    {
        if ( this.colorsBuffer != null ) {
            this.colorsBuffer.destroy();
        }

        this.colorsBuffer = colors;
    }
    getColorsBuffer() 
    {
        return this.colorsBuffer;
    }
    getVertex()
    {
        let instance = this.getInstance();

        let _width = instance.getCanvasWidth() - instance.getBorderWidth() * 2.0;
        let _height = instance.getCanvasHeight() - instance.getBorderWidth() * 2.0;

        let _da = this.getPointsArray();
        let _cc = this.getPointsArrayCount();

        let vb = new Float32Array( 12 * _cc );
        let ii = 0;

        for ( let i = 0; i < _cc; i++ )        
        {
            let Xv = _da[ i ].x;
            let Yv = _da[ i ].y;
            let Wv = _da[ i ].thickness;

            //let wGv = ( 2.0 / _width ) * Wv;
            //let hGv = ( 2.0 / _height ) * Wv;
            let Xw = Wv / 2.0;
            let Yw = Wv / 2.0;

//////////////////////////////
//        
// (0;0) 2---------1 (1;0)
//       |         |
// (0;1) 3---------0 (1;1)
//
//////////////////////////////

            vb[ii++] = instance.calcX( Xv + Xw ); // 1 1 (0)
            vb[ii++] = instance.calcY( Yv + Yw ); // 1 1 (0)
            vb[ii++] = instance.calcX( Xv + Xw ); // 1 0 (1)
            vb[ii++] = instance.calcY( Yv - Yw ); // 1 0 (1)
            vb[ii++] = instance.calcX( Xv - Xw ); // 0 0 (2)
            vb[ii++] = instance.calcY( Yv - Yw ); // 0 0 (2)
            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 0 * 2 + k + i * 12 ]; // 1 1 (0)
            for ( let k = 0; k < 2; k++ ) vb[ii++] = vb[ 2 * 2 + k + i * 12 ]; // 0 0 (2)
            vb[ii++] = instance.calcX( Xv - Xw ); // 0 1 (3)
            vb[ii++] = instance.calcY( Yv + Yw ); // 0 1 (3)
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
        let _pointsarray = this.getPointsArray();
        let count = this.getPointsArrayCount();
        let cb = new Float32Array( 24 * count );
        let ii = 0;
        for (let i = 0; i < count; i++ ) {
		    let color = _pointsarray[i].color;
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

    append( x, y, _t = 1, _color = [ 1.0, 1.0, 1.0, 1.0 ] )
    {
	    this.appendPointToArray( { 'x': x, 'y': y, 'thickness': _t, 'color' : _color } );
    }

    count()
    {
        return this.getPointsArrayCount();
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