
/*
	ARExampleBase holds all of the common XR setup, rendering, and teardown code
	Extending classes should be able to focus on rendering their scene
*/
class ARExampleBase {
	constructor(domElement){
		this.el = domElement

		// Set during the XR.getDisplays call below
		this.display = null
		this.session = null

		// Create a simple THREE test scene
		this.scene = createBoxScene() // See common_examples.js 
		this.camera = new THREE.PerspectiveCamera(70, 1024, 1024, 1, 1000)
		this.renderer = null // Set in this.handleNewSession

		if(typeof navigator.XR === 'undefined'){
			this.showMessage('No WebXR API found')
			return
		}

		// Get a display and then request a session
		navigator.XR.getDisplays().then(displays => {
			if(displays.length == 0) {
				this.showMessage('No displays are available')
				return
			}
			this.display = displays[0] // production code would allow the user to choose			

			this.display.requestSession({ exclusive: false }).then(session => {
				this.handleNewSession(session)
			}).catch(err => {
				console.error(err)
				this.showMessage('Could not initiate the session')
			})
		})
	}

	/*
		Empties this.el, adds a div with the message text, and shows a button to test rendering the scene to this.el
	*/
	showMessage(messageText){
		this.el.innerHTML = ''
		let message = document.createElement('div')
		message.innerHTML = messageText
		this.el.append(message)
		let flatButton = document.createElement('button')
		flatButton.innerHTML = 'Run flat'
		this.el.appendChild(flatButton)
		flatButton.addEventListener('click', ev => {
			this.testRenderToElement()
		})
	}

	/*
		Render the scene to this.el on the flat screen
		this.handleFrame is where rendering to VR or AR happens
	*/
	testRenderToElement(){
		this.el.innerHTML = ''
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(1024, 1024)
		this.el.appendChild(this.renderer.domElement)

		let width = parseInt(window.getComputedStyle(this.el).width)
		let height = parseInt(window.getComputedStyle(this.el).height)
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)

		let animate = function(){
			requestAnimationFrame(animate)
			this.scene.children[0].rotation.x += 0.005;
			this.scene.children[0].rotation.y += 0.01;
			this.renderer.render(this.scene, this.camera)
		}.bind(this)
		requestAnimationFrame(animate)
	}

	handleNewSession(session){
		this.session = session
		this.session.depthNear = 0.1
		this.session.depthFar = 100.0

		// Create a canvas and context for the layer
		let glCanvas = document.createElement('canvas')
		let glContext = glCanvas.getContext('webgl', { compatibleXRDisplay: this.display })
		this.session.layer = new XRWebGLLayer(this.session, glContext)

		// Set up the THREE renderer with the session's layer's glContext
		this.renderer = new THREE.WebGLRenderer({
			canvas: glCanvas,
			context: glContext
		})

		this.renderer.setPixelRatio(window.devicePixelRatio) // What should this be?

		// Handle session lifecycle events
		this.session.addEventListener('focus', ev => { this.handleSessionFocus(ev) })
		this.session.addEventListener('blur', ev => { this.handleSessionBlur(ev) })
		this.session.addEventListener('end', ev => { this.handleSessionEnded(ev) })

		// Handle layer focus events
		this.session.layer.addEventListener('focus', ev => { this.handleLayerFocus(ev) })
		this.session.layer.addEventListener('blur', ev => { this.handleLayerBlur(ev) })

		// The session's reality defaults to the most recently used shared reality, which is fine for this app so start rendering
		this.session.requestFrame(frame => { this.handleFrame(frame) })
	}

	// Extending classes can react to these events
	handleSessionFocus(ev){}
	handleSessionBlur(ev){}
	handleSessionEnded(ev){}
	handleLayerFocus(ev){}
	handleLayerBlur(ev){}

	/*
		Called each frame before render
		Extending classes that need to update their scene during each frame should override this method
	*/
	updateScene(frame, coordinateSystem, pose){}

	handleFrame(frame){
		const nextFrameRequest = this.session.requestFrame(frame => { this.handleFrame(frame) })

		// Different apps require different coordinate systems, but let's assume these will work with spatial, stage, or eyeLevel
		let coordinateSystem = this.frame.getCoordinateSystem('spatial', 'stage', 'eyeLevel')
		if(coordinateSystem === null){
			this.showMessage('Could not get a usable coordinate system')
			this.session.cancelFrame(nextFrameRequest)
			this.session.endSession()
			// Production apps could render a 'waiting' message and keep checking for an acceptable coordinate system
			return
		}

		let pose = frame.getViewPose(coordinateSystem);

		this.updateScene(frame, coordinateSystem, pose)

		this.renderer.autoClear = false
		this.scene.matrixAutoUpdate = false

		this.renderer.setSize(this.session.layer.frameBufferWidth, this.session.layer.frameBufferWidth)
		this.renderer.clear()

		this.session.layer.context.bindFramebuffer(this.session.layer.framebuffer);

		// Render each view into this.session.layer.context
		for(const view of frame.views){
			const viewport = view.getViewport(this.session.layer)
			this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height)
			this.camera.projectionMatrix.fromArray(view.projectionMatrix)
			this.scene.matrix.fromArray(pose.getViewMatrix(view))
			this.scene.updateMatrixWorld(true)
			this.renderer.render(this.scene, this.camera)
		}
	}
}

class ARSimplestExample extends ARExampleBase {
	updateScene(frame, coordinateSystem, pose){
		// Spin the cube to show this method is called
		this.scene.children[0].rotation.x += 0.005;
		this.scene.children[0].rotation.y += 0.01;
	}
}

class ARAnchorExample extends ARExampleBase {

	constructor(domElement){
		super(domElement)
		this.anchorsToAdd = [] // { node, x, y, z }
		this.anchoredNodes = [] // { anchorUID, node }
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

	updateScene(frame, coordinateSystem, pose){
		// Create anchors for newly anchored nodes
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
				// TODO use orientation across coordinate systems
			}
		}
	}
}