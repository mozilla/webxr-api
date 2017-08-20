import XRLayer from './XRLayer.js'

export default class XRWebGLLayer extends XRLayer {
	get context(){
		// readonly attribute XRWebGLRenderingContext context;
		throw 'Not implemented'
	}

	get antialias(){
		// readonly attribute boolean antialias;
		throw 'Not implemented'
	}

	get depth(){
		// readonly attribute boolean depth;
		throw 'Not implemented'
	}

	get stencil(){
		// readonly attribute boolean stencil;
		throw 'Not implemented'
	}

	get alpha(){
		// readonly attribute boolean alpha;
		throw 'Not implemented'
	}

	get multiview(){
		// readonly attribute boolean multiview;
		throw 'Not implemented'
	}
	
	get frameBuffer(){
		// readonly attribute WebGLFramebuffer framebuffer;
		throw 'Not implemented'
	}

	get frameBufferWidth(){
		// readonly attribute long framebufferWidth;
		throw 'Not implemented'
	}

	get frameBufferHeight(){
		// readonly attribute long framebufferHeight;
		throw 'Not implemented'
	}

	requestViewportScaling(viewportScaleFactor){
		// void requestViewportScaling(double viewportScaleFactor);
		throw 'Not implemented'
	}
}