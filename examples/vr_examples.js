
class VRSetupExample {
	constructor(){
		this.display = null
		this.session = null

		navigator.XR.getDisplays().then(displays => {
			if(displays.length == 0) {
				console.log('No displays are available')
				return
			}
			this.display = displays[0] // production code would allow the user to choose
			this.display.requestSession({ exclusive: true }).then(session => {
				this.handleNewSession(session)
			}).catch(err => {
				console.error('Could not initiate the session', err)
			})
		})
	}

	handleNewSession(session){
		this.session = session
		this.session.requestRealityChange(this.session.createEmptyReality()).then(changed => {
			if(changed === false){
				console.error('Could not change realities')
				return
			}
			this.session.requestFrame(frame => { this.handleFrame(frame) })
		})
	}

	handleFrame(frame){
		this.session.requestFrame(frame => { this.handleFrame(frame) })
		// render into this.session.layer.context
	}
}