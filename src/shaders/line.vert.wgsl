struct vertexOut {
    @builtin(position) outPosition: vec4<f32>;
    @location(0) outFragUV : vec2<f32>;
    @location(1) outColor: vec3<f32>;
};

@stage(vertex)
fn main(@location(0) inPosition: vec3<f32>,
        @location(1) inFragUV : vec2<f32>,
        @location(2) inColor: vec3<f32>) -> vertexOut {
    var outVertex: vertexOut;
    outVertex.outPosition = vec4<f32>(inPosition, 1.0);
    outVertex.outFragUV = inFragUV;
    outVertex.outColor = inColor;
    return outVertex;
}
