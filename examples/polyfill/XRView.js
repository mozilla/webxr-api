import XRViewport from './XRViewport.js'

export default class XRView {
	constructor(x, y, width, height, eye=null){
		this._eye = eye
		this._viewport = new XRViewport(x, y, width, height)

		this._projectionMatrix = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		]
	}

	get eye(){ return this._eye }

	get projectionMatrix(){ return this._projectionMatrix }

	getViewport(layer){ return this._viewport }
}

XRView.LEFT = 'left'
XRView.RIGHT = 'right'