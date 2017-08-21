import EventHandlerBase from './fill/EventHandlerBase.js'

/*
A script that wishes to make use of an XRDisplay can request an XRSession. This session provides a list of the available realities that the script may request as well as make a request for an animation frame.
*/
export default class XRSession extends EventHandlerBase {
	constructor(display, parameters, realities, reality){
		super()
		this._display = display
		this._parameters = parameters
		this._reality = reality
		this._realities = realities
		this._anchors = []

		this._baseLayer = null
		this._depthFar = 1
		this._depthFar = 1000
		this._stageBounds = null
	}

	get display(){ return this._display }

	get createParameters(){ return this._parameters }

	get realities(){ return this._realities }

	get reality(){ return this._reality }

	get baseLayer(){ return this._baseLayer }
	set baseLayer(value){ this._baseLayer = value }

	get depthNear(){ this._depthNear }
	set depthNear(value){ this._depthNear = value }

	get depthFar(){ this._depthFar }
	set depthFar(value){ this._depthFar = value }

	get hasStageBounds(){ this._stageBounds !== null }

	get stageBounds(){ return this._stageBounds }

	requestRealityChange(reality){
		return new Promise((resolve, reject) => {
			if(reality instanceof Reality === false){
				reject()
				return
			}
			this._reality = reality
			resolve()
		})
	}

	requestFrame(callback){
		if(typeof callback !== 'function'){
			throw 'Invalid callback'
		}
		requestAnimationFrame(() => {
			callback(this._createPresentationFrame())
		})
		return 1
	}

	_createPresentationFrame(){
		return new XRPresentationFrame(this)
	}

	_getCoordinateSystem(...types){
		for(let type of types){
			switch(type){
				case XRCoordinateSystem.HEAD_MODEL:
					return this._display._headModelCoordinateSystem
				case XRCoordinateSystem.EYE_LEVEL:
					return this._display._eyeLevelCoordinateSystem
				case XRCoordinateSystem.STAGE:
					return this._display._stageCoordinateSystem
				case XRCoordinateSystem.GEOSPATIAL:
					// Not supported yet
				default:
					continue
			}
		}
		return null
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
