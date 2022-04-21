import { GBox } from './box';
import { GChart } from './chart';

const vertexShaderWgslCode = require('./shaders/triangle.vert.wgsl');
const fragmentShaderWgslCode = require('./shaders/triangle.frag.wgsl');

export class Application
{
    constructor(surface) {
        this.canvas = surface;
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
                throw('Your browser does`t support WebGPU or it is not enabled. More info: https://webgpu.io');
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
        this.depthTexture = this.device.createTexture({
            size: [this.getCanvasWidth(), this.getCanvasHeight(), 1],
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
        });
        this.depthTextureView = this.depthTexture.createView();
    }
    async initializeResources()
    {
        this.pipeline = this.device.createRenderPipeline({
            layout: this.device.createPipelineLayout({ bindGroupLayouts: [] }),
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
                            format: 'float32x3'
                        }],
                        arrayStride: 4 * 3, // sizeof(float) * 3
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
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8'
            }
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
            depthStencilAttachment: {
                view: this.depthTextureView,
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                stencilLoadOp: 'clear',
                stencilStoreOp: 'store'
            }
        });
        this.passEncoder.setPipeline(this.pipeline);
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
    render = () => {
        this.colorTexture = this.context.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();

        this.encodeCommands();

        this.component = new GBox(1,1,126,18);

        this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        this.component = new GBox(1,22,126,18);

        this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        this.component = new GChart(1, 43, 600, 200);
  
        this.positionBuffer = this.createBuffer(this.component.getBorderPositions(this), GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(this.component.getBorderColors(this), GPUBufferUsage.VERTEX,this.device);

        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);

        this.passEncoder.draw(8,1,0,0);

        this.defaulColor = [0.0,1.0,0.0];

        const now = Date.now();

        if ( !this.prevtime ) this.prevtime = now;
        if ( now != this.prevtime ) 
        {
            if ( ( now - this.prevtime ) > 42 ) 
            {
                let g1 = Math.cos(now / 1000);
                let g2 = Math.cos(now / 1000 + Math.PI / 2.0);
                let g3 = Math.cos(now / 1000 + Math.PI );
                let g4 = Math.cos(now / 1000 + 3.0 * Math.PI / 2.0);

                this.defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0 ];
                this.defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0 ];
                this.defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5 ];
                this.defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0 ];
        
                this.component.appendItem(this,[10,100,0.0],this.defaultColor4);
                this.component.appendItem(this,[10,200,0.0],this.defaultColor1);

                this.component.appendItem(this,[10,200,0.0],this.defaultColor1);
                this.component.appendItem(this,[400,200,0.0],this.defaultColor2);

                this.component.appendItem(this,[400,200,0.0],this.defaultColor2);
                this.component.appendItem(this,[400,100,0.0],this.defaultColor3);

                this.component.appendItem(this,[400,100,0.0],this.defaultColor3);
                this.component.appendItem(this,[10,100,0.0],this.defaultColor4);

                this.positionBuffer = this.createBuffer(this.component.getPositions(this), GPUBufferUsage.VERTEX,this.device);
                this.colorBuffer = this.createBuffer(this.component.getColors(this), GPUBufferUsage.VERTEX,this.device);

                this.passEncoder.setVertexBuffer(0, this.positionBuffer);
                this.passEncoder.setVertexBuffer(1, this.colorBuffer);

                this.passEncoder.draw(8,1,0,0);
            }
        }

        this.passEncoder.end();
        this.queue.submit([this.commandEncoder.finish()]);

        requestAnimationFrame(this.render);
    }
};

