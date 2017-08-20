
/*
Each XRDisplay represents a method of using a specific type of hardware to render AR or VR realities and layers.
*/
export default class XRDisplay {

	get displayName(){
		//readonly attribute DOMString displayName
		throw 'Not implemented'
	}

	get isExternal(){
		//readonly attribute boolean isExternal;
		throw 'Not implemented'
	}

	supportsSession(parameters){
		// parameters: XRSessionCreateParametersInit 
		// returns Promise<boolean>
		throw 'Not implemented'
	}

	requestSession(parameters){
		// parameters: XRSessionCreateParametersInit 
		// returns Promise<XRSession>
		throw 'Not implemented'
	}

	//attribute EventHandler ondeactivate;
}
