
class VRSetupExample extends XRExampleBase {
	constructor(domElement){
		super(domElement, ['reality', 'stage', 'eyeLevel'], true)
	}


	// Called during construction
	initializeScene(){
		fillInBoxScene(this.scene)		
	}

	// Called once per frame
	updateScene(frame, coordinateSystem, pose){

	}

	// Called once per frame
	updateRealityScene(frame, coordinateSystem, pose){

	}
}