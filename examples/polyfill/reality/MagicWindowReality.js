import Reality from '../Reality.js'

/*
MagicWindowReality displays the forward facing camera.

If this is running in the iOS ARKit wrapper app, the camera data will be displayed in a Metal layer below the WKWebKit layer.

TODO If this is not the iOS ARKit wrapper, use WebRTC to get the camera's MediaStream into a canvas below augmentations.
*/
export default class MagicWindowReality extends Reality {
	constructor(xr){
		super(xr, 'Magic Window', true, true)
	}
}
