/*
A Reality represents a view of the world, be it the real world via sensors or a virtual world that is rendered with WebGL or WebGPU.
*/

export default class Reality {
	get name(){
		// readonly atttribute DOMString realityName;
		throw 'Not implemented'
	}

	get isShared(){
		// readonly attribute isShared; // True if sessions other than the creator can access this Reality
		throw 'Not implemented'
	}

	get isPassthrough(){
		//readonly attribute isPassthrough; // True if the Reality is a view of the outside world, not a full VR
		throw 'Not implemented'
	}

	getCoordinateSystem(...types){
		//XRCoordinateSystem? getCoordinateSystem(XRFrameOfReferenceType type, ...); // Tries the types in order, returning the first match or null if none is found
		throw 'Not implemented'
	}

	// attribute EventHandler onchange;
}
