const vertexShaderWgslCode = require('./shaders/triangle.vert.wgsl');
const fragmentShaderWgslCode = require('./shaders/triangle.frag.wgsl');

const colors = new Float32Array([
    1.0, 0.0, 0.0, // 🔴
    0.0, 1.0, 0.0, // 🟢
    0.0, 1.0, 0.0, // 🟢
    0.0, 0.0, 1.0, // 🔵
    0.0, 0.0, 1.0, // 🔵
    0.0, 1.0, 0.0, // 🟢
    0.0, 1.0, 0.0, // 🟢
    1.0, 0.0, 0.0  // 🔴
]);

//const indexes = new Uint16Array([ 0, 1 ]);
const indexes = new Uint16Array([ 0, 1, 2, 3, 4, 5, 6, 7 ]);

class Application
{
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    calcX( cx ) {
        //const devicePixelRatio = window.devicePixelRatio || 1;
        let cw = Math.fround(this.canvas.width);
        let item = 2.0 / cw;
        return Math.fround(cx) * item - 1.0;
    }

    calcY( cy ) {
        //const devicePixelRatio = window.devicePixelRatio || 1;
        let ch = Math.fround(this.canvas.height);
        let item = 2.0 / ch;
        //alert( item + " " + Math.fround(cy) + " " + cy );
        return Math.fround(cy) * item - 1.0;
    }

    async start() 
    {
        if (await this.initializeAPI()) {
            this.resizeBackings();
            await this.initializeResources();
            this.render();
        }
    }
    createBuffer(arr, usage, device) 
    {
        let desc = {
            size: arr.byteLength,
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
            const presentationSize = [
                this.canvas.width,
                this.canvas.height,
            ];
            const presentationFormat = this.context.getPreferredFormat(this.adapter);
            this.context.configure({
                device: this.device,
                format: presentationFormat,
                size: presentationSize,
                usage:
                        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            });
        }
        this.depthTexture = this.device.createTexture({
            size: [this.canvas.width, this.canvas.height, 1],
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
        });
        this.depthTextureView = this.depthTexture.createView();
    }

    async initializeResources()
    {
        const positions = new Float32Array([
            this.calcX(0), this.calcY(319), 0.0,
            this.calcX(320), this.calcY(319), 0.0,

            this.calcX(320), this.calcY(319), 0.0,
            this.calcX(320), this.calcY(1), 0.0,

            this.calcX(320), this.calcY(1), 0.0,
            this.calcX(1), this.calcY(1), 0.0,

            this.calcX(1), this.calcY(1), 0.0,
            this.calcX(1), this.calcY(319), 0.0

        ]);

        this.positionBuffer = this.createBuffer(positions, GPUBufferUsage.VERTEX,this.device);
        this.colorBuffer = this.createBuffer(colors, GPUBufferUsage.VERTEX,this.device);
        this.indexBuffer = this.createBuffer(indexes, GPUBufferUsage.INDEX,this.device);

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
        const devicePixelRatio = window.devicePixelRatio || 1;
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
            this.canvas.width,
            this.canvas.height,
            0,
            1
        );
        this.passEncoder.setScissorRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);
        this.passEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
        this.passEncoder.drawIndexed(8,1);
        this.passEncoder.end();

        this.queue.submit([this.commandEncoder.finish()]);
    }
    render = () => {
        this.colorTexture = this.context.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();
        this.encodeCommands();
        requestAnimationFrame(this.render);
    }
};

module.exports = Application;
