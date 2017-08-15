## WebVR 2.0 changes to *allow* AR

These are the minimal changes to 2.0 needed to allow AR of the type described in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md).

### Rename

- rename everything from VR* to XR*
- rename VRDevice to XRDisplay
- rename XRSession.baseLayer to XRSession.layer (Reality.layer will eventually be the base)
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

### New interfaces

- add Reality
- add XRSessionRealityType
- add XRPointCloud
- add XRLightEstimate
- add XRAnchor, XRPlaneAnchor, and XRAnchorOffset
- add XRManifold

### Interface additions

- add XRCartographicCoordinates
- add "geospatial" to existing XRFrameOfReferenceType types "headModel", "eyeLevel", and "stage"
- update XRCoordinateSystem to include an optional XRCartographicCoordinates attribute
- add XRSessionRealityType attribute to VRSessionCreateParameters and VRSessionCreateParametersInit
- update XRSession to add Reality management API
- update XRLayer to include focus API
- update XRPresentationFrame to add point cloud, light estimate, manifold, and anchor API



## Questions

- What to do about "exclusive" flag on session creation?
- Do we need a coordinate system on the XRViewPose?
- Will XRSessions have only one layer? And Realities?
