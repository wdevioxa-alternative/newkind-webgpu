import { mat4, vec3 } from 'wgpu-matrix';
import { wDCircle } from './circle.mjs';
import { wDLine } from './line.mjs';
import { wDNativeLine } from './line-native.mjs';
import { wDDot } from './point.mjs';
import { wDBox } from './box.mjs';
import { wDSpline } from './spline.mjs';
import { wDLabel } from './label.mjs';
import { wDImage } from './image.mjs';

import vertexShaderWgslCode from './shaders/shader.vert.wgsl'
import fragmentShaderWgslCode from './shaders/shader.frag.wgsl'

export class wDApplication
{
    constructor() 
    {
        this.setShaderBindGroup( null );
        this.setTextureBindGroup( null );
    }
    getBorderWidth()
    {
        return this.borderwidth;
    }
    setBorderWidth( _w )
    {
        this.borderwidth = _w;
    }
    setCanvas( canvas )
    {
        this.setChartCanvas( canvas );
    }
    setChartCanvas( canvas ) 
    {
        this.canvas = canvas;
    }
    getCanvas()
    {
        return this.getChartCanvas();
    }
    getChartCanvas() 
    {
        return this.canvas;
    }
    getDrawWidth()
    {
        return this.drawwidth;
    }
    setDrawWidth( _w )
    {
        this.drawwidth = _w;
    }
    getDrawHeight()
    {
        return this.drawheight;
    }
    setDrawHeight( _h )
    {
        this.drawheight = _h;
    }
    getCanvasWidth( _wbw = true ) 
    {
        if ( _wbw == true ) return this.canvas.width;
        let _bw = this.getBorderWidth() * 2.0;
        let _w  = this.canvas.width - _bw;
        return _w;
    }
    getCanvasHeight( _wbw = true ) 
    {
        if ( _wbw == true ) return this.canvas.height;
        let _bw = this.getBorderWidth() * 2.0;
        let _h = this.canvas.height - _bw;
        return _h;
    }
    calcXtoS( cx ) 
    {
        return this.calcRX( cx );
    }
    calcYtoS( cy ) 
    {
        return this.calcRY( cy );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // translation from webgpu to screen coordinates (0 : 1366)
    calcRX( cx ) 
    {
        let cw = Math.fround( this.getCanvasWidth() / 2.0 );
        let point = 1.0 / cw;
        return Math.round( ( cx + 1.0 ) / point );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // translation from webgpu to screen coordinates (0 : 1366)
    calcRY( cy ) 
    {
        let ch = Math.fround( this.getCanvasHeight() / 2.0 );
        let point = 1.0 / ch;
        return this.getCanvasHeight() - Math.round( ( cy + 1.0 ) / point );
    }
    calcStoX( cx ) 
    {
        return this.calcX( cx );
    }
    calcStoY( cy ) 
    {
        return this.calcY( cy );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // translation screen to webgpu coordinates -1 : +1
    calcX( cx ) 
    {
        let cw = this.getCanvasWidth();
        // cx = cx + this.getBorderWidth();
        let translate = 2.0 * cx / cw - 1.0;
        return translate;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // translation screen to webgpu coordinates -1 : +1
    calcY( cy ) 
    {
        let ch = this.getCanvasHeight();
        // cy = cy + this.getBorderWidth();
        let translate = 1.0 - 2.0 * cy / ch;
        return translate;
    }
    createAppUniformShaderLocationFlag( device, shaderFlag = 0 )
    {
        if ( device == null ) {
            this.setAppUniformShaderLocation( null );
        } else {
            this.setAppUniformShaderLocation( 
                this.setAppUniformShaderFlag( device, shaderFlag ) 
            );
        }
    } 
    setAppUniformShaderLocation( _uniform )
    {
        if ( this.uniformShaderLocation != null ) 
            this.uniformShaderLocation.destroy();
                this.uniformShaderLocation = _uniform;
    }
    getAppUniformShaderLocation()
    {
    	return this.uniformShaderLocation;
    }
    setAppUniformShaderFlag( device, shaderValue )
    {
        let source = new Uint32Array(1);
        source[0] = shaderValue;
        const uniformBuffer = device.createBuffer( {
            label: 'Uniform flag buffer',
            size: source.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
        } );
        device.queue.writeBuffer(uniformBuffer, 0, source);
	    return uniformBuffer;
    }
    attachBuffer(source, destination) 
    {
        const arrayBuffer = destination.getMappedRange();
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
        const destination = device.createBuffer( {
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
    check()
    {
        try {
            if ( navigator.gpu != null && navigator.gpu != undefined ) {
                const wgerr = document.getElementById('error');
                wgerr.style.display = 'none';
                const wgcontent = document.getElementById('content');
                wgcontent.style.display = 'block';
                const wgfx = document.getElementById('gfx');
                wgfx.style.display = 'block';
                this.setCanvas( wgfx );
            } else {
                const wgerr = document.getElementById('error');
                wgerr.style.display = 'block';
                throw('Your browser does`t support WebGPU or it is not enabled.');
            }
        } catch ( e ) {
            throw( e );
        }
    }
    async init()
    {	
        try {

            this.adapter = await navigator.gpu.requestAdapter();
            this.device = await this.adapter.requestDevice();

            if ( !this.context )
                this.context = this.canvas.getContext('webgpu');

            this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();

            this.context.configure({
                device: this.device,
                format: 'bgra8unorm',
                size: [ this.getCanvasWidth(), this.getCanvasHeight(), 1 ],
                compositingAlphaMode: "opaque", // "premultiplied",
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            });

            this.pipeline = this.device.createRenderPipeline( {
                layout: 'auto',
                vertex: {
                        module: this.device.createShaderModule({
                            code: vertexShaderWgslCode
                        }),
                        entryPoint: 'main',
                        buffers: [
                        {
                            attributes: [{
                                shaderLocation: 0, // [[location(0)]]
                                offset: 0,
                                format: 'float32x2'
                            }],
                            arrayStride: 4 * 2, // sizeof(float) * 3
                            stepMode: 'vertex'
                        }, 
                        {
                            attributes: [{
                                shaderLocation: 1, // [[location(0)]]
                                offset: 0,
                                format: 'float32x2'
                            }],
                            arrayStride: 4 * 2, // sizeof(float) * 3
                            stepMode: 'vertex'
                        }, 
                        {
                            attributes: [{
                                shaderLocation: 2, // [[location(0)]]
                                offset: 0,
                                format: 'float32x4'
                            }],
                            arrayStride: 4 * 4, // sizeof(float) * 3
                            stepMode: 'vertex'
                        } ]
                },
                fragment: {
                    module: this.device.createShaderModule({
                        code: fragmentShaderWgslCode
                    }),
                    entryPoint: 'main',
                    targets: [{
                        format: 'bgra8unorm'
                    }]
                },
                primitive: {
                    topology: 'triangle-list',
    /////////////////////////////////////////////////////////////////////////
    // Backface culling since the cube is solid piece of geometry.
    // Faces pointing away from the camera will be occluded by faces
    // pointing toward the camera.
    /////////////////////////////////////////////////////////////////////////
    //                cullMode: 'back',
    /////////////////////////////////////////////////////////////////////////
    // Enable depth testing so that the fragment closest to the camera
    // is rendered in front.
    /////////////////////////////////////////////////////////////////////////
    //              depthStencil: {
    //                  depthWriteEnabled: true,
    //                  depthCompare: 'less',
    //                  format: 'depth24plus',
    //              },
                } 
            });

            this.createAppUniformShaderLocationFlag( this.device, 0 );

            this.sampler = this.device.createSampler({
                magFilter: 'nearest',  // nearest | linear
                minFilter: 'nearest'   // nearest | linear
            });

            this.nullTexture = this.device.createTexture({
                size: [ 1, 1, 1 ],
                format: 'rgba8unorm',
                usage:
                    GPUTextureUsage.TEXTURE_BINDING |
                    GPUTextureUsage.COPY_DST |
                    GPUTextureUsage.RENDER_ATTACHMENT,
            });

            this.renderPassDesc = {
                colorAttachments: [ {
                    view: null,
                    clearValue: [ 0.0, 0.0, 0.0, 1.0 ],
                    loadOp: 'clear',
                    storeOp: 'store'
                }]          
            };

            this.setBorderWidth( 10.0 );
        }
        catch (e)
        {
            console.error(e);
        }
    }

    start = async() => {
        await this.init();
        await this.resources();
        return requestAnimationFrame( this.render );    
    }

    async resources()
    {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //        this.spline = new GSpline( 0, 0, this.getCanvasWidth(), this.getCanvasHeight() );
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // this.line = new wDLine( this );
        // await this.line.init();

        // this.box = new wDBox( this );
        // await this.box.init();

        this.setDrawWidth( this.getCanvasWidth( false ) );
        this.setDrawHeight( this.getCanvasHeight( false ) );

        this.image = new wDImage( this, "assets/Di-3d.png" );
        await this.image.init();

        this.spline = new wDSpline( this, 0, 0, this.getCanvasWidth(), this.getCanvasHeight() );
        await this.spline.init();
        
        //this.label = new wDLabel( this, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
        //await this.label.init();

        //this.pointsline = new wDLine( this );
        //await this.pointsline.init();

        this.circle = new wDCircle( this );
        await this.circle.init();

        this.color = 0.0;
        this.itcolor = 0.01;
    }
    setTextureBindGroup( group )
    {
        this.textureBindGroup = group;
    }
    getTextureBindGroup() 
    {
        return this.textureBindGroup;
    }    
    setShaderBindGroup( group )
    {
        this.shaderBindGroup = group;
    }
    getShaderBindGroup() 
    {
        return this.shaderBindGroup;
    }    
    render = async() => {

	    let texture = this.context.getCurrentTexture();
	    this.renderPassDesc.colorAttachments[0].view = texture.createView();

        this.commandEncoder = this.device.createCommandEncoder();
        this.passEncoder = this.commandEncoder.beginRenderPass( this.renderPassDesc ); 

        this.passEncoder.setViewport(
            0,
            0,
            this.getCanvasWidth(),
            this.getCanvasHeight(),
            0,
            1
        );

        this.passEncoder.setScissorRect(
            this.getBorderWidth() - 1,
            this.getBorderWidth() - 1,
            this.getCanvasWidth( false ) + 2,
            this.getCanvasHeight( false ) + 2,
        );     

        let shaderBindGroup = this.getShaderBindGroup();
	    if ( shaderBindGroup == null ) {
            shaderBindGroup = this.device.createBindGroup( {
                layout: this.pipeline.getBindGroupLayout(0),
                entries: [ {
                    binding: 0,
                    resource: {
                        buffer: this.uniformShaderLocation,
                    }
                } ]
            } );
            this.setShaderBindGroup( shaderBindGroup );
        }

        let textureBindGroup = this.getTextureBindGroup();
	    if ( textureBindGroup == null ) {
            textureBindGroup = this.device.createBindGroup( {
            layout: this.pipeline.getBindGroupLayout( 1 ),
            entries: [ 
                {
                    binding: 0,
                    resource: this.sampler,
                },
                {
                    binding: 1,
                    resource: this.nullTexture.createView( {
                        baseMipLevel: 0,
                        mipLevelCount: 1
                    } ) ,
                } 
            ]
	        } );
            this.getTextureBindGroup( textureBindGroup );
        }

        this.passEncoder.setPipeline( this.pipeline );

        this.passEncoder.setBindGroup( 0, shaderBindGroup );
        this.passEncoder.setBindGroup( 1, textureBindGroup );

        this.color += this.itcolor;

        if ( this.color >= 1.0 ) {
            this.itcolor = -0.01;
            this.color = 1.0;
        } else if ( this.color < 0 ) { 
            this.itcolor = +0.01; 
            this.color = 0;
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Draw image
        ////////////////////////////////////////////////////////////////////////////////

        let sBW = this.getBorderWidth();

        let sW = this.getCanvasWidth( false );
        let sH = this.getCanvasHeight( false );

        //let object = window.getDrawParams.call();

        this.spline.set( sBW, sBW, sW, sH );
        //await this.spline.drawConfig( this, object, window.samplerate, window.volumerate, window.kdX, window.kdY, window.zoomX, window.zoomY, 1 );

        let iW = 100 * this.color * 4;
        let iH = 100 * this.color * 4;
        
        let iX = sBW + ( sW - iW ) / 2.0;
        let iY = sBW + ( sH - iH ) / 2.0;

        //this.image.set( iX, iY, iW, iH );
        //await this.image.draw( this );

        ////////////////////////////////////////////////////////////////////////////////////
        // let bW = sW;
        // let bH = sH;
        ////////////////////////////////////////////////////////////////////////////////////

        // this.box.set( 20, 20, bW, bH, 1 );
        // await this.box.draw( this, [                         
        //     { from: [ this.color, 1.0 - this.color, this.color, 1.0 ], to: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ] },
        //     { from: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ], to: [ this.color, 1.0 - this.color, this.color, 1.0 ] },
        //     { from: [ this.color, 1.0 - this.color, this.color, 1.0 ], to: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ] },
        //     { from: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ], to: [ this.color, 1.0 - this.color, this.color, 1.0 ] } 
        // ] );

/*
        let sY = sH / window.kdY;

        this.pointsline.clear();
        for ( let i = 0; i < sH; i = i + sY )
        {
            this.pointsline.append( sBW, sBW + i, sBW + sW, sBW + i, 1, { from: [ 0.5, 0.5, 0.5, 0.5 ], to:[ 0.5, 0.5, 0.5, 0.5 ] } );
        }
        await this.pointsline.draw( this );
*/

        //this.nativepointsline.clear();
        //this.nativepointsline.append( 200, 20, 220, 100, 1, { from: [ 1.0,1.0,0.0,1.0 ], to:[ 1.0,0.0,0.0,1.0 ] } );
        //await this.nativepointsline.draw( this );
        
        ////////////////////////////////////////////////////////////////////////////////////
        // wDLabel example is completed
        ////////////////////////////////////////////////////////////////////////////////////
        //let textColor = "rgb(255, 255, 255)";
        //let backgroundColor = "rgb(0, 0, 0)";
        //
        //this.label.set( 10, 320, 320 );
        //await this.label.draw( this, textColor, backgroundColor, "100.001N", true, true );
        //await this.label.render( this );
        ////////////////////////////////////////////////////////////////////////////////////

        let flag = false;
        if ( window.isInit() > 0 ) {
            let nameoffile = window["nameoffile"];
            let _colors = [
                { from: [ 1.0, 0.0, 0.0, 1.0 ], to: [ 1.0, 0.0, 0.0, 1.0 ] },
                { from: [ 0.0, 1.0, 0.0, 1.0 ], to: [ 0.0, 1.0, 0.0, 1.0 ] },
            ]             
            if ( window["hold-chart"] == true && window["hold-buffer"] != undefined ) {
                await this.spline.drawData( this, window["hold-buffer"], window["channels"], window["rendertype"] , window["samplerate"], 1, window.kdX, window.kdY, window.zoomX, window.zoomY, 1, _colors );
                flag = true;
            } else if ( window.isExist( nameoffile ) > 0 ) {
                if ( window.isPlaying() > 0 ) {
                    /////////////////////////////////////////////////////////////////////////////////
                    // differet render types of channels
                    let _rendertype = window["rendertype"];
                    /////////////////////////////////////////////////////////////////////////////////
                    // number of channels
                    let _channels = window.getchannels( nameoffile );
                    window["channels"] = _channels;
                    /////////////////////////////////////////////////////////////////////////////////
                    // samplerate of the file
                    let _samplerate = window.getsamplerate( nameoffile );
                    window["samplerate"] = _samplerate;
                    if ( ( window["hold-chart"] == true || window["hold-chart"] == false ) && window["hold-buffer"] == undefined ) {
                        /////////////////////////////////////////////////////////////////////////////////
                        // frames of the file
                        let _framestotal = window.getframes( nameoffile );
                        /////////////////////////////////////////////////////////////////////////////////
                        // current playback offset of the file					
                        let _frameoffset = window.playbackoffset();
                        if ( _framestotal > _frameoffset ) {
                            let _countofframes = _samplerate * _channels;
                            let _memptr = window.malloc( _countofframes * _channels * SIZE_OF_FLOAT );
                            let _framescount = window.getcurrentbuffer( nameoffile, _frameoffset, _memptr, _countofframes );
                            if ( _framescount > 0 ) { 
                                let _buffer = window.copy( _memptr, _framescount * _channels * SIZE_OF_FLOAT );
                                if ( window["hold-chart"] == true ) window["hold-buffer"] = new Float32Array( _buffer );
                                await this.spline.drawData( this, _buffer, _channels, _rendertype, _samplerate, 1, window.kdX, window.kdY, window.zoomX, window.zoomY, 1, _colors );
                                flag = true;
                            }
                            if ( _memptr > 0 ) window.free( _memptr );
                        } else {
                            window.stopplayback();
                        }
                    }
                } 
            } 
        } 
        if ( flag == false ) await this.spline.drawData( this, null, null, "stereo", window.samplerate, window.volumerate, window.kdX, window.kdY, window.zoomX, window.zoomY, 1 );

        ////////////////////////////////////////////////////////////////////////////////////
        // wDCircle example is completed
        ////////////////////////////////////////////////////////////////////////////////////
        //this.circle.set( 10, 10, 6, 1 );
        this.circle.set( sBW + sW / 2.0, sBW + sH / 2.0, 100 * ( 1.0 - this.color ) * 2, 1 );
        await this.circle.draw( this, [ 1.0, 0.0, 0.0, 1.0 ] );
        ////////////////////////////////////////////////////////////////////////////////////

        this.passEncoder.end();
        this.device.queue.submit( [ this.commandEncoder.finish() ] );

        ////////////////////////////////////////////////////////////////////////////////////
        // shaderBindGroup
        // textureBindGroup
        ////////////////////////////////////////////////////////////////////////////////////

        requestAnimationFrame( this.render );
    }
};

