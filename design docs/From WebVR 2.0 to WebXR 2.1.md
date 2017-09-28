## WebVR 2.0 changes to *allow* AR

These are the minimal changes to WebVR 2.0 needed so that at some point in the future we could support AR of the type described in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md) and implemented in [webxr-polyfill](https://github.com/mozilla/webxr-polyfill).

### Rename

- rename everything from VR* to XR*
- rename VRDevice to XRDisplay
- rename VRDevicePose to XRViewPose

### Coordinate system

- add XRCoordinates (has a pose matrix and XRCoordinateSystem attribute)
- update XRCoordinateSystem to include a XRFrameOfReferenceType attribute
- remove XRFrameOfReference (handled by a XRFrameOfReferenceType attribute on XRCoordinateSystem)

### Stage bounds

- move stage bounds from XRFrameOfReference (which is removed) to XRSession
- change XRStageBounds to have a XRCoordinates `center` attribute (and thus a XRCoordinateSystem)

### Misc

- add XRPresentationFrame.getCoordinateSystem



## WebVR 2.0 changes to *support* AR

These are the changes to WebVR 2.0 required to actually use the AR features in WebXR. 

### New interfaces

- Reality
- XRSessionRealityType
- XRPointCloud
- XRLightEstimate
- XRAnchor, XRPlaneAnchor, and XRAnchorOffset
- XRManifold
- XRCartographicCoordinates

### Interface additions

- add "geospatial" to existing XRFrameOfReferenceType types "headModel", "eyeLevel", and "stage"
- update XRCoordinateSystem to include an optional XRCartographicCoordinates attribute

- add XRSessionType attribute to XRSessionCreateOptions to support either a Reality session or an augmentation session
- update XRLayer to include focus API
- update XRPresentationFrame to add point cloud, light estimate, manifold, and anchor APIs

