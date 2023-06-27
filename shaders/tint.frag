
// Example Pixel Shader

// uniform float exampleUniform;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec3 uPos;
uniform float uAmount;

float czm_luminance(vec3 rgb)
{
    // Algorithm from Chapter 10 of Graphics Shaders.
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    return dot(rgb, W);
}

out vec4 fragColor;
void main()
{
	vec4 color = texture(sTD2DInputs[0], vUV.st);
	float lum = czm_luminance(color.rgb);
	float low = smoothstep(uPos.y, uPos.x, lum);
	float high = smoothstep(uPos.y, uPos.z, lum);
	float mid = 1 - high - low;
	color.rgb = mix(color.rgb, uLow * low + uMid * mid + uHigh * high, uAmount);

	fragColor = TDOutputSwizzle(color);

}
