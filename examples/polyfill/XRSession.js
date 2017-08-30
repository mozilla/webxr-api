import EventHandlerBase from './fill/EventHandlerBase.js'

/*
A script that wishes to make use of an XRDisplay can request an XRSession.
An XRSession provides a list of the available Reality instances that the script may request as well as make a request for an animation frame.
*/
export default class XRSession extends EventHandlerBase {
	constructor(xr, display, createParameters){
		super(xr)
		this._xr = xr
		this._display = display
		this._createParameters = createParameters

		this._baseLayer = null
		this._stageBounds = null

		this._el = document.createElement('div')
		this._el.style.position = 'absolute'
		this._el.style.width = '100%'
		this._el.style.width = '100vh'
	}

	get display(){ return this._display }

	get createParameters(){ return this._parameters }

	get realities(){ return this._xr._sharedRealities }

	get reality(){ return this._display._reality }

	get baseLayer(){ return this._baseLayer }

	set baseLayer(value){
		console.log('Base layer', value)
		this._baseLayer = value
		if(this._baseLayer === null){
			this._el.innerHTML = ''
		} else {
			this._baseLayer._context.canvas.style.width = '100%'
			this._baseLayer._context.canvas.style.height = '100vh'
			this._el.appendChild(this._baseLayer._context.canvas)
			document.body.prepend(this._baseLayer._context.canvas)
		}
	}

	get depthNear(){ this._display._depthNear }
	set depthNear(value){ this._display._depthNear = value }

	get depthFar(){ this._display._depthFar }
	set depthFar(value){ this._display._depthFar = value }

	get hasStageBounds(){ this._stageBounds !== null }

	get stageBounds(){ return this._stageBounds }

	requestRealityChange(reality){
		return new Promise((resolve, reject) => {
			if(reality instanceof Reality === false){
				reject()
				return
			}
			this._display._reality = reality
			resolve()
		})
	}

	requestFrame(callback){
		if(typeof callback !== 'function'){
			throw 'Invalid callback'
		}
		// TODO If ARKit is present, switch to using the ARKit watch callback
		return window.requestAnimationFrame(() => {
			callback(this._createPresentationFrame())
		})
	}

	cancelFrame(handle){
		return window.cancelAnimationFrame(handle)
	}

	end(){
		//returns Promise<void>
		throw 'Not implemented'
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
