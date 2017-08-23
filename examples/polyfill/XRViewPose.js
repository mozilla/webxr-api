import MatrixMath from './fill/MatrixMath.js'

export default class XRViewPose {
	constructor(position=[0, 0, 0], orientation=[0, 0, 0, 1]){
		this._poseModelMatrix = new Float32Array(16)
		MatrixMath.mat4_fromRotationTranslation(this._poseModelMatrix, orientation, position)
	}

	get poseModelMatrix(){ return this._poseModelMatrix }

	getViewMatrix(view, out=null){
		if(out === null){
			out = new Float32Array(16)
		}
		MatrixMath.mat4_eyeView(out, this._poseModelMatrix) // TODO offsets
		return out
	}
}