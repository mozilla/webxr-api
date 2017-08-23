/*
	XRExampleBase holds all of the common XR setup, rendering, and teardown code
	Extending classes should be able to focus on rendering their scene

	Parameters:
		domElement: an element used to show error messages
		frameOfReferenceTypes: an array of one or more XRFrameOfReferenceType
		createVirtualReality: if true, create a new empty reality for this app
*/
class XRExampleBase {
	constructor(domElement, frameOfReferenceTypes, createVirtualReality=true){
		this.el = domElement
		this.frameOfReferenceTypes = frameOfReferenceTypes
		this.createVirtualReality = createVirtualReality

		// Set during the XR.getDisplays call below
		this.display = null
		this.session = null

		// Create a simple THREE test scene for the layer
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(70, 1024, 1024, 1, 1000)
		this.renderer = null // Set in this.handleNewSession

		this.initializeScene(this.scene)

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
			this.display = displays[0] // production code would allow the user to choose, this code assumes that this is a MagicWindowDisplay

			this.display.requestSession({
				exclusive: this.createVirtualReality,
				type: this.createVirtualReality ? XRSession.REALITY : XRSession.AUGMENTATION
			}).then(session => {
				this.handleNewSession(session)
			}).catch(err => {
				console.error('Error requesting session', err)
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
	}

	handleNewSession(session){
		this.session = session
		this.session.depthNear = 0.1
		this.session.depthFar = 1000.0

		// Handle session lifecycle events
		this.session.addEventListener('focus', ev => { this.handleSessionFocus(ev) })
		this.session.addEventListener('blur', ev => { this.handleSessionBlur(ev) })
		this.session.addEventListener('end', ev => { this.handleSessionEnded(ev) })

		// Create a canvas and context for the layer
		let glCanvas = document.createElement('canvas')
		let glContext = glCanvas.getContext('webgl')

		this.session.layer = new XRWebGLLayer(this.session, glContext)

		// Handle layer focus events
		this.session.layer.addEventListener('focus', ev => { this.handleLayerFocus(ev) })
		this.session.layer.addEventListener('blur', ev => { this.handleLayerBlur(ev) })

		// Set up the THREE renderer with the session's layer's glContext
		this.renderer = new THREE.WebGLRenderer({
			canvas: glCanvas,
			context: glContext
		})
		this.renderer.setPixelRatio(1)

		/*
		This part is a bit bogus and relies on the polyfill only returning a MagicWindowDisplay
		*/
		const width = parseInt(window.getComputedStyle(this.el).width)
		const height = parseInt(window.getComputedStyle(this.el).height)
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)
		document.body.innerHTML = ''
		document.body.appendChild(this.renderer.domElement)

		if(this.createVirtualReality){
			const reality = this.session.createVirtualReality('VR Example', false)

			// Reqest the Reality change and then set up its XRLayer
			this.session.requestRealityChange(reality).then(() => {
				this.session.requestFrame(frame => { this.handleFrame(frame) })
			}).error(err => {
				console.error('Could not change realities')
			})
		} else {
			// The session's reality defaults to the most recently used shared reality
			this.session.requestFrame(frame => { this.handleFrame(frame) })
		}
	}

	// Extending classes can react to these events
	handleSessionFocus(ev){}
	handleSessionBlur(ev){}
	handleSessionEnded(ev){}
	handleLayerFocus(ev){}
	handleLayerBlur(ev){}

	/*
		Extending classes should override this to set up the scene during class construction
	*/
	initializeScene(){}

	/*
		Extending classes that need to update the layer during each frame should override these methods
	*/
	updateScene(frame, coordinateSystem, pose){}

	handleFrame(frame){
		const nextFrameRequest = this.session.requestFrame(frame => { this.handleFrame(frame) })
		let coordinateSystem = frame.getCoordinateSystem(...this.frameOfReferenceTypes)
		if(coordinateSystem === null){
			this.showMessage('Could not get a usable coordinate system')
			this.session.cancelFrame(nextFrameRequest)
			this.session.endSession()
			// Production apps could render a 'waiting' message and keep checking for an acceptable coordinate system
			return
		}
		let pose = frame.getViewPose(coordinateSystem)
		this.updateScene(frame, coordinateSystem, pose)

		this.renderer.autoClear = false
		this.scene.matrixAutoUpdate = false
		this.renderer.setSize(this.session.layer.framebufferWidth, this.session.layer.framebufferHeight)
		this.renderer.clear()

		//this.session.layer.context.bindFramebuffer(this.session.layer.context.FRAMEBUFFER, this.session.layer.framebuffer)

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

function fillInBoxScene(scene){
	let geometry = new THREE.BoxBufferGeometry(1, 1, 1)
	let material = new THREE.MeshPhongMaterial({ color: '#EFFFAA' })
	let mesh = new THREE.Mesh(geometry, material)
	mesh.position.set(0, 0, -4)
	scene.add(mesh)

	let ambientLight = new THREE.AmbientLight('#FFF', 0.4)
	scene.add(ambientLight)

	let directionalLight = new THREE.DirectionalLight('#FFF', 0.6)
	scene.add(directionalLight)

	return scene
}
