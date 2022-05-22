
struct lineOut {
    @builtin(position) outPosition: vec4<f32>,
    @location(0) outColor : vec4<f32>
}

struct triangleOut {
    @builtin(position) outPosition: vec4<f32>,
    @location(0) outFragUV : vec2<f32>
}

@stage(vertex)
fn main( @location(0) inPosition: vec3<f32>, @location(1) inColor : vec4<f32> ) -> lineOut {
    var vertex: lineOut;
    vertex.outPosition = vec4<f32>(inPosition, 1.0);
    vertex.outColor = inColor;
    return vertex;
}

@stage(vertex)
fn drawTexture( @location(0) inPosition: vec2<f32>, @location(1) inFragUV : vec2<f32> ) -> triangleOut {
    var vertex: triangleOut;
    vertex.outPosition = vec4<f32>(inPosition, 0.0, 1.0);
    vertex.outFragUV = inFragUV;
    return vertex;
}

