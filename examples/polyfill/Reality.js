import EventHandlerBase from './fill/EventHandlerBase.js'

/*
A Reality represents a view of the world, be it the real world via sensors or a virtual world that is rendered with WebGL or WebGPU.
*/
export default class Reality extends EventHandlerBase {
	constructor(xr, name, isShared, isPassthrough){
		super()
		this._name = name
		this._isShared = isShared
		this._isPassthrough = isPassthrough
		this._anchors = []
	}

	get name(){ return this._name }

	get isShared(){ return this._isShared }

	get isPassthrough(){ return this._isPassthrough }

	getCoordinateSystem(...types){
		//XRCoordinateSystem? getCoordinateSystem(XRFrameOfReferenceType type, ...); // Tries the types in order, returning the first match or null if none is found
		throw 'Not implemented'
	}

	// attribute EventHandler onchange;
}
