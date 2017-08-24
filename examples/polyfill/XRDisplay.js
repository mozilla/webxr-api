import EventHandlerBase from './fill/EventHandlerBase.js'
import XRFieldOfView from './XRFieldOfView.js'

/*
Each XRDisplay represents a method of using a specific type of hardware to render AR or VR realities and layers.
*/
export default class XRDisplay extends EventHandlerBase {
	constructor(){
		super()
		// This doesn't yet support geospatial

		this._headModelCoordinateSystem = new XRCoordinateSystem(this, XRCoordinateSystem.HEAD_MODEL)
		this._eyeLevelCoordinateSystem = new XRCoordinateSystem(this, XRCoordinateSystem.EYE_LEVEL)
		this._stageCoordinateSystem = new XRCoordinateSystem(this, XRCoordinateSystem.STAGE)

		this._headPose = new XRViewPose([0, 1.65, 0])
		this._eyeLevelPose = new XRViewPose([0, 1.65, 0])
		this._stagePose = new XRViewPose()

		this._fov = new XRFieldOfView(45, 45, 45, 45)
		this._depthNear = 0.1
		this._depthFar = 1000

		this._views = []
	}

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
		return new Promise((resolve, reject) => {
			resolve(this._supportedCreationParameters(parameters))
		})
	}

	requestSession(parameters){
		return new Promise((resolve, reject) => {
			if(this._supportedCreationParameters(parameters) === false){
				reject()
				return
			}
			resolve(this._getSession(parameters))
		})
	}

	_getSession(parameters){
		return 'Not implemented'
	}

	_supportedCreationParameters(parameters){
		return 'Not implemented'
	}

	//attribute EventHandler ondeactivate;
}
