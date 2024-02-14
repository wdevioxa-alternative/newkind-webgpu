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
    setCanvas( canvas ) 
    {
        this.canvas = canvas;
    }
    getCanvas() 
    {
        return this.canvas;
    }
    getCanvasWidth() 
    {
        return this.canvas.width;
    }
    getCanvasHeight() 
    {
        return this.canvas.height;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // calc from webgpu to screen coordinates (0 : 1366)
    calcRX( cx ) 
    {
        let cw = Math.fround( this.getCanvasWidth() / 2.0 );
        let point = 1.0 / cw;
        return Math.round( ( cx + 1.0 ) / point );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // calc from webgpu to screen coordinates (0 : 1366)
    calcRY( cy ) 
    {
        let ch = Math.fround( this.getCanvasHeight() / 2.0 );
        let point = 1.0 / ch;
        return this.getCanvasHeight() - Math.round( ( cy + 1.0 ) / point );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // calc to webgpu coords -1 : +1
    calcX( cx ) 
    {
        let cw = this.getCanvasWidth();
        let translate = 2.0 * cx / cw - 1.0;
        return translate;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // calc to webgpu coords -1 : +1
    calcY( cy ) 
    {
        let ch = this.getCanvasHeight();
        let translate = 1.0 - 2.0 * cy / ch;
        return translate;
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
            if ( !navigator.gpu ) 
                throw('Your browser does`t support WebGPU or it is not enabled.');

            const wgerr = document.getElementById('error');
            wgerr.style.display = 'none';

            const wcg = document.getElementById('controlgroup');
            wcg.style.display = 'block';

            const wgfx = document.getElementById('gfx');
            wgfx.style.display = 'block';

            this.setCanvas( wgfx );
        } catch ( e ) {
            throw( e );
        }
    }
    async init()
    {	
        try {

            this.adapter = await navigator.gpu.requestAdapter();
            this.device = await this.adapter.requestDevice();

            if (!this.context)
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
                } } );

                this.setUniformShaderLocation (
                    this.setUniformShaderFlag( this.device, 0 )
                );

                this.sampler = this.device.createSampler({
                    magFilter: 'linear',  // linear
                    minFilter: 'linear'   // linear
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

        this.image = new wDImage( this, "assets/Di-3d.png" );
        await this.image.init();

        this.spline = new wDSpline( this, 0, 0, this.getCanvasWidth(), this.getCanvasHeight() );
        await this.spline.init();
        
        //this.label = new wDLabel( this, 'lighter', 10, 'Segoe UI Light', 0, 0, 128, 128 );
        //await this.label.init();

        this.pointsline = new wDLine( this );
        await this.pointsline.init();
        
        this.nativepointsline = new wDNativeLine( this );
        await this.nativepointsline.init();

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
            9,
            9,
            this.getCanvasWidth() - 18,
            this.getCanvasHeight() - 18
        );     

        let shaderBindGroup = this.getShaderBindGroup();
	    if ( shaderBindGroup == null ) {
            shaderBindGroup = this.device.createBindGroup( {
                layout: this.pipeline.getBindGroupLayout(0),
                entries: [ {
                    binding: 0,
                    resource: {
                        buffer: this.uniformlShaderLocation,
                    }
                } ]
            } );
            this.setShaderBindGroup(shaderBindGroup);
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
            this.getTextureBindGroup(textureBindGroup);
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
        let sW = this.getCanvasWidth();
        let sH = this.getCanvasHeight();

        let iW = 100 * this.color * 4;
        let iH = 100 * this.color * 4;
        
        let iX = ( sW - iW ) / 2.0;
        let iY = ( sH - iH ) / 2.0;

        this.image.set( iX, iY, iW, iH );
        await this.image.draw( this );

        let bW = sW - 40;
        let bH = sH - 40;

        // this.box.set( 20, 20, bW, bH, 1 );
        // await this.box.draw( this, [                         
        //     { from: [ this.color, 1.0 - this.color, this.color, 1.0 ], to: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ] },
        //     { from: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ], to: [ this.color, 1.0 - this.color, this.color, 1.0 ] },
        //     { from: [ this.color, 1.0 - this.color, this.color, 1.0 ], to: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ] },
        //     { from: [ 1.0 - this.color, this.color, 1.0 - this.color, 1.0 ], to: [ this.color, 1.0 - this.color, this.color, 1.0 ] } 
        // ] );
        
        ////////////////////////////////////////////////////////////////////////////////////
        // wDCircle example is completed
        ////////////////////////////////////////////////////////////////////////////////////
        //this.circle.set( 10, 10, 6, 1 );

        this.circle.set( sW / 2.0, sH / 2.0, 100 * ( 1.0 - this.color ) * 2, 1 );
        await this.circle.draw( this, [ 1.0, 0.0, 0.0, 1.0 ] );
        ////////////////////////////////////////////////////////////////////////////////////

        //this.pointsline.clear();
        //this.pointsline.append( 100, 100, 101, 100, 1, { from: [ 1.0, 1.0, 0.0, 1.0 ], to:[ 1.0, 0.0, 0.0, 1.0 ] } );
        //await this.pointsline.draw( this );

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

        //console.log( this.calcX( 1366 ) ); 
        console.log( this.calcRX( 1.0 ) );

        let object = window.getDrawParams.call();

        this.spline.set( 10, 10, sW - 20, sH - 20 );
        await this.spline.draw( this, object, window.samplerate, window.volumerate, window.kdX, window.kdY, window.zoomX, window.zoomY );

        this.passEncoder.end();
        this.device.queue.submit( [ this.commandEncoder.finish() ] );

        // shaderBindGroup
        // textureBindGroup

        requestAnimationFrame( this.render );
    }
};

