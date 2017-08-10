
function createBoxScene(){
	// Returns a scene containing a box

	let scene = new THREE.Scene()

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

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}
