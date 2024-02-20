import{FRAME_SIZE,WORKGROUP_SIZE}from"./constants.js";console.assert(navigator.gpu),console.assert(navigator.gpu.requestAdapter);class GPUProcessor{constructor(){this.irArray_=null,this.adapter_=null,this.device_=null}async initialize(){this.adapter_=await navigator.gpu.requestAdapter(),this.device_=await this.adapter_.requestDevice()}setIRArray(e){this.irArray_=e}async processBypass(e){const r=this.device_.createBuffer({mappedAtCreation:!0,size:FRAME_SIZE*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE}),t=r.getMappedRange();new Float32Array(t).set(e),r.unmap();const a=this.device_.createBuffer({size:FRAME_SIZE*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC});a.unmap();const n=this.device_.createShaderModule({code:`\n        @group(0) @binding(0)\n        var<storage, read> input: array<f32>;\n\n        @group(0) @binding(1)\n        var<storage, read_write> output: array<f32>;\n\n        @compute @workgroup_size(${WORKGROUP_SIZE})\n        fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {\n          output[global_id.x] = input[global_id.x] * 0.1;\n        }\n      `}),i=this.device_.createComputePipeline({layout:"auto",compute:{module:n,entryPoint:"main"}}),o=this.device_.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:r}},{binding:1,resource:{buffer:a}}]}),s=this.device_.createCommandEncoder(),u=s.beginComputePass();u.setPipeline(i),u.setBindGroup(0,o);const c=Math.ceil(FRAME_SIZE/WORKGROUP_SIZE);u.dispatchWorkgroups(c),u.end();const p=this.device_.createBuffer({size:FRAME_SIZE*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});s.copyBufferToBuffer(a,0,p,0,FRAME_SIZE*Float32Array.BYTES_PER_ELEMENT);const g=s.finish();this.device_.queue.submit([g]),await p.mapAsync(GPUMapMode.READ);const d=p.getMappedRange();return new Float32Array(d)}async processConvolution(e){let r=new Float32Array(e.length+this.irArray_.length);for(let t=0;t<r.length;t++)r[t]=t<e.length?e[t]:0;const t=this.device_.createBuffer({mappedAtCreation:!0,size:r.length*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE}),a=t.getMappedRange();new Float32Array(a).set(r),t.unmap();const n=this.device_.createBuffer({mappedAtCreation:!0,size:this.irArray_.length*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE}),i=n.getMappedRange();new Float32Array(i).set(this.irArray_),n.unmap();const o=this.device_.createBuffer({size:r.length*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC});o.unmap();const s=this.device_.createShaderModule({code:"\n        @group(0) @binding(0)\n        var<storage, read_write> input: array<f32>;\n\n        @group(0) @binding(1)\n        var<storage, read> impulse: array<f32>;\n\n        @group(0) @binding(2)\n        var<storage, read_write> output: array<f32>;\n\n        @compute @workgroup_size(256)\n        fn convolute(@builtin(global_invocation_id) global_id : vec3<u32>) {\n          if(global_id.x > arrayLength(&input) - 1) {\n              // Out of bounds.\n              return;\n          }\n\n          for(var i = 0u; i < arrayLength(&input) - 1; i = i + 1u) {\n              output[i] = 0.0;\n              for(var j = 0u; j < arrayLength(&impulse); j = j + 1u) {\n                  output[i] = output[i] + input[i - j] * impulse[j];\n              }\n          }\n        }\n      "}),u=this.device_.createComputePipeline({layout:"auto",compute:{module:s,entryPoint:"convolute"}}),c=this.device_.createBindGroup({layout:u.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:n}},{binding:2,resource:{buffer:o}}]}),p=this.device_.createCommandEncoder(),g=p.beginComputePass();g.setPipeline(u),g.setBindGroup(0,c);const d=Math.ceil(r.length/256);g.dispatchWorkgroups(d),g.end();const l=this.device_.createBuffer({size:r.length*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});p.copyBufferToBuffer(o,0,l,0,r.length*Float32Array.BYTES_PER_ELEMENT);const _=p.finish();this.device_.queue.submit([_]),await l.mapAsync(GPUMapMode.READ);const E=l.getMappedRange();return new Float32Array(E)}}export default GPUProcessor;