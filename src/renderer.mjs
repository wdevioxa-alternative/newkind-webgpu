import { GLine } from './line.mjs';
import { GBox } from './box.mjs';
import { GSpline } from './spline.mjs';
import { GLabel } from './label.mjs';
import { GImage } from './image.mjs';

import vertexShaderWgslCode from './shaders/shader.vert.wgsl'
import fragmentShaderWgslCode from './shaders/shader.frag.wgsl'

export class WDevApplication
{
    constructor() 
    {
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
    calcRX( cx ) 
    {
        let cw = Math.fround(this.getCanvasWidth() / 2.0);
        let it = 1.0 / cw;
        return Math.round( ( cx + 1.0 ) / it );
    }
    calcRY( cy ) 
    {
        let ch = Math.fround(this.getCanvasHeight() / 2.0);
        let it = 1.0 / ch;
        return this.getCanvasHeight() - Math.round( ( cy + 1.0 ) / it );
    }
    calcX( cx ) 
    {
        let cw = Math.fround(this.getCanvasWidth() / 2.0);
        let it = 1.0 / cw;
        return Math.fround(cx) * it - 1.0;
    }
    calcY( cy ) 
    {
        let ccy = this.getCanvasHeight() - cy;
        let ch = Math.fround(this.getCanvasHeight() / 2.0);
        let it = 1.0 / ch;
        return Math.fround(ccy) * it - 1.0;
    }
    calcScale( origWholeSize, scaleWholeSize, scaleItem )
    {
        return ( ( origWholeSize * scaleItem ) / scaleWholeSize );
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
            if (!navigator.gpu) 
                throw('Your browser does`t support WebGPU or it is not enabled.');

            const wgerr = document.getElementById('error');
            wgerr.style.display = 'none';

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
                compositingAlphaMode: "opaque",
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

            this.setShaderFlagBuffer( 
		this.createOnlyBuffer( 4, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC, this.device ) 
            );
            this.setShaderFlag( true, 0 );

            this.sampler = this.device.createSampler({
                magFilter: 'linear',  // linear
                minFilter: 'linear'   // linear
            });

            this.emptyTexture = this.device.createTexture({
                size: [ 10, 10, 1 ],
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
            alert(e);
	}
    }

    start = async() => {
	await this.init();
        await this.resources();
	await this.render();
    }

    async resources()
    {
////////////////////////////////////////////////////////////////////////////////////////////////////////
//        this.spline = new GSpline( 0, 0, this.getCanvasWidth(), this.getCanvasHeight() );
////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.line = new GLine( this, 10, 140, 200, 1 );
	await this.line.initialize();
	this.box = new GBox( this, 10, 10, 100, 100 );
	await this.box.initialize();
	this.image = new GImage( this, "assets/Di-3d.png", 150, 10, 100, 100 );
	await this.image.initialize();
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
            0,
            0,
            this.getCanvasWidth(),
            this.getCanvasHeight()
        );     

        let shaderBindGroup = this.device.createBindGroup( {
		layout: this.pipeline.getBindGroupLayout(0),
		entries: [ {
			binding: 0,
			resource: {
				buffer: this.shaderFlagBuffer,
			}
		} ]
	} );
        let textureBindGroup = this.device.createBindGroup( {
		layout: this.pipeline.getBindGroupLayout( 1 ),
		entries: [ 
                    {
			binding: 0,
			resource: this.sampler,
		    },
		    {
			binding: 1,
			resource: this.emptyTexture.createView( {
                            baseMipLevel: 0,
                            mipLevelCount: 1
                        } ) ,
		    } 
                ]
	} );

	this.passEncoder.setPipeline( this.pipeline );

        this.passEncoder.setBindGroup( 0, shaderBindGroup );
        this.passEncoder.setBindGroup( 1, textureBindGroup );

	await this.box.draw( this, [ 0.0, 1.0, 0.0, 1.0 ] );
	await this.line.draw( this, { from: [ 1.0, 0.0, 0.0, 1.0 ], to: [ 0.0, 1.0, 0.0, 1.0 ] } );
	await this.image.draw( this );

/*       
	var objectparam = window.getDrawParams.call();

        for ( var i = 0; i < objectparam.draw.length; i++ ) 
        {
            if ( objectparam.draw[i].coords.visibility === true ) {
                await this.spline.draw( this, objectparam.draw[i].coords.x.min, objectparam.draw[i].coords.x.max, objectparam.draw[i].coords.x.dprepeats, objectparam.draw[i].coords.y.min, objectparam.draw[i].coords.y.max, objectparam.draw[i].coords.y.dprepeats, objectparam.draw[i].coords.color );
		break;
            }
        }

	for ( var i = 0; i < objectparam.draw.length; i++ ) 
        {
            await this.spline.functionDraw( this, objectparam.draw[i].coords.x.min, objectparam.draw[i].coords.x.max, objectparam.draw[i].coords.x.dprepeats, objectparam.draw[i].dpoints, objectparam.draw[i].func, objectparam.draw[i].color );
	}
*/
        this.passEncoder.end();
        this.device.queue.submit( [ this.commandEncoder.finish() ] );

        requestAnimationFrame( this.render );
    }
};

