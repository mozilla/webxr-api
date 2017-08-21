export default class XRCoordinateSystem {
	constructor(type, cartographicCoordinates=null){
		this._type = type
		this._cartographicCoordinates = cartographicCoordinates
	}

	get cartographicCoordinates(){ return this._cartographicCoordinates }

	get type(){ return this._type }
	
	getTransformTo(otherCoordinateSystem){
		//Float32Array? getTransformTo(XRCoordinateSystem other);
		throw 'Not implemented'
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