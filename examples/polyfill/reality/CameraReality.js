import Reality from '../Reality.js'
import ARKitWrapper from '../platform/ARKitWrapper.js'

/*
CameraReality displays the forward facing camera.

If this is running in the iOS ARKit wrapper app, the camera data will be displayed in a Metal layer below the WKWebKit layer.

TODO If this is not the iOS ARKit app, use WebRTC to get the camera's MediaStream into a canvas below augmentations.
*/
export default class CameraReality extends Reality {
	constructor(xr){
		super(xr, 'Camera', true, true)

		this._initialized = false
		this._running = false

		// These are used if we have access to ARKit
		this._arKitWrapper = null

		// These are used if we do not have access to ARKit
		this._mediaStream = null
		this._videoEl = null
	}

	_start(){
		if(this._running) return
		this._running = true

		if(ARKitWrapper.HasARKit()){
			if(this._initialized === false){
				this._initialized = true
				this._arKitWrapper = ARKitWrapper.GetOrCreate()
				this._arKitWrapper.addEventListener(ARKitWrapper.ADD_OBJECT_NAME, this._handleARKitAddObject.bind(this))
				this._arKitWrapper.waitForInit().then(() => {
					this._arKitWrapper.watch()
				})
			} else {
				this._arKitWrapper.watch()
			}
		} else {
			if(this._initialized === false){
				this._initialized = true
				navigator.mediaDevices.getUserMedia({
					audio: false,
					video: { facingMode: "environment" }
				}).then(stream => {
					this._videoEl = document.createElement('video')
					this._videoEl.setAttribute('class', 'camera-reality-video')
					this._videoEl.style.position = 'absolute'
					this._videoEl.style.width = '100%'
					this._videoEl.style.height = '100vh'
					this._videoEl.srcObject = stream
					document.body.prepend(this._videoEl)
					this._videoEl.play()
				}).catch(err => {
					console.error('Could not set up video stream', err)
					this._initialized = false
					this._running = false
				})
			} else {
				document.body.prepend(this._videoEl)
				this._videoEl.play()
			}
		}
	}

	_stop(){
		if(ARKitWrapper.HasARKit()){
			if(this._arKitWrapper === null){
				return
			}
			this._arKitWrapper.stop()
		} else {
			if(this._videoEl === null){
				return
			}
			document.body.removeChild(this._videoEl)
			this._videoEl.pause()
		}
	}

	_handleARKitAddObject(ev){
		console.log('AR add object', ev)
	}

	_addAnchor(anchor){
		console.log('reality adding anchor', anchor)

		// TODO talk to ARKit to create an anchor

		this._anchors.set(anchor.uid, anchor)
		return anchor.uid
	}

	/*
	Creates an anchor attached to a surface, as found by a ray
	*/
	_findAnchor(coordinates){
		// XRAnchorOffset? findAnchor(XRCoordinates); // cast a ray to find or create an anchor at the first intersection in the Reality
		// TODO talk to ARKit to create an anchor
		throw 'Need to implement in CameraReality'
	}

	_removeAnchor(uid){
		// returns void
		// TODO talk to ARKit to delete an anchor
		this._anchors.delete(uid)
	}
}
