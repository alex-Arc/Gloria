
// Example Pixel Shader

// uniform float exampleUniform;
uniform vec4 uCrop;
uniform vec4 uSoft;

out vec4 fragColor;
void main()
{
	vec4 color = texture(sTD2DInputs[0], vUV.st);
	color *= smoothstep(uCrop.x, uCrop.x + uSoft.x, vUV.s) 
	* smoothstep(uCrop.y, uCrop.y + uSoft.y, 1-vUV.s)
	* smoothstep(uCrop.z, uCrop.z + uSoft.z, vUV.t)
	* smoothstep(uCrop.w, uCrop.w + uSoft.w, 1-vUV.t);
	fragColor = TDOutputSwizzle(color);
}
