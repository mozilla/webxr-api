import XRDisplay from '../XRDisplay.js'
import XRFieldOfView from '../XRFieldOfView.js'
import MagicWindowSession from './MagicWindowSession.js'
import MagicWindowView from './MagicWindowView.js'
import MatrixMath from './MatrixMath.js'

import ARKitWrapper from '../arkit/ARKitWrapper.js'

/*
MagicWindowDisplay takes over a handset's full screen and presents a moving view into an XR scene, as if it were a magic window.
*/
export default class MagicWindowDisplay extends XRDisplay {
	constructor(){
		super()
		this._arKitWrapper = null

		this._views.push(new MagicWindowView(this._fov, this._depthNear, this._depthFar))

		if(ARKitWrapper.hasARKit()){
			this._arKitWrapper = new ARKitWrapper(this._handleARKitInit.bind(this))
		}
	}

	get displayName(){
		return 'Magic Window'
	}

	get isExternal(){
		return false
	}

	_handleARKitUpdate(...params){
        const cameraTransformMatrix = this._arKitWrapper.getData('camera_transform')
        if (cameraTransformMatrix) {
            this._headPose._setPoseModelMatrix(cameraTransformMatrix)
        } else {
			console.log('no camera transform', this._arKitWrapper.rawARData)
        }

        const cameraProjectionMatrix = this._arKitWrapper.getData('projection_camera')
        if(cameraProjectionMatrix){
			this._views[0]._setProjectionMatrix(cameraProjectionMatrix)
        } else {
        	console.log('no projection camera', this._arKitWrapper.rawARData)
        }
	}

	_handleARKitInit(deviceId){
		setTimeout(() => {
			this._arKitWrapper.watch({
				location: true,
				camera: true,
				objects: true,
				debug: true,
				h_plane: true,
				hit_test_result: 'hit_test_plane'
			}, this._handleARKitUpdate.bind(this))
		}, 1000)
	}

	_getSession(parameters){
		return new MagicWindowSession(this)
	}

	_supportedCreationParameters(parameters){
		return parameters.type === XRSession.AUGMENTATION && parameters.exclusive === false		
	}

	//attribute EventHandler ondeactivate;
}