
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
		this.session.requestRealityChange(reality).then(changed => {
			if(changed === false){
				console.error('Could not change realities')
				// While some applications could use any Reality, this VR session requires its own so end the session if it isn't available.
				this.session.endSession()
				return
			}

			// Request the Reality's XRLayer so that we can render into it
			reality.requestLayer().then(layer => {
				// because this script context created it, layer will always be non-null
				this.realityLayer = layer
			})

			// Now start requesting frames
			this.session.requestFrame(frame => { this.handleFrame(frame) })
		})
	}

	handleFrame(frame){
		// Request the frame after this one
		this.session.requestFrame(frame => { this.handleFrame(frame) })

		// Render into this.realityLayer.context using a WebGL lib like Three.js

		// Render into this.session.layer.context using a WebGL lib like Three.js
	}
}