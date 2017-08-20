export default class XRPresentationFrame {
	get views(){
		//readonly attribute FrozenArray<XRView> views;
		throw 'Not implemented'
	}

	get hasPointCloud(){
		//readonly attribute boolean hasPointCloud;
		throw 'Not implemented'
	}

	get pointCloud(){
		//readonly attribute XRPointCloud? pointCloud;
		throw 'Not implemented'
	}

	get hasLightEstimate(){
		//readonly attribute boolean hasLightEstimate;
		throw 'Not implemented'
	}

	get lightEstimate(){
		//readonly attribute XRLightEstimate? lightEstimate;
		throw 'Not implemented'
	}

	get anchors(){
		//readonly attribute sequence<XRAnchor> anchors;
		throw 'Not implemented'
	}

	addAnchor(anchor){
		//long addAnchor(XRAnchor anchor);
		throw 'Not implemented'
	}

	removeAnchor(uid){
		// void removeAnchor(DOMString uid);
		throw 'Not implemented'
	}

	getAnchor(uid){
		// XRAnchor? getAnchor(DOMString uid);
		throw 'Not implemented'
	}

	findAnchor(coordinates){
		// XRAnchorOffset? findAnchor(XRCoordinates); // cast a ray to find or create an anchor at the first intersection in the Reality
		throw 'Not implemented'
	}

	getCoordinateSystem(...types){
		// XRCoordinateSystem? getCoordinateSystem(XRFrameOfReferenceType type, ...); // Tries the types in order, returning the first match or null if none is found
		throw 'Not implemented'
	}

	getViewPose(coordinateSystem){
		// XRViewPose? getViewPose(XRCoordinateSystem coordinateSystem);
		throw 'Not implemented'
	}
}