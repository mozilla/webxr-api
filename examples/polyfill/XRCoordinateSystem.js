import MatrixMath from './fill/MatrixMath.js'

export default class XRCoordinateSystem {
	constructor(display, type, cartographicCoordinates=null){
		this._display = display
		this._type = type
		this._cartographicCoordinates = cartographicCoordinates
	}

	get cartographicCoordinates(){ return this._cartographicCoordinates }

	get type(){ return this._type }

	get _poseModelMatrix(){
		switch(this._type){
			case XRCoordinateSystem.HEAD_MODEL:
				return this._display._headPose.poseModelMatrix
			case XRCoordinateSystem.EYE_LEVEL:
				return this._display._eyeLevelPose.poseModelMatrix
			case XRCoordinateSystem.STAGE:
				return this._display._stagePose.poseModelMatrix
			case XRCoordinateSystem.GEOSPATIAL:
				throw 'This polyfill does not yet handle geospatial coordinate systems'
			default:
				throw 'Unknown coordinate system type: ' + this._type
		}
	}
	
	getTransformTo(otherCoordinateSystem){
		let out = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		])

		// apply inverse of this system's poseModelMatrix to the identity matrix
		let inverse = new Float32Array(16)
		MatrixMath.mat4_invert(inverse, this._poseModelMatrix)
		MatrixMath.mat4_multiply(out, inverse, out)

		// apply other system's poseModelMatrix
		MatrixMath.mat4_multiply(out, otherCoordinateSystem._poseModelMatrix, out)
		return out
	}
}

XRCoordinateSystem.HEAD_MODEL = "headModel"
XRCoordinateSystem.EYE_LEVEL = "eyeLevel"
XRCoordinateSystem.STAGE = "stage"
XRCoordinateSystem.GEOSPATIAL = "geospatial"

XRCoordinateSystem.TYPES = [
	XRCoordinateSystem.HEAD_MODEL,
	XRCoordinateSystem.EYE_LEVEL,
	XRCoordinateSystem.STAGE,
	XRCoordinateSystem.GEOSPATIAL
]