/*
A script that wishes to make use of an XRDisplay can request an XRSession. This session provides a list of the available realities that the script may request as well as make a request for an animation frame.
*/
export default class XRSession {
	get display(){
		//readonly attribute XRDisplay display
		throw 'Not implemented'
	}

	get type(){
		// readonly attribute XRSessionRealityType type
		throw 'Not implemented'
	}

	get createParameters(){
		//readonly attribute XRSessionCreateParameters createParameters;
		throw 'Not implemented'
	}

	get realities(){
		//readonly attribute <sequence <Reality>> realities; // All realities available to this session
		throw 'Not implemented'
	}

	get reality(){
		//readonly attribute Reality reality; // Defaults to most recently used Reality
		throw 'Not implemented'
	}

	get baseLayer(){
		//attribute XRLayer layer;
		throw 'Not implemented'
	}

	get depthNear(){
		//attribute double depthNear;
		throw 'Not implemented'
	}

	get depthFar(){
		//attribute double depthFar;
		throw 'Not implemented'
	}

	get hasStageBounds(){
		//readonly attribute boolean hasStageBounds;
		throw 'Not implemented'
	}

	get stageBounds(){
		//readonly attribute XRStageBounds? stageBounds;
		throw 'Not implemented'
	}

	requestRealityChange(reality){
		// returns Promise<void>
		throw 'Not implemented'
	}

	requestFrame(callback){
		// returns long
		throw 'Not implemented'
	}

	cancelFrame(handle){
		throw 'Not implemented'
	}

	end(){
		//returns Promise<void>
		throw 'Not implemented'
	}

	/*
	attribute EventHandler onblur;
	attribute EventHandler onfocus;
	attribute EventHandler onresetpose;
	attribute EventHandler onrealitychanged;
	attribute EventHandler onrealityconnect;
	attribute EventHandler onrealitydisconnect;
	attribute EventHandler onboundschange;
	attribute EventHandler onended;
	*/
}

XRSession.REALITY = 'reality'
XRSession.AUGMENTATION = 'augmentation'

XRSession.TYPES = [XRSession.REALITY, XRSession.AUGMENTATION]
