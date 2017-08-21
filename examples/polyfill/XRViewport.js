export default class XRViewport {
	constructor(x, y, width, height){
		this._x = x
		this._y = y
		this._width = width
		this._height = height
	}

	get x(){ return this._x }

	get y(){ return this._y }

	get width(){ return this._width }

	get height(){ return this._height }
}