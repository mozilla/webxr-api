import XRView from '../XRView.js'

export default class MagicWindowView extends XRView {
	_setProjectionMatrix(array16){
		for(let i=0; i < 16; i++){
			this._projectionMatrix[i] = array16[i]
		}
	}
}