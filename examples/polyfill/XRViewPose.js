import MatrixMath from './fill/MatrixMath.js'

/*
XRDevicePose describes the position and orientation of an XRDisplay relative to the query XRCoordinateSystem.
It also describes the view and projection matrices that should be used by the application to render a frame of the XR scene.
*/
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