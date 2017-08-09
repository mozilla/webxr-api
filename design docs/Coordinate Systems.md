
## Reality info

- Reality: StageBounds
- Anchor: Coordinates
- PlaneAnchor(Anchor): orientation, width, height
- PointCloud: Array of points [x,y,z]
- Manifold: ?

### Frame info

- Frame: Views, PointCloud, Manifold, DisplayPose
- DisplayPose: poseModelMatrix
- View: projectionMatrix, ViewPort
- Viewport: x, y, width, height

### Coordinate info

- CartographicCoordinates: lat/lon/alt, accuracy, type (display, reality), geodeticFrame (WGS84)
- CoordinateSystem: CartographicCoordinates?, type (headModel, eyeLevel, stage, spatial)
- Coordinates: CoordinateSystem, x/y/z
- StageBounds: XRCoordinate center, optional array of [x,y] points on stage plane

### Rendering

- Layer: GL context, GL frame buffer with width and height

### Scene graph

- Scene coordinates: local, world, camera, projection


### References

- https://developer.microsoft.com/en-us/windows/mixed-reality/coordinate_systems
- https://developer.microsoft.com/en-us/windows/mixed-reality/spatial_anchors

- https://developers.google.com/tango/overview/motion-tracking
- https://developers.google.com/tango/overview/frames-of-reference

- https://developer.apple.com/documentation/arkit/ (no frames of reference or spatial coordinates?)

- https://dev.w3.org/geo/api/spec-source.html#coordinates
