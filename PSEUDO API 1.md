
## XR

	interface XR {
		Promise<sequence<XRDisplay>> getDisplays();
	};


## XRDisplay

	interface XRDisplay {
		readonly attribute DOMString displayName;
		readonly attribute boolean isExternal;

		Promise<boolean> supportsSession(XRSessionCreateParametersInit parameters);
		Promise<XRSession> requestSession(XRSessionCreateParametersInit parameters);

		attribute EventHandler ondeactivate;
	};

### Todo

- calibration

## Reality

	interface Reality {
		readonly atttribute DOMString realityName;
		readonly attribute boolean hasPointCloud;
		readonly attribute XRCoordinates stageLocation;

		Promise<boolean> requestStageLocation(float x, float y float z, XRCoordinates)
		Promise<boolean> requestResetStageLocation()

		Promise<XRPointCloud> getPointCloud()

		Promise<XRLightEstimate> getLightEstimate()

		attribute EventHandler onchange;
	};

### Todo

- configuration
- anchors
- manifold instead of point cloud

## XRPointCloud

	interface XRPointCloud {
		readonly attribute Float32Array points;
	}

## XRLightEstimate

	interface XRLightEstimate {
		readonly attribute float ambientIntensity;
		readonly attribute float ambientColorTemperature;
	}

## XRSession

	interface XRSession : EventTarget {
		readonly attribute XRDisplay display;
		readonly attribute XRSessionCreateParameters createParameters;

		attribute double depthNear;
		attribute double depthFar;

		attribute XRLayer layer;

		Promise<sequence <Reality>> getRealities();

		Promise<XRFrameOfReference> requestFrameOfReference(XRFrameOfReferenceType type);

		long requestFrame(XRFrameRequestCallback callback);
		void cancelFrame(long handle);

		Promise<void> endSession();

		attribute EventHandler onblur;
		attribute EventHandler onfocus;
		attribute EventHandler onresetpose;
		attribute EventHandler onended;
	};

## XRPresentationFrame

	interface XRPresentationFrame {
		readonly attribute FrozenArray<XRView> views;

		XRDisplayPose? getDisplayPose(XRCoordinateSystem coordinateSystem);
	};

## XRCoordinateSystem

	interface XRCoordinateSystem: EventTarget {
		readonly attribute Coordinates? coordinates; // https://dev.w3.org/geo/api/spec-source.html#coordinates

		Float32Array? getTransformTo(XRCoordinateSystem other);
	};

## XRCoordinates

	interface XRCoordinates {
		readonly attribute XRCoordinateSystem
		attribute float x;
		attribute float y;
		attribute float z;
	}

## XRView

	interface XRView {
		readonly attribute XREye eye;
		readonly attribute Float32Array projectionMatrix;

		XRViewport? getViewport(XRLayer layer);
	};

## XRViewport

	interface XRViewport {
		readonly attribute long x;
		readonly attribute long y;
		readonly attribute long width;
		readonly attribute long height;
	};

## XRDisplayPose

	interface XRDisplayPose {
		readonly attribute Float32Array poseModelMatrix;

		Float32Array getViewMatrix(XRView view);
	};

## XRLayer

	interface XRLayer {};

	typedef (WebGLRenderingContext or WebGL2RenderingContext) XRWebGLRenderingContext;

	[Constructor(XRSession session, XRWebGLRenderingContext context, optional XRWebGLLayerInit layerInit)]

	interface XRWebGLLayer : XRLayer {
		readonly attribute XRWebGLRenderingContext context;

		readonly attribute boolean antialias;
		readonly attribute boolean depth;
		readonly attribute boolean stencil;
		readonly attribute boolean alpha;
		readonly attribute boolean multiview;

		readonly attribute WebGLFramebuffer framebuffer;
		readonly attribute long framebufferWidth;
		readonly attribute long framebufferHeight;

		void requestViewportScaling(double viewportScaleFactor);
	};

### Todo

- focus / blur
- misbehavior

