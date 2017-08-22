import XRDisplay from '../XRDisplay.js'
import XRFieldOfView from '../XRFieldOfView.js'
import MagicWindowSession from './MagicWindowSession.js'
import MatrixMath from './MatrixMath.js'

export default class MagicWindowDisplay extends XRDisplay {
	constructor(){
		super()
		this._views.push(new XRView(this._fov, this._depthNear, this._depthFar))
	}

	get displayName(){
		return 'Magic Window'
	}

	get isExternal(){
		return false
	}

	_getSession(parameters){
		return new MagicWindowSession(this)
	}

	_supportedCreationParameters(parameters){
		return parameters.type === XRSession.AUGMENTATION && parameters.exclusive === false		
	}

	//attribute EventHandler ondeactivate;
}