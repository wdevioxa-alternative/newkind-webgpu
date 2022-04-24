import { GBox } from './box.mjs';
import { GSpline } from './spline.mjs';
import { GText } from './text.mjs';
import vertexShaderWgslCode from './shaders/triangle.vert.wgsl'
import fragmentShaderWgslCode from './shaders/triangle.frag.wgsl'

export class Application
{
    constructor(surface) {
        this.canvas = surface;
    }
    getCanvas() {
        return this.canvas;
    }
    getCanvasWidth() {
        return this.canvas.width;
    }
    getCanvasHeight() {
        return this.canvas.height;
    }
    calcX( cx ) {
        let cw = Math.fround(this.getCanvasWidth() / 2.0);
        let item = 1.0 / cw;
        return Math.fround(cx) * item - 1.0;
    }
    calcY( cy ) {
        let ccy = this.getCanvasHeight() - cy;
        let ch = Math.fround(this.getCanvasHeight() / 2.0);
        let item = 1.0 / ch;
        return Math.fround(ccy) * item - 1.0;
    }
    calcScale( maxsize, scalemaxsize, scaleitem )
    {
        return ( ( maxsize * scaleitem ) / scalemaxsize );
    }    
    async start() 
    {
        if (await this.initializeAPI()) 
        {
            this.resizeBackings();
            await this.initializeResources();
            this.render();
        }
    }
    async restart() 
    {
        this.resizeBackings();
        await this.initializeResources();
        this.render();
    }
    webGPUTextureFromImageBitmapOrCanvas(gpuDevice, source, generateMipmaps = true) 
    {
        const textureDescriptor = {
          size: { width: source.width, height: source.height },
          format: 'rgba8unorm',
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
        };
      
        if (generateMipmaps) {
          textureDescriptor.mipLevelCount = Math.floor(Math.log2(Math.max(source.width, source.height))) + 1;
          textureDescriptor.usage |= GPUTextureUsage.RENDER_ATTACHMENT;
        }
      
        const texture = gpuDevice.createTexture(textureDescriptor);
      
        gpuDevice.queue.copyExternalImageToTexture({ source }, { texture }, textureDescriptor.size);
      
        if (generateMipmaps) {
          webGPUGenerateMipmap(gpuDevice, texture, textureDescriptor);
        }
        return texture;
    }
    webGPUGenerateMipmap(gpuDevice, texture, textureDescriptor) 
    {
        // Create a simple shader that renders a fullscreen textured quad.
        const mipmapShaderModule = gpuDevice.createShaderModule({
          code: `
            var<private> pos : array<vec2<f32>, 4> = array<vec2<f32>, 4>(
              vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, 1.0),
              vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0));
      
            struct VertexOutput {
              [[builtin(position)]] position : vec4<f32>;
              [[location(0)]] texCoord : vec2<f32>;
            };
      
            [[stage(vertex)]]
            fn vertexMain([[builtin(vertex_index)]] vertexIndex : u32) -> VertexOutput {
              var output : VertexOutput;
              output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
              output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
              return output;
            }
      
            [[binding(0), group(0)]] var imgSampler : sampler;
            [[binding(1), group(0)]] var img : texture_2d<f32>;
      
            [[stage(fragment)]]
            fn fragmentMain([[location(0)]] texCoord : vec2<f32>) -> [[location(0)]] vec4<f32> {
              return textureSample(img, imgSampler, texCoord);
            }
          `
        });
      
        const pipeline = gpuDevice.createRenderPipeline({
          vertex: {
            module: mipmapShaderModule,
            entryPoint: 'vertexMain',
          },
          fragment: {
            module: mipmapShaderModule,
            entryPoint: 'fragmentMain',
            targets: [{
              format: textureDescriptor.format // Make sure to use the same format as the texture
            }],
          },
          primitive: {
            topology: 'triangle-strip',
            stripIndexFormat: 'uint32',
          },
        });
      
        // We'll ALWAYS be rendering minified here, so that's the only filter mode we need to set.
        const sampler = gpuDevice.createSampler({ minFilter: 'linear' });
      
        let srcView = texture.createView({
          baseMipLevel: 0,
          mipLevelCount: 1
        });
      
        // Loop through each mip level and renders the previous level's contents into it.
        const commandEncoder = gpuDevice.createCommandEncoder({});
        for (let i = 1; i < textureDescriptor.mipLevelCount; ++i) {
          const dstView = texture.createView({
            baseMipLevel: i,  // Make sure we're getting the right mip level...
            mipLevelCount: 1, // And only selecting one mip level
          });
      
          const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [{
              view: dstView, // Render pass uses the next mip level as it's render attachment.
              loadValue: [0, 0, 0, 0],
              storeOp: 'store'
            }],
          });
      
