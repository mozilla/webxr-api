


class ARSimplestExample extends XRExampleBase {
	constructor(domElement){
		super(domElement, ['geospatial', 'stage', 'eyeLevel'], false)
	}

	// Called during construction
	initializeScene(){
		fillInBoxScene(this.scene)		
	}

	// Called once per frame
	updateScene(frame, coordinateSystem, pose){
		// Spin the cube to show this method is called
		this.scene.children[0].rotation.x += 0.005
		this.scene.children[0].rotation.y += 0.01
	}
}

class ARAnchorExample extends XRExampleBase {
	constructor(domElement){
		super(domElement, ['geospatial', 'stage', 'eyeLevel'], false)
		this.anchorsToAdd = [] // { node, x, y, z }
		this.anchoredNodes = [] // { anchorUID, node }
	}

	// Called during construction
	initializeScene(){
		fillInBoxScene(this.scene)		
	}

	/*
		addAnchoredModel creates an anchor at (x,y,z) and positions the sceneGraphNode on the anchor from that point on
	*/
	addAnchoredModel(sceneGraphNode, x, y, z){
		// Save this info for use during the next render frame
		this.anchorsToAdd.push({
			node: sceneGraphNode,
			x: x, y: y, z: z
		})
	}

	// Called once per frame
	updateScene(frame, coordinateSystem, pose){
		// Create anchors for newly anchored nodes
		for(let anchorToAdd of this.anchorsToAdd){
			const anchor = new XRAnchor(new XRCoordinates(coordinateSystem, [x, y, z], [0, 0, 0, 1]))
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
				anchoredNode.node.fromArray(localCoordinates.poseMatrix)
			}
		}
	}
}