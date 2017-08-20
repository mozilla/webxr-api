export default class XRCoordinateSystem {	
	get cartographicCoordinates(){
		//readonly attribute XRCartographicCoordinates? cartographicCoordinates;
		throw 'Not implemented'
	}

	get type(){
		// readonly attribute XRFrameOfReferenceType type;
		throw 'Not implemented'
	}
	
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