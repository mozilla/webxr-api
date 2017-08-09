
## Reality based info

- Reality: stage Coordinates
- Anchor: Coordinates
- PlaneAnchor(Anchor): orientation, width, height
- PointCloud: Array of [x,y,z]
- Manifold: ?

### Frame info

- Frame: Views, PointCloud, Manifold, DisplayPose
- DisplayPose: poseModelMatrix
- View: projectionMatrix, ViewPort
- Viewport: x, y, width, height

### Coordinate info

- CartographicCoordinates: lat/lon/alt, accuracy
- Coordinates: CoordinateSystem, x/y/z
- CoordinateSystem: CartographicCoordinates?
- FrameOfReference(CoordinateSystem): StageBounds, type (headModel, eyeLevel, stage, spatial)
- StageBounds: array of [x,y]

### Rendering

- Layer: GL context, GL frame buffer, fb width/height

### Scene graph

- Scene coordinates: local, world, camera, projection
