blendModeNames = ['over', 'cross', 'lighten', 'darken',  
			'multiply', 'screen', 'overlay', 'add', 'subtract']

multiMixFrag = {}

multiMixFrag['initDefines'] = '''
#define COLOR texture(sTD2DInputs[i], texCoord)
#define BLEND0 blend * uOpacity[i]
'''


multiMixFrag['varDef'] = '''
const vec4 WHITE = vec4(1.0,1.0,1.0,1.0);
const vec4 LUM_COEFF = vec4(0.2125,0.7154,0.0721,1.0);

uniform float uOpacity[LAYERS];

float aspect = uTDOutputInfo.res.w / uTDOutputInfo.res.z;
float invAspect = 1.0 / aspect;
'''



multiMixFrag['mainStart'] = '''vec4 mix, blend;
out vec4 fragColor;
void main()
{	
	int i = 0;
	vec2 texCoord = vUV.st;
'''

multiMixFrag['mainEnd'] = '''
	fragColor = mix;
}'''

multiMixFrag['mixBlend'] = "blend = COLOR; mix = BLEND_Index_; i ++;"



multiMixFrag['defineMode'] = "#define BLEND_Index_ _Mode_(mix, blend, uOpacity[i])"


multiMixFrag['blendModes'] =[
'''	
vec4 over(vec4 base, vec4 blend, float opacity){	
	vec4 baseA = base * (1-blend.a);	
	vec4 result = baseA + blend;
	return mix(base, result, opacity);
}
''','''
vec4 lighten(vec4 base, vec4 blend, float opacity){	
	//lighten
	vec4 result = max(blend, base);
	return mix(base, result, opacity);
}
''','''
vec4 darken(vec4 base, vec4 blend, float opacity){	
	//darken
	vec4 result = min(blend, base);
	return mix(base, result, opacity);
}
''','''
vec4 multiply(vec4 base, vec4 blend, float opacity){	
	//multiply
	vec4 result = blend * base;
	return mix(base, result, opacity);
}
''','''
vec4 screen(vec4 base, vec4 blend, float opacity){	
	//screen
	vec4 result = WHITE - ((WHITE - blend) * (WHITE - base));
	return mix(base, result, opacity);
}
''','''
vec4 overlay(vec4 base, vec4 blend, float opacity){	
	//overlay
	vec4 result;
	float luminance = dot(base, LUM_COEFF);
	if (luminance < 0.45)
		result = 2.0 * blend * base;
		else if (luminance > 0.55)
		result = WHITE - 2.0 * (WHITE - blend) * (WHITE - base);
	else
	{
		vec4 result1 = 2.0 * blend * base;
		vec4 result2 = WHITE - 2.0 * (WHITE - blend) * (WHITE - base);
		result = mix(result1, result2, (luminance - 0.45) * 10.0);
	}
	return mix(base, result, opacity);
}
''','''
vec4 add(vec4 base, vec4 blend, float opacity){	
	//add
	vec4 result = blend + base;
	return mix(base, result, opacity);
}
''','''
vec4 subtract(vec4 base, vec4 blend, float opacity){	
	//subtract 
	vec4 result = blend - base;
	return mix(base, vec4(result.rgb, blend.a), opacity);
}
''']
