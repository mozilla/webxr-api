import MatrixMath from './fill/MatrixMath.js'

export default class XRViewPose {
	constructor(){
		this._poseModelMatrix = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		])
	}

	get poseModelMatrix(){ this._poseModelMatrix }

	getViewMatrix(view, out=null){
		if(out === null){
			out = new Float32Array(16)
		}
		MatrixMath.mat4_eyeView(out, this._poseModelMatrix) // TODO offsets
		return out
	}
}