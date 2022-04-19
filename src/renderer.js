const vertexShaderWgslCode = require('./shaders/triangle.vert.wgsl');
const fragmentShaderWgslCode = require('./shaders/triangle.frag.wgsl');

const positions = new Float32Array([
    1.0, -1.0, 0.0,
   -1.0, -1.0, 0.0,
    0.0,  1.0, 0.0
]);

const colors = new Float32Array([
    1.0, 0.0, 0.0, // 🔴
    0.0, 1.0, 0.0, // 🟢
    0.0, 0.0, 1.0  // 🔵
]);

const indices = new Uint16Array([ 0, 1, 2 ]);

class Application
{
    constructor(canvas) {
        this.canvas = canvas;
    }

    createBuffer(arr, usage, device) 
    {
        // 📏 Align to 4 bytes (thanks @chrimsonite)
        let desc = {
            size: (arr.byteLength + 3) & ~3,
            usage,
            mappedAtCreation: true
        };
        let buffer = device.createBuffer(desc);
        const writeArray =
            arr instanceof Uint16Array
                ? new Uint16Array(buffer.getMappedRange())
                : new Float32Array(buffer.getMappedRange());
        writeArray.set(arr);
        buffer.unmap();
        return buffer;
    };

    async start() 
    {
        if (!navigator.gpu) {
            alert('Your browser does`t support WebGPU or it is not enabled. More info: https://webgpu.io');
            return;
        }

        const adapter = await navigator.gpu.requestAdapter();
        const device = await adapter.requestDevice();

        const context = this.canvas.getContext('webgpu');

        const devicePixelRatio = window.devicePixelRatio || 1;
        const presentationSize = [
            this.canvas.clientWidth  * devicePixelRatio,
            this.canvas.clientHeight * devicePixelRatio,
        ];
        const presentationFormat = context.getPreferredFormat(adapter);
        context.configure({
            device,
            format: presentationFormat,
            size: presentationSize,
        });
/* 
        const vertexShaderWgslCode =
            `
            @stage(vertex)
            fn main(@builtin(vertex_index) VertexIndex : u32)
                -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5));
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            }
        `;

        const fragmentShaderWgslCode =
            `
            @stage(fragment)
            fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(1.0, 0.0, 0.0, 1.0);
            }
        `;
  */
        const positionBuffer = this.createBuffer(positions, GPUBufferUsage.VERTEX,device);
        const colorBuffer = this.createBuffer(colors, GPUBufferUsage.VERTEX,device);
        const indexBuffer = this.createBuffer(indices, GPUBufferUsage.INDEX,device);
        const colorState = {
            format: 'bgra8unorm'
        };
        const positionAttribDesc = {
            shaderLocation: 0, // [[location(0)]]
            offset: 0,
            format: 'float32x3'
        };
        const colorAttribDesc = {
            shaderLocation: 1, // [[location(1)]]
            offset: 0,
            format: 'float32x3'
        };
        const positionBufferDesc = {
            attributes: [positionAttribDesc],
            arrayStride: 4 * 3, // sizeof(float) * 3
            stepMode: 'vertex'
        };
        const colorBufferDesc = {
            attributes: [colorAttribDesc],
            arrayStride: 4 * 3, // sizeof(float) * 3
            stepMode: 'vertex'
        };
        const pipelineLayoutDesc = { bindGroupLayouts: [] };
        const pipeline = device.createRenderPipeline({
            layout: device.createPipelineLayout(pipelineLayoutDesc),
            vertex: {
                module: device.createShaderModule({
                    code: vertexShaderWgslCode
                }),
                entryPoint: 'main',
                buffers: [positionBufferDesc, colorBufferDesc]
            },
            fragment: {
                module: device.createShaderModule({
                    code: fragmentShaderWgslCode
                }),
                entryPoint: 'main',
                targets: [colorState]
            },
            primitive: {
                frontFace: 'cw',
                cullMode: 'none',
                topology: 'triangle-list'
            },
            /*
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus-stencil8'
            }
            */
        });
        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const renderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                storeOp: 'store',
            }]
        };
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setViewport(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
            0,
            1
        );
        passEncoder.setScissorRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        passEncoder.setVertexBuffer(0, positionBuffer);
        passEncoder.setVertexBuffer(1, colorBuffer);
        passEncoder.setIndexBuffer(indexBuffer, 'uint16');
        passEncoder.drawIndexed(3, 1);
        passEncoder.end();
        device.queue.submit([commandEncoder.finish()]);
    };
};

module.exports = Application;
