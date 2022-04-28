import { GBox } from './box.mjs';
import { GSpline } from './spline.mjs';
import { GLabel } from './label.mjs';
import vertexShaderWgslCode from './shaders/shader.vert.wgsl'
import fragmentShaderWgslCode from './shaders/shader.frag.wgsl'

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
    calcRX( cx ) {
        let cw = Math.fround(this.getCanvasWidth() / 2.0);
        let it = 1.0 / cw;
        return Math.round( ( cx + 1.0 ) / it );
    }
    calcRY( cy ) {
        let ch = Math.fround(this.getCanvasHeight() / 2.0);
        let it = 1.0 / ch;
        return this.getCanvasHeight() - Math.round( ( cy + 1.0 ) / it );
    }
    calcX( cx ) {
        let cw = Math.fround(this.getCanvasWidth() / 2.0);
        let it = 1.0 / cw;
        return Math.fround(cx) * it - 1.0;
    }
    calcY( cy ) {
        let ccy = this.getCanvasHeight() - cy;
        let ch = Math.fround(this.getCanvasHeight() / 2.0);
        let it = 1.0 / ch;
        return Math.fround(ccy) * it - 1.0;
    }
    calcScale( maxSize, scaleMaxSize, scaleItem )
    {
        return ( ( maxSize * scaleItem ) / scaleMaxSize );
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
          size: { width: source.width, height: source.height, depth: 1 },
          format: 'rgba8unorm',
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
        };
      
        if (generateMipmaps) {
          textureDescriptor.mipLevelCount = Math.floor(Math.log2(Math.max(source.width, source.height))) + 1;
          textureDescriptor.usage |= GPUTextureUsage.RENDER_ATTACHMENT;
        }
      
        const texture = gpuDevice.createTexture(textureDescriptor);
      
        gpuDevice.queue.copyExternalImageToTexture({ source }, { texture }, textureDescriptor.size);
      
        if (generateMipmaps) {
          this.webGPUGenerateMipmap(gpuDevice, texture, textureDescriptor);
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
              @builtin(position) position : vec4<f32>,
              @location(0) texCoord : vec2<f32>
            };
      
            @stage(vertex)
            fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
              var output : VertexOutput;
              output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
              output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
              return output;
            }
      
            @group(0) @binding(0) var bindSampler : sampler;
            @group(0) @binding(1) var bindTexture : texture_2d<f32>;
      
            @stage(fragment)
            fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {
              return textureSample(bindTexture, bindSampler, texCoord);
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
              //loadValue: [0, 0, 0, 0],
              loadOp: 'clear',
              storeOp: 'store'
            }],
          });
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
          passEncoder.end();
      
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
                size: [ this.getCanvasWidth(), this.getCanvasHeight(), 1 ],
                compositingAlphaMode: "opaque",
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            });
        }       
    }
    async initializeResources()
    {
        this.texturePipeline = this.device.createRenderPipeline({
            vertex: {
                module: this.device.createShaderModule({
                    code: vertexShaderWgslCode
                }),
                entryPoint: 'drawTexture',
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
                            shaderLocation: 1, // [[location(2)]]
                            offset: 0,
                            format: 'float32x2'
                        }],
                        arrayStride: 4 * 2, // sizeof(float) * 4
                        stepMode: 'vertex'
                    }
                ]
            },
            fragment: {
                module: this.device.createShaderModule({
                    code: fragmentShaderWgslCode
                }),
                entryPoint: 'drawTexture',
                targets: [{
                    format: 'bgra8unorm'
                }]
            },
            primitive: {
                topology: 'triangle-list'
            }          
        });
        this.linePipeline = this.device.createRenderPipeline({
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
                topology: 'line-list'
            }          
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
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
                loadOp: 'clear',
                storeOp: 'store'
            }]          
        });    
        ////////////////////////////////////////
        // вписаться в размер браузера
        ////////////////////////////////////////
/*        
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
*/        
    }
    render = async () => {

        this.colorTexture = this.context.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();

        this.encodeCommands();

        ////////////////////////////////////////////
        // рисовать линиями
        ////////////////////////////////////////////
        this.passEncoder.setPipeline(this.linePipeline);
/*        
        let box = new GBox( 1, 1, 126, 18 );
        await box.draw( this, [1.0,1.0,0.0,1.0] );
        box.setY(22);
        await box.draw( this, [1.0,0.0,1.0,1.0] );
*/
        let spline = new GSpline( 1, 1, this.getCanvasWidth() - 2, this.getCanvasHeight() - 2 );

        const iterations = 58;

        await spline.functionDraw( this, 0, 4 * Math.PI, -1, 1, iterations, ( x ) => {
          return Math.sin( x );
        }, [ 1.0, 0.0, 0.0, 1.0 ] );

        await spline.functionDraw( this, 0, 4 * Math.PI, -1, 1, iterations, ( x ) => {
          return Math.cos( x );
        }, [ 0.0, 1.0, 0.0, 1.0 ] );

        await spline.functionDraw( this, 10, 20, -50, 50, iterations, ( x ) => {
          return 2 * x - 10;
        }, [ 0.0, 1.0, 1.0, 1.0 ] );

        await spline.draw( this, 0, 4 * Math.PI, iterations, [ 1.0, 1.0, 1.0, 1.0 ] );

        ////////////////////////////////////////////////////////////////////////////
        // рисовать треугольниками ( нужно для отображения текстур )
        ////////////////////////////////////////////////////////////////////////////
        this.passEncoder.setPipeline(this.texturePipeline);
/*
        let text = new GLabel( 100, 10,'Verdana', 100, 70, 128, 128 );
        await text.draw( this, 'rgba(0, 255, 0, 1.0)', 'rgba(255, 0, 0, 1.0)', 'another1  Hello World!!!', true );
        text.setX(100);
        text.setY(100);
        await text.draw( this, 'black', 'gray',  'another2  Hello World!!!', true );
        text.setX(100);
        text.setY(130);
        await text.draw( this, 'green', 'black', 'another3  Hello World!!!', true );
*/
        this.passEncoder.end();
        this.queue.submit([this.commandEncoder.finish()]);

        this.positionBuffer.destroy();
        this.colorBuffer.destroy();
        this.fragUVBuffer.destroy();

        requestAnimationFrame(this.render);
    }
};

