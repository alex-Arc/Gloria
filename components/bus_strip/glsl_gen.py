import multiMixTextData
mixFrag = op('glslmulti1_pixel')
numLayers = 10

frag = multiMixTextData.multiMixFrag
mixBlend = frag['mixBlend']



defineModeText = ''
mixBlendText = ''
blendModeIds = []		
for n in range(0, numLayers):
	ID = str(n)
	if n != 0: 
		blendPar = getattr(op(op('layers')[n+1,0]).par, 'Blend')
		mode = str(blendPar)
		modeId = blendPar.menuIndex
		line = frag['defineMode'].replace('_Index_', ID)
		line = line.replace('_Mode_', mode)
		defineModeText += line +'\n'

		if modeId not in blendModeIds:
			blendModeIds.append(modeId)

	mixBlendText += '\t' + mixBlend.replace('_Index_', ID) + '\n'

blendFuncs = [frag['blendModes'][modeId] for modeId in blendModeIds]	
layers = '#define LAYERS ' + str(max(1, numLayers))
textList = [layers, frag['initDefines'], defineModeText, frag['varDef'],
			frag['mainStart'], mixBlendText, frag['mainEnd']]
textList[4:4] = blendFuncs

mixFrag.text = ''.join(textList)
