@group(0) @binding(0) var bindSampler : sampler;
@group(0) @binding(1) var bindTexture : texture_2d<f32>;

@stage(fragment)
fn main(@location(0) inColor : vec4<f32>) -> @location(0) vec4<f32> 
{
   return inColor;
} 

@stage(fragment)
fn drawTexture(@location(0) inFragUV : vec2<f32>) -> @location(0) vec4<f32> 
{
   return textureSample(bindTexture, bindSampler, inFragUV);
}    