          // Need a separate bind group for each level to ensure
          // we're only sampling from the previous level.
          const bindGroup = gpuDevice.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [{
              binding: 0,
              resource: sampler,
            }, {
              binding: 1,
              resource: srcView,
            }],
          });
      
          // Render
          passEncoder.setPipeline(pipeline);
          passEncoder.setBindGroup(0, bindGroup);
          passEncoder.draw(4);
          passEncoder.endPass();
      
          // The source texture view for the next iteration of the loop is the
          // destination view for this one.
          srcView = dstView;
        }
        gpuDevice.queue.submit([commandEncoder.finish()]);
    }
    createBuffer(arr, usage, device) 
    {
        let desc = {
            size: (arr.byteLength + 3) & ~3,
            usage,
            mappedAtCreation: true
        };
        let buff = device.createBuffer(desc);
        let wa =
            arr instanceof Uint16Array
                ? new Uint16Array(buff.getMappedRange())
                : new Float32Array(buff.getMappedRange());
        wa.set(arr);
        buff.unmap();
        return buff;
    }
    async initializeAPI() 
    {
        try {
            if (!navigator.gpu) 
                throw('Your browser does`t support WebGPU or it is not enabled.');
            this.adapter = await navigator.gpu.requestAdapter();
            this.device = await this.adapter.requestDevice();
            this.queue = this.device.queue;
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    resizeBackings()
    {
        const devicePixelRatio = window.devicePixelRatio || 1;
        if (!this.context) {
            this.context = this.canvas.getContext('webgpu');
            const presentationFormat = this.context.getPreferredFormat(this.adapter);
            this.context.configure({
                device: this.device,
                format: presentationFormat,
                size: [this.getCanvasWidth(), this.getCanvasHeight(), 1],
                compositingAlphaMode: "opaque",
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            });
        }
/*        
        this.depthTexture = this.device.createTexture({
            size: [this.getCanvasWidth(), this.getCanvasHeight(), 1],
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage:  GPUTextureUsage.RENDER_ATTACHMENT |
                    GPUTextureUsage.COPY_SRC
        });
        this.depthTextureView = this.depthTexture.createView();
*/        
    }
    async initializeResources()
    {
        this.pipeline = this.device.createRenderPipeline({
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
                            format: 'float32x3'
                        }],
                        arrayStride: 4 * 3, // sizeof(float) * 3
                        stepMode: 'vertex'
                    }, 
                    {
                        attributes: [{
                            shaderLocation: 1, // [[location(1)]]
                            offset: 0,
                            format: 'float32x2'
                        }],
                        arrayStride: 4 * 2, //, sizeof(float) * 2
                        stepMode: 'vertex'
                    }, 
                    {
                        attributes: [{
                            shaderLocation: 2, // [[location(2)]]
                            offset: 0,
                            format: 'float32x4'
                        }],
                        arrayStride: 4 * 4, // sizeof(float) * 4
                        stepMode: 'vertex'
                    }
                ]
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
                frontFace: 'cw',
                cullMode: 'none',
                topology: 'line-list'
            },
/*            
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8'
            }
*/            
        });
        this.sampler = this.device.createSampler({
            magFilter: 'linear',
            minFilter: 'linear'
        });
    }
    encodeCommands() 
    {
        this.commandEncoder = this.device.createCommandEncoder();
        this.passEncoder = this.commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: this.colorTextureView,
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store'
            }],
