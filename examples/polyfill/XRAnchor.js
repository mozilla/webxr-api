/*
XRAnchors provide per-frame coordinates which the Reality attempts to pin "in place".
In a virtual Reality these coordinates do not change. 
In a Reality based on environment mapping sensors, the anchors may change coordinates on a per-frame bases as the system refines its map.
*/
export default class XRAnchor {
	get uid(){
		//readonly attribute DOMString uid;
		throw 'Not implemented'
	}

	get coordinates(){
		//readonly attribute XRCoordinates coordinates;
		throw 'Not implemented'
	}
}