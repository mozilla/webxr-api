

class ARSetupExample {
	constructor(){
		this.display = null
		this.session = null

		navigator.XR.getDisplays().then(displays => {
			if(displays.length == 0) {
				console.error('No displays are available')
				return
			}
			this.display = displays[0] // production code would allow the user to choose			
			this.display.requestSession({ exclusive: false }).then(session => {
				this.handleNewSession(session)
			}).catch(err => {
				console.error('Could not initiate the session', err)
			})
		})
	}

	handleNewSession(session){
		this.session = session
		// The session's reality defaults to the most recently used shared reality,  which is fine for this app
		this.session.requestFrame(frame => { this.handleFrame(frame) })
	}

	handleFrame(frame){
		throw 'Extending classes must implement this'
	}
}

class ARAnchorExample extends ARSetupExample {

	constructor(){
		super()
		this.anchorsToAdd = [] // { node, x, y, z }
		this.anchoredNodes = [] // { anchorUID, node }
	}

	addAnchoredModel(sceneGraphNode, x, y, z){
		// Save this info for use during the next render frame
		this.anchorsToAdd.push({
			node: sceneGraphNode,
			x: x, y: y, z: z
		})
	}

	handleFrame(frame){
		const nextFrameRequest = this.session.requestFrame(frame => { this.handleFrame(frame) })

		// Different apps require different coordinate systems, but let's assume this one will work as long as there is at least head pose info.
		let coordinateSystem = this.frame.getCoordinateSystem('spatial')
		if(coordinateSystem === null){
			coordinateSystem = this.frame.getCoordinateSystem('stage')
		}
		if(coordinateSystem === null){
			coordinateSystem = this.frame.getCoordinateSystem('headModel')
		}
		if(coordinateSystem === null){
			console.error('Could not get a usable coordinate system')
			this.session.cancelFrame(nextFrameRequest)
			this.session.endSession()
			return
		}

		// Create new anchors for newly anchored nodes
		for(let anchorToAdd of this.anchorsToAdd){
			const anchor = new XRAnchor(new XRCoordinates(coordinateSystem, x, y, z))
			const anchorUID = frame.addAnchor(anchor)
			this.anchoredModels.push({
				anchorUID: anchorUID,
				node: anchorToAdd.node
			})
		}
		this.anchorsToAdd = []
		
		// Update anchored node positions in the scene graph
		for(let anchoredNode of this.anchoredNodes){
			const anchor = frame.getAnchor(anchoredNode.anchorUID)
			if(anchor === null){
				console.error('Unknown anchor ID', anchoredNode.anchorId)
			} else {
				const localCoordinates = anchor.coordinates.getTransformedCoordinates(coordinateSystem)
				anchoredNode.node.position.set(localCoordinates.x, localCoordinates.y, localCoordinates.z)
				// TBD figure out how to use orientation across coordinate systems
			}
		}

		// Render into this.session.layer.context

	}
}