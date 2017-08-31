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
			this.display = displays[0] // production code would allow the user to choose, this code assumes that this is a FlatDisplay

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

		this.session.baseLayer = new XRWebGLLayer(this.session, glContext)

		// Handle layer focus events
		this.session.baseLayer.addEventListener('focus', ev => { this.handleLayerFocus(ev) })
		this.session.baseLayer.addEventListener('blur', ev => { this.handleLayerBlur(ev) })

		// Set up the THREE renderer with the session's layer's glContext
		this.renderer = new THREE.WebGLRenderer({
			canvas: glCanvas,
			context: glContext
		})
		this.renderer.setPixelRatio(1)
		this.renderer.setClearColor('#000', 0)

		/*
		This part is a bit bogus and relies on the polyfill only returning a FlatDisplay
		*/
		const width = parseInt(window.getComputedStyle(this.el).width)
		const height = parseInt(window.getComputedStyle(this.el).height)
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)
		this.session.baseLayer.appendChild(this.renderer.domElement)
		this.renderer.domElement.style.position = 'absolute'
		// this.el.style.position = 'relative';


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
		this.renderer.setSize(this.session.baseLayer.framebufferWidth, this.session.baseLayer.framebufferHeight)
		this.renderer.clear()

		//this.session.baseLayer.context.bindFramebuffer(this.session.baseLayer.context.FRAMEBUFFER, this.session.baseLayer.framebuffer)

		// Render each view into this.session.baseLayer.context
		for(const view of frame.views){
			const viewport = view.getViewport(this.session.baseLayer)
			//throttledConsoleLog('pose', pose._poseModelMatrix, viewport)
			this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height)
			this.camera.projectionMatrix.fromArray(view.projectionMatrix)
			this.scene.matrix.fromArray(pose.getViewMatrix(view))
			this.scene.updateMatrixWorld(true)
			this.renderer.render(this.scene, this.camera)
		}
	}
}

function fillInTeapotScene(scene){
	var geometry = new THREE.TeapotBufferGeometry(0.1)
	let materialColor = new THREE.Color()
	materialColor.setRGB(1.0, 1.0, 1.0)
	let material = new THREE.MeshLambertMaterial({ color: materialColor, side: THREE.DoubleSide })
	let mesh = new THREE.Mesh(geometry, material)
	mesh.position.set(0, 0, -1)
	scene.add(mesh)

	let ambientLight = new THREE.AmbientLight('#FFF', 0.4)
	scene.add(ambientLight)

	let directionalLight = new THREE.DirectionalLight('#FFF', 0.6)
	scene.add(directionalLight)

	return scene
}

function fillInBoxScene(scene){
	let geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2)
	let material = new THREE.MeshPhongMaterial({ color: '#DDFFDD' })
	let mesh = new THREE.Mesh(geometry, material)
	mesh.position.set(0, 0, -0.8)
	scene.add(mesh)

	let ambientLight = new THREE.AmbientLight('#FFF', 1)
	scene.add(ambientLight)

	let directionalLight = new THREE.DirectionalLight('#FFF', 0.6)
	scene.add(directionalLight)

	return scene
}

/*
Rate limit a function call. Wait is the minimum number of milliseconds between calls.
If leading is true, the first call to the throttled function is immediately called.
If trailing is true, once the wait time has passed the function is called. 

This code is cribbed from https://github.com/jashkenas/underscore
*/
window.throttle = function(func, wait, leading=true, trailing=true) {
	var timeout, context, args, result
	var previous = 0

	var later = function() {
		previous = leading === false ? 0 : Date.now()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function() {
		var now = Date.now()
		if (!previous && leading === false) previous = now
		var remaining = wait - (now - previous)
		context = this
		args = arguments
		if (remaining <= 0 || remaining > wait) {
		if (timeout) {
			clearTimeout(timeout)
			timeout = null
		}
		previous = now
		result = func.apply(context, args)
		if (!timeout) context = args = null
		} else if (!timeout && trailing !== false) {
		timeout = setTimeout(later, remaining)
		}
		return result
	}

	throttled.cancel = function() {
		clearTimeout(timeout)
		previous = 0
		timeout = context = args = null
	}

	return throttled
}

window.throttledConsoleLog = throttle((...params) => {
	console.log(...params)
}, 1000)
