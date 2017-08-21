export default class XRViewPose {
	constructor(){
		this._poseModelMatrix = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		]
	}

	get poseModelMatrix(){ this._poseModelMatrix }

	getViewMatrix(view){
		// Float32Array getViewMatrix(XRView view);
		throw 'Not implemented'
	}
}