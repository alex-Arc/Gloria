# me - this DAT
# scriptOp - the OP which is cooking

import numpy as np

# press 'Setup Parameters' in the OP to call this function to re-create the parameters.
def onSetupParameters(scriptOp):
	return

# called whenever custom pulse parameter is pushed
def onPulse(par):
	return

def onCook(scriptOp):
	scriptOp.clear()

	arr = scriptOp.inputs[0].numpyArray().astype('uint8')
	# print(inpu)
	msb = ((arr[0::2] * 2 ** 8) + arr[1::2]) / 65535
	scriptOp.copyNumpyArray(msb.astype('float32'), baseName='c')

	return
