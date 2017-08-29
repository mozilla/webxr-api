import XRDisplay from '../XRDisplay.js'
import XRView from '../XRView.js'
import XRSession from '../XRSession.js'

import MatrixMath from '../fill/MatrixMath.js'
import DeviceOrientationTracker from '../fill/DeviceOrientationTracker.js'
import ARKitWrapper from '../platform/ARKitWrapper.js'

/*
FlatDisplay takes over a handset's full screen and presents a moving view into a Reality, as if it were a magic window.

If ARKit is present, it uses the ARKit updates to set the headModel pose.

TODO if ARKit is not present, use orientation events.
*/
export default class FlatDisplay extends XRDisplay {
	constructor(xr, reality){
		super(xr, 'Flat', false, reality)

		this._started = false
		this._initialized = false

		// This is used if we have ARKit support
		this._arKitWrapper = null // ARKitWrapper

		// These are used if we don't have ARKit support and instead use window orientation events
		this._deviceOrientationTracker = null	// DeviceOrientationTracker
		this._deviceOrientation = null			// THREE.Quaternion
		this._devicePosition = null				// THREE.Vector3
		this._deviceScale = null				// THREE.Vector3
		this._deviceWorldMatrix = null			// THREE.Matrix4

		// Currently only support full screen views
		this._views.push(new XRView(this._fov, this._depthNear, this._depthFar))
	}

	_start(){
		if(ARKitWrapper.HasARKit()){
			if(this._initialized === false){
				this._initialized = true
				this._arKitWrapper = ARKitWrapper.GetOrCreate()
				this._arKitWrapper.addEventListener(ARKitWrapper.INIT_EVENT_NAME, this._handleARKitInit.bind(this))
				this._arKitWrapper.addEventListener(ARKitWrapper.WATCH_EVENT_NAME, this._handleARKitUpdate.bind(this))
				this._arKitWrapper.waitForInit().then(() => {
					this._arKitWrapper.watch()
				})
			} else {
				this._arKitWrapper.watch()
			}
		} else {
			if(this._initialized === false){
				this._initialized = true
				this._deviceOrientation = new THREE.Quaternion()
				this._devicePosition = new THREE.Vector3()
				this._deviceScale = new THREE.Vector3(1, 1, 1)
				this._deviceOrientationTracker = new DeviceOrientationTracker()
				this._deviceOrientationTracker.addEventListener(DeviceOrientationTracker.ORIENTATION_UPDATE_EVENT_NAME, this._updateFromDeviceOrientationTracker.bind(this))
			}
		}
		this.running = true
		this._reality._start()
	}

	_stop(){
		// TODO figure out how to stop ARKit so CameraReality can still work
	}

	_updateFromDeviceOrientationTracker(){
		// TODO set XRView's FOV
		this._deviceOrientationTracker.getOrientation(this._deviceOrientation)
		this._devicePosition.set(this._headPose.poseModelMatrix[12], this._headPose.poseModelMatrix[13], this._headPose.poseModelMatrix[14])
		this._deviceWorldMatrix.compose(this._devicePosition, this._deviceOrientation, this._deviceScale)
		this._headPose._setPoseModelMatrix(this._deviceWorldMatrix.toArray())
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
			this._views[0].setProjectionMatrix(cameraProjectionMatrix)
        } else {
        	console.log('no projection camera', this._arKitWrapper.rawARData)
        }
	}

	_handleARKitInit(ev){
		setTimeout(() => {
			this._arKitWrapper.watch({
				location: true,
				camera: true,
				objects: true,
				debug: false,
				h_plane: false,
				hit_test_result: 'hit_test_plane'
			})
		}, 1000)
	}

	_createSession(parameters){
		this._start()
		return new XRSession(this._xr, this, parameters)
	}

	_supportedCreationParameters(parameters){
		return parameters.type === XRSession.AUGMENTATION && parameters.exclusive === false		
	}

	//attribute EventHandler ondeactivate; // FlatDisplay never deactivates
}