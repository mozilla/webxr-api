## WebVR "2.0" changes to *allow* AR

These are the minimal changes to 2.0 needed to allow AR of the type described in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md).

### Renaming

- rename everything from VR* to XR*
- rename VRDevice to XRDisplay
- rename XRSession.baseLayer to XRSession.layer (Reality.layer will be "the base")
- rename VRDevicePose to XRViewPose

### Coordinate system

- add XRCoordinates (has a XRCoordinateSystem attribute)
- add XRCartographicCoordinates
- update XRCoordinateSystem to include an optional XRCartographicCoordinates attribute
- update XRCoordinateSystem to include a XRFrameOfReferenceType attribute
- add "geospatial" to existing XRFrameOfReferenceType types "headModel", "eyeLevel", and "stage"
- remove XRFrameOfReference (becomes a type attribute on XRCoordinateSystem)

### Stage bounds
- move stage bounds from XRFrameOfReference to XRSession
- change XRStageBounds to have a XRCoordinates `center` attribute (and thus a XRCoordinateSystem)

### Misc

- add XRPresentationFrame.getCoordinateSystem



## WebVR 2.0 changes to *support* AR

### New interfaces

- add Reality
- add XRPointCloud
- add XRLightEstimate
- add XRAnchor, XRPlaneAnchor, and XRAnchorOffset
- add XRManifold

### Interface additions

- add XRSessionCreateParametersInit for session type ("virtual" [the default], "augmented", "any"?)
- update XRSession to add Reality management API
- update XRLayer to include focus API
- update XRPresentationFrame to add point cloud, light estimate, manifold, and anchor API



## Questions

- What to do about "exclusive" flag on session creation?
- Do we need a coordinate system on the XRViewPose?
- Will XRSessions have only one layer? And Realities?
