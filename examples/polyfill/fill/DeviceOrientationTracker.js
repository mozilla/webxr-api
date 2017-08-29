import EventHandlerBase from './EventHandlerBase.js'

/*
DeviceOrientationTracker keeps track of device orientation, which can be queried usnig `getOrientation`
*/
export default class DeviceOrientationTracker extends EventHandlerBase {
	constructor(){
		super()
		this._deviceOrientation = null
		this._windowOrientation = null

		window.addEventListener('orientationchange', () => {
			this._windowOrientation = window.orientation || 0
		}, false)
		window.addEventListener('deviceorientation', ev => {
			this._deviceOrientation = ev
			this.dispatch(new CustomEvent(DeviceOrientationTracker.ORIENTATION_UPDATE_EVENT_NAME, {
				deviceOrientation: this._deviceOrientation,
				windowOrientation: this._windowOrientation
			}))
		}, false)
	}

	/*
	getOrientation sets the value of outQuaternion to the most recently tracked device orientation
	returns true if a device orientation has been received, otherwise false
	*/
	getOrientation(outQuaternion){
		if(this._deviceOrientation === null || this._windowOrientation === null){
			outQuaternion.set(0, 0, 0, 1)
			return false
		}
		DeviceOrientationTracker.WORKING_EULER.set(this._deviceOrientation.beta, this._deviceOrientation.alpha, -this._deviceOrientation.gamma, 'YXZ')
		outQuaternion.setFromEuler(euler)
		outQuaternion.multiply(DeviceOrientationTracker.HALF_PI_AROUND_X)
		outQuaternion.multiply(DeviceOrientationTracker.WORKING_QUATERNION.setFromAxisAngle(DeviceOrientationTracker.Z_AXIS, -this._windowOrientation))
		return true
	}
}

DeviceOrientationTracker.ORIENTATION_UPDATE_EVENT_NAME = 'orientation-update'

DeviceOrientationTracker.Z_AXIS = new THREE.Vector3(0, 0, 1)
DeviceOrientationTracker.WORKING_EULER = new THREE.Euler()
DeviceOrientationTracker.WORKING_QUATERNION = new THREE.Quaternion()
DeviceOrientationTracker.HALF_PI_AROUND_X = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5))
