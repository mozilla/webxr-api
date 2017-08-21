import XRDisplay from '../XRDisplay.js'
import MagicWindowSession from './MagicWindowSession.js'

export default class MagicWindowDisplay extends XRDisplay {
	constructor(){
		super()
		this._views.push(new XRView(0, 0, 1024, 1024))
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