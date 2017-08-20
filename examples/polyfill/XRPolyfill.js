import XRDisplay from './XRDisplay.js'
import XRSession from './XRSession.js'
import XRSessionCreateParameters from './XRSessionCreateParameters.js'
import Reality from './Reality.js'
import XRPointCloud from './XRPointCloud.js'
import XRLightEstimate from './XRLightEstimate.js'
import XRAnchor from './XRAnchor.js'
import XRPlaneAnchor from './XRPlaneAnchor.js'
import XRAnchorOffset from './XRAnchorOffset.js'
import XRStageBounds from './XRStageBounds.js'
import XRStageBoundsPoint from './XRStageBoundsPoint.js'
import XRPresentationFrame from './XRPresentationFrame.js'
import XRView from './XRView.js'
import XRViewport from './XRViewport.js'
import XRCartographicCoordinates from './XRCartographicCoordinates.js'
import XRCoordinateSystem from './XRCoordinateSystem.js'
import XRCoordinates from './XRCoordinates.js'
import XRViewPose from './XRViewPose.js'
import XRLayer from './XRLayer.js'
import XRWebGLLayer from './XRWebGLLayer.js'

/*
XRPolyfill implements the window.XR functionality as a polyfill
*/
class XRPolyfill {
	constructor(){
		window.XRDisplay = XRDisplay
		window.XRSession = XRSession
		window.XRSessionCreateParameters = XRSessionCreateParameters
		window.Reality = Reality
		window.XRPointCloud = XRPointCloud
		window.XRLightEstimate = XRLightEstimate
		window.XRAnchor = XRAnchor
		window.XRPlaneAnchor = XRPlaneAnchor
		window.XRAnchorOffset = XRAnchorOffset
		window.XRStageBounds = XRStageBounds
		window.XRStageBoundsPoint = XRStageBoundsPoint
		window.XRPresentationFrame = XRPresentationFrame
		window.XRView = XRView
		window.XRViewport = XRViewport
		window.XRCartographicCoordinates = XRCartographicCoordinates
		window.XRCoordinateSystem = XRCoordinateSystem
		window.XRCoordinates = XRCoordinates
		window.XRViewPose = XRViewPose
		window.XRLayer = XRLayer
		window.XRWebGLLayer = XRWebGLLayer
	}

	getDisplays(){
		// returns 		Promise<sequence<XRDisplay>>
		throw 'Not implemented'
	}

	//attribute EventHandler ondisplayconnect;
	//attribute EventHandler ondisplaydisconnect;
}

/* Install XRPolyfill if window.XR does not exist */
if(typeof window.XR === 'undefined') window.XR = new XRPolyfill()
