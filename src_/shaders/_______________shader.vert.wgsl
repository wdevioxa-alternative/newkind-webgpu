
struct mainOut {
    @builtin(position) outPosition: vec4<f32>,
    @location(0) outColor : vec4<f32>
}

@vertex
fn main( 	@location(0) inPosition: vec3<f32>, 
		@location(1) inColor : vec4<f32>,
		@location(2) inFragUVPos : vec2<f32>, 
		@location(3) inFragUV : vec2<f32>
) -> mainOut {
    var vertex: mainOut;
    vertex.outPosition = vec4<f32>(inPosition, 1.0);
    vertex.outColor = inColor;
    return vertex;
}
