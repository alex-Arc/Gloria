// uniform float exampleUniform;
/*uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec3 uPos;*/
//uniform float uAmount;
//uniform float uTargetHue;

// Fra MMCommon.glsl
/*
MadCommon Glsl Library

Copyright (c) 2016, Garage Cube, All rights reserved.
Copyright (c) 2016, Simon Geilfus, All rights reserved.

Portions of code from Romain Dura see corresponding licence

Redistribution and use in source and binary forms, with or without modification, are permitted provided that
the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and
 the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/
// RGB <-> HSV Conversion functions
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    //vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    //vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rgb2hue(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return abs(q.z + (q.w - q.y) / (6.0 * d + e));
}
// END OF MadCmmon.glsl copied code

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
    
    vec3 hsv = rgb2hsv(color.rgb);
    
     float uAmount =.5;
     float uTargetHue = 0.2;
    
    
//    float diff = abs(uTargetHue - hsv.x);
//
//    if(diff < 0.5){
//        hsv.z = 0.0;
//    }

    if(uTargetHue <= hsv.x)
    {
        hsv.x-=(hsv.x-uTargetHue)*uAmount;
       // hsv.z = 0.0;
    }
  else if(uTargetHue > hsv.x){
        hsv.x+=(uTargetHue-hsv.x)*uAmount;
        //hsv.z = 0.0;

    } else {
        //hsv.z = 0.0;
        //hsv.x+=(uTargetHue-hsv.x)*uAmount;
        //hsv.z = 0.0;
    }
    

    //hsv.x = fract(hsv.x);

    color.rgb = hsv2rgb(hsv);
    
/*
	float lum = czm_luminance(color.rgb);
	float low = smoothstep(uPos.y, uPos.x, lum);
	float high = smoothstep(uPos.y, uPos.z, lum);
	float mid = 1 - high - low;
	color.rgb = mix(color.rgb, uLow * low + uMid * mid + uHigh * high, uAmount);
*/
	fragColor = TDOutputSwizzle(color);

}
