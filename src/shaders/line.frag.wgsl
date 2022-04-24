@group(0) @binding(0) var bindTexture : texture_2d<f32>;
@group(0) @binding(1) var bindSampler : sampler;

@stage(fragment)
fn main(@location(0) inFragUV : vec2<f32>,
        @location(1) inColor: vec3<f32>) -> @location(0) vec4<f32> 
{
  return textureSample(bindTexture, bindSampler, inFragUV);
}    