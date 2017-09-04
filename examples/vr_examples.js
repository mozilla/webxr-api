
class VRSetupExample extends XRExampleBase {
	constructor(domElement){
		super(domElement, true)
	}


	// Called during construction
	initializeStageGroup(){
		fillInBoxScene(this.stageGroup)
	}

	// Called once per frame
	updateStageGroup(frame, stageCoordinateSystem, stagePose){

	}
}