/*
            depthStencilAttachment: {
                view: this.depthTextureView,
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                stencilLoadOp: 'clear',
                stencilStoreOp: 'store'
            }
*/            
        });
        ////////////////////////////////////////
        // вписаться в размер браузера
        ////////////////////////////////////////
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
    }
    render = async () => {
        
/*
        this.component = new GBox(1,1,126,18);

        this.positionBuffer = this.createBuffer(this.component.getPositions(this),
            GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getColors(this),
            GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        //this.positionBuffer.destroy();
        //this.colorBuffer.destroy();
*/

        this.colorTexture = this.context.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();

        this.encodeCommands();

        this.component = new GBox(1,22,126,18);

        this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        //this.positionBuffer.destroy();
        //this.colorBuffer.destroy();

        this.component = new GSpline(1, 43, 600, 200);
  
        this.positionBuffer = this.createBuffer(this.component.getBorderPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getBorderColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw( 8, 1, 0, 0 );

        //this.positionBuffer.destroy();
        //this.colorBuffer.destroy();

        this.defaultColor = [ 0.6, 0.6, 0.6, 1.0 ];

  //      let now = new Date();

        let g1 = Math.cos(0);
        let g2 = Math.cos(Math.PI / 2.0);
        let g3 = Math.cos(Math.PI );
        let g4 = Math.cos(3.0 * Math.PI / 2.0);

        this.defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0, 1.0 ];
        this.defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0, 1.0 ];
        this.defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5, 1.0 ];
        this.defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0, 1.0 ];

        this.component.appendItem(this,[10,10,0.0],this.defaultColor4);
        this.component.appendItem(this,[310,10,0.0],this.defaultColor1);

        this.component.appendItem(this,[310,10,0.0],this.defaultColor1);
        this.component.appendItem(this,[310,40,0.0],this.defaultColor2);

        this.component.appendItem(this,[310,40,0.0],this.defaultColor2);
        this.component.appendItem(this,[10,40,0.0],this.defaultColor3);

        this.component.appendItem(this,[10,40,0.0],this.defaultColor3);
        this.component.appendItem(this,[10,10,0.0],this.defaultColor4);

        this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        this.component.clearItems();

        let origWidth = this.component.getWidth();
		let origHeight = this.component.getHeight();				
                
        let complexWidth = Math.PI;
        let complexHeight = 1;

        var xCount = 58;
		var xOffset = complexWidth / xCount;

		var floatX = 0;
		var floatY = 0;

	    for ( let i = 0; i < xCount; i++ ) 
		{
			let realX = this.calcScale(origWidth,complexWidth,floatX);
			let realY = origHeight-this.calcScale(origHeight,complexHeight,floatY);

            this.component.appendItem(this,[realX,realY,0.0],this.defaultColor1);

			floatX = ( i + 1 ) * xOffset;
			floatY = Math.sin( floatX );

			realX = this.calcScale(origWidth,complexWidth,floatX);
			realY = origHeight - this.calcScale(origHeight,complexHeight,floatY);
 
            this.component.appendItem(this,[realX,realY,0.0],this.defaultColor2);

            this.component.appendItem(this,[realX-1,realY+1,0.0],this.defaultColor3);
            this.component.appendItem(this,[realX-1,realY-1,0.0],this.defaultColor3);

            this.component.appendItem(this,[realX-1,realY-1,0.0],this.defaultColor3);
            this.component.appendItem(this,[realX+1,realY-1,0.0],this.defaultColor3);

            this.component.appendItem(this,[realX+1,realY-1,0.0],this.defaultColor3);
            this.component.appendItem(this,[realX+1,realY+1,0.0],this.defaultColor3);

            this.component.appendItem(this,[realX+1,realY+1,0.0],this.defaultColor3);
            this.component.appendItem(this,[realX-1,realY+1,0.0],this.defaultColor3);
        }

        let positions = this.component.getPositions(this);
        let colors = this.component.getColors(this);

        if ( colors.length == positions.length ) 
        {
            let vertexCount = positions.length / 3;

            this.positionBuffer = this.createBuffer(positions, GPUBufferUsage.VERTEX,this.device);
            this.colorBuffer = this.createBuffer(colors, GPUBufferUsage.VERTEX,this.device);

            this.passEncoder.setVertexBuffer(0, this.positionBuffer);
            this.passEncoder.setVertexBuffer(1, this.colorBuffer);

            this.passEncoder.draw(vertexCount, 1, 0, 0 );
        }

        //this.component = new GText( 100, 20,'Verdana', 10, 10, 128, 128);

        //const imageBitmap = await this.component.draw('black','Hello World!!!',false);

        //const textureText = this.webGPUTextureFromImageBitmapOrCanvas(this.device, imageBitmap, true);

/*      
        this.resultBindGroup = this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries: [
              {
                binding: 0,
                resource: this.sampler,
              },
              {
                binding: 1,
                resource: textureText.createView(),
              }
            ]
        });
*/
        this.commandEncoder = this.device.createCommandEncoder();
        
        this.passEncoder = this.commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: this.colorTextureView,
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store'
            }],
/*            
            depthStencilAttachment: {
                view: this.depthTextureView,
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                stencilLoadOp: 'clear',
                stencilStoreOp: 'store'
            }
*/            
        });


        //this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
        //this.fragUVBuffer = this.createBuffer(this.component.getFragUV(this), GPUBufferUsage.VERTEX,this.device);     
        //this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);   

        //this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        //this.passEncoder.setVertexBuffer(1, this.fragUVBuffer);
        //this.passEncoder.setVertexBuffer(2, this.colorBuffer);

        //this.passEncoder.setBindGroup(0, this.resultBindGroup);

        //this.passEncoder.draw(8,1,0,0);

        this.passEncoder.end();
        this.queue.submit([this.commandEncoder.finish()]);

        this.positionBuffer.destroy();
        this.colorBuffer.destroy();

        requestAnimationFrame(this.render);
    }
};

