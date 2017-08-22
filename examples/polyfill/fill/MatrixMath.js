
/*
MatrixMath provides helper functions for populating the various matrices involved with 3D graphics.

Many of the math methods were taken from the Google webvr polyfill:
https://github.com/googlevr/webvr-polyfill/blob/master/src/util.js#L270
*/
export default class MatrixMath {

	static mat4_eyeView(out, poseModelMatrix, offset=new Float32Array([0, 0, 0])) {
		MatrixMath.mat4_translate(out, poseModelMatrix, offset)
		MatrixMath.mat4_invert(out, out)
	}

	static mat4_perspectiveFromFieldOfView(out, fov, near, far) {
		const upTan =    Math.tan(fov.upDegrees *    MatrixMath.PI_OVER_180)
		const downTan =  Math.tan(fov.downDegrees *  MatrixMath.PI_OVER_180)
		const leftTan =  Math.tan(fov.leftDegrees *  MatrixMath.PI_OVER_180)
		const rightTan = Math.tan(fov.rightDegrees * MatrixMath.PI_OVER_180)

		const xScale = 2.0 / (leftTan + rightTan)
		const yScale = 2.0 / (upTan + downTan)

		console.log(fov, near, far)

		out[0] = xScale
		out[1] = 0.0
		out[2] = 0.0
		out[3] = 0.0
		out[4] = 0.0
		out[5] = yScale
		out[6] = 0.0
		out[7] = 0.0
		out[8] = -((leftTan - rightTan) * xScale * 0.5)
		out[9] = ((upTan - downTan) * yScale * 0.5)
		out[10] = far / (near - far)
		out[11] = -1.0
		out[12] = 0.0
		out[13] = 0.0
		out[14] = (far * near) / (near - far)
		out[15] = 0.0
		return out
	}

	static mat4_fromRotationTranslation(out, q, v) {
		// Quaternion math
		const x = q[0]
		const y = q[1]
		const z = q[2]
		const w = q[3]
		const x2 = x + x
		const y2 = y + y
		const z2 = z + z

		const xx = x * x2
		const xy = x * y2
		const xz = x * z2
		const yy = y * y2
		const yz = y * z2
		const zz = z * z2
		const wx = w * x2
		const wy = w * y2
		const wz = w * z2

		out[0] = 1 - (yy + zz)
		out[1] = xy + wz
		out[2] = xz - wy
		out[3] = 0
		out[4] = xy - wz
		out[5] = 1 - (xx + zz)
		out[6] = yz + wx
		out[7] = 0
		out[8] = xz + wy
		out[9] = yz - wx
		out[10] = 1 - (xx + yy)
		out[11] = 0
		out[12] = v[0]
		out[13] = v[1]
		out[14] = v[2]
		out[15] = 1

		return out
	}

	static mat4_translate(out, a, v) {
		const x = v[0]
		const y = v[1]
		const z = v[2]
		let a00
		let a01
		let a02
		let a03
		let a10, a11, a12, a13,
		      a20, a21, a22, a23

		if (a === out) {
			out[12] = a[0] * x + a[4] * y + a[8]  * z + a[12]
			out[13] = a[1] * x + a[5] * y + a[9]  * z + a[13]
			out[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
			out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
		} else {
			a00 = a[0]; a01 = a[1]; a02 = a[2];  a03 = a[3]
			a10 = a[4]; a11 = a[5]; a12 = a[6];  a13 = a[7]
			a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11]

			out[0] = a00; out[1] = a01; out[2] =  a02; out[3] =  a03
			out[4] = a10; out[5] = a11; out[6] =  a12; out[7] =  a13
			out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23

			out[12] = a00 * x + a10 * y + a20 * z + a[12]
			out[13] = a01 * x + a11 * y + a21 * z + a[13]
			out[14] = a02 * x + a12 * y + a22 * z + a[14]
			out[15] = a03 * x + a13 * y + a23 * z + a[15]
		}

		return out
	}

	static mat4_invert(out, a) {
		const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
		      a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
		      a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
		      a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

		const b00 = a00 * a11 - a01 * a10
		const b01 = a00 * a12 - a02 * a10
		const b02 = a00 * a13 - a03 * a10
		const b03 = a01 * a12 - a02 * a11
		const b04 = a01 * a13 - a03 * a11
		const b05 = a02 * a13 - a03 * a12
		const b06 = a20 * a31 - a21 * a30
		const b07 = a20 * a32 - a22 * a30
		const b08 = a20 * a33 - a23 * a30
		const b09 = a21 * a32 - a22 * a31
		const b10 = a21 * a33 - a23 * a31
		const b11 = a22 * a33 - a23 * a32

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

		if (!det) {
			return null
		}
		det = 1.0 / det

		out[0] =  (a11 * b11 - a12 * b10 + a13 * b09) * det
		out[1] =  (a02 * b10 - a01 * b11 - a03 * b09) * det
		out[2] =  (a31 * b05 - a32 * b04 + a33 * b03) * det
		out[3] =  (a22 * b04 - a21 * b05 - a23 * b03) * det
		out[4] =  (a12 * b08 - a10 * b11 - a13 * b07) * det
		out[5] =  (a00 * b11 - a02 * b08 + a03 * b07) * det
		out[6] =  (a32 * b02 - a30 * b05 - a33 * b01) * det
		out[7] =  (a20 * b05 - a22 * b02 + a23 * b01) * det
		out[8] =  (a10 * b10 - a11 * b08 + a13 * b06) * det
		out[9] =  (a01 * b08 - a00 * b10 - a03 * b06) * det
		out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
		out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
		out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
		out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
		out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
		out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det

		return out
	}
}

MatrixMath.PI_OVER_180 = Math.PI / 180.0
MatrixMath.RADIANS_AT_45_DEGREES = Math.PI * 0.25
MatrixMath.DEFAULT_ORIENTATION = new Float32Array([0, 0, 0, 1])
MatrixMath.DEFAULT_POSITION = new Float32Array([0, 0, 0])
