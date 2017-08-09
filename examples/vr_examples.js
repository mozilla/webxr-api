
class VRSetupExample {
	constructor(){
		this.display = null
		this.session = null
		this.realityLayer = null

		// Find a display
		navigator.XR.getDisplays().then(displays => {
			if(displays.length == 0) {
				console.error('No displays are available')
				return
			}
			this.display = displays[0] // production code would allow the user to choose

			// Request a session
			this.display.requestSession({ exclusive: true }).then(session => {
				this.handleNewSession(session)
			}).catch(err => {
				console.error('Could not initiate the session', err)
			})
		})
	}

	handleNewSession(session){
		this.session = session

		// Create an empty Reality in which to create our VR
		const reality = this.session.createEmptyReality('VR Example', false)

		// Request that this session use the new Reality
		this.session.requestRealityChange(reality).then(() => {
			// Request the Reality's XRLayer so that we can render into it
			reality.requestLayer().then(layer => {
				this.realityLayer = layer
			}).catch(err => {
				// This shouldn't happen because this script context created the Reality and should have access to the layer
				console.error('Error requesting the Reality layer', err)
				this.session.endSession()
				return
			})

			// Now start requesting frames
			this.session.requestFrame(frame => { this.handleFrame(frame) })
		}).catch(err => {
			console.error('Could not change realities', err)
			// While some applications could use any Reality, this VR session requires its own so end the session if it isn't available.
			this.session.endSession()
			return
		})
	}

	handleFrame(frame){
		// Request the frame after this one
		const nextFrameRequest = this.session.requestFrame(frame => { this.handleFrame(frame) })

		// Different apps require different coordinate systems, but let's assume this one will work with stage or eyeLevel frames of reference
		let coordinateSystem = this.frame.getCoordinateSystem('stage', 'eyeLevel')
		if(coordinateSystem === null){
			console.error('Could not get a usable coordinate system')
			this.session.cancelFrame(nextFrameRequest)
			this.session.endSession()
			// Alternatively, the app could render a 'waiting for map' message and keep checking for an acceptable coordinate system
			return
		}


		// Render into this.realityLayer.context using a WebGL lib like Three.js

		// Render into this.session.layer.context using a WebGL lib like Three.js
	}
}