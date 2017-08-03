

class ARSetupExample {
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
		// Session defaults to an empty Reality so query for new ones
		this.session.getRealities().then(realities => {
			for(let reality of realities){
				if(reality.isPassthrough){
					this.session.requestRealityChange(reality).then(changed => {
						if(changed === false){
							console.log('Could not change realities')
							return
						}
						// Now we have a session with a passthrough reality, so start rendering
						this.session.requestFrame(frame => { this.handleFrame(frame) })
					})
					break
				}
			}
		})
	}

	handleFrame(frame){
		this.session.requestFrame(frame => { this.handleFrame(frame) })
		// render into this.session.layer.context
	}
}