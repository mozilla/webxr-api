# WebVR 2.0 changes to allow XR

This document represents the WebXR interfaces after using the "WebVR 2.0 changes to *allow* AR" list in [From WebVR 2.0 to WebXR 2.1.md](https://github.com/mozilla/webxr-api/blob/master/design%20docs/From%20WebVR%202.0%20to%20WebXR%202.1.md) to make the changes that will make it possible to eventually support AR. See the "WebVR 2.0 changes to *support* AR" list and the full [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md) for API changes that would be required to actually implement AR applications.

The major changes from WebVR "2.0" are:

- naming changes like VR* to XR* and VRDevice to XRDisplay
- introduce XRCoordinates and change XRCoordinateSystem to replace VRFRameOfReference
- move stage bounds to the session and give them a center XRCoordinates (and thus a coordinate system)

Changes that are not in this API but that would be backwards compatible in a later version that supports AR:

- Realities
- Anchors
- Environment info like point clouds and light estimates
- Individual layer input focus


## XR

	interface XR {
		Promise<sequence<XRDisplay>> getDisplays();

		attribute EventHandler ondisplayconnect;
		attribute EventHandler ondisplaydisconnect;
	};

## XRDisplay

	interface XRDisplay : EventTarget {
		readonly attribute DOMString displayName;
		readonly attribute boolean isExternal;

		Promise<boolean> supportsSession(XRSessionCreateParametersInit parameters);
		Promise<XRSession> requestSession(XRSessionCreateParametersInit parameters);

		attribute EventHandler ondeactivate;
	};

## XRSession

	interface XRSession : EventTarget {
		readonly attribute XRDisplay display;
		readonly attribute XRSessionCreateParameters createParameters;

		attribute XRLayer layer;
		attribute double depthNear;
		attribute double depthFar;

		long requestFrame(XRFrameRequestCallback callback);
		void cancelFrame(long handle);

		readonly attribute boolean hasStageBounds; (moved here from VRFrameOfReference)
		readonly attribute XRStageBounds? stageBounds;

		Promise<void> end();

		attribute EventHandler onblur;
		attribute EventHandler onfocus;
		attribute EventHandler onresetpose;
		attribute EventHandler onboundschange;
		attribute EventHandler onended;
	};

	dictionary XRSessionCreateParametersInit {
		required boolean exclusive = true;
	};

	interface VRSessionCreateParameters {
		readonly attribute boolean exclusive;
	};

## XRStageBounds

	interface XRStageBounds {
		readonly attribute XRCoordinates center; (new)
		readonly attribute FrozenArray<XRStageBoundsPoint>? geometry;
	};

## XRStageBoundsPoint 

	interface XRStageBoundsPoint {
		readonly attribute double x;
		readonly attribute double z;
	};

## XRPresentationFrame

	interface XRPresentationFrame {
		readonly attribute FrozenArray<XRView> views;

		XRCoordinateSystem? getCoordinateSystem(XRFrameOfReferenceType type, ...); (new)

		XRViewPose? getViewPose(XRCoordinateSystem coordinateSystem); (renamed from getDevicePose)
	};

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

## XRCoordinateSystem

	enum XRFrameOfReferenceType { "headModel", "eyeLevel", "stage" };

	interface XRCoordinateSystem {
		readonly attribute XRFrameOfReferenceType type; (new)

		Float32Array? getTransformTo(XRCoordinateSystem other);
	};

## XRCoordinates (new)

	interface XRCoordinates {
		readonly attribute XRCoordinateSystem coordinateSystem;
		readonly attribute Float32Array poseMatrix;

		XRCoordinates? getTransformedCoordinates(XRCoordinateSystem otherCoordinateSystem) 
	};


## XRViewPose (renamed from VRDevicePose)

	interface XRViewPose {
		readonly attribute Float32Array poseModelMatrix;

		Float32Array getViewMatrix(XRView view);
	};

## XRLayer

	interface XRLayer : EventTarget {
	};

## XRWebGLLayer

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


