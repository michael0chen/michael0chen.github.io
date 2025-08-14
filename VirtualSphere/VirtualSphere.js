/* VirtualSphere.js - Michael Chen's Virtual Sphere implementation for 3D rotation using 2D input device.
 *
 * Siggraph 1988 - A Study in Interactive 3-D Rotation Using 2-D Control Devices
 *   Reference   : https://dl.acm.org/doi/10.1145/378456.378497
 *   PDF         : https://dl.acm.org/doi/pdf/10.1145/378456.378497
 *   Apple devlop: https://vintageapple.org/develop/pdf/develop-14_9306_June_1993.pdf
 *                 https://archive.org/details/develop-14_9306_June_1993/mode/2up?q=%22kip+olson%22
 *                 https://archive.org/details/Apple_Developer_CD_Series_June_1993_Reference_Library_R_O_M_The_World_In80_Nanos
 *                 ^ ISO CD-ROM with original source code and demo app. Can be opened with this emulator:
 *                 https://mendelson.org/macos9osx.html (Launch app and drag .ISO file inside app window.)
 *
 * Reimplemented in Javascript for Three.js.
 */


export class VirtualSphere {

	/**
	 * @param {THREE.Vector2}	boundingSphereScreenCenter
	 * @param {number}			boundingSphereRadius
	 */
	constructor(boundingSphereScreenCenter, boundingSphereRadius) {
		this.setCueCenterAndRadius(boundingSphereScreenCenter, boundingSphereRadius);
	}

	/**
	 * @param {Vector2}	boundingSphereScreenCenter
	 * @param {number}	boundingSphereRadius
	 */
	setCueCenterAndRadius(boundingSphereScreenCenter, boundingSphereRadius) {
		this._boundingSphereScreenCenter = boundingSphereScreenCenter;
		this._boundingSphereScreenRadius = boundingSphereRadius;
	}

	/**
	 * PointOnUnitSphere
	 *
	 * Project a 2D point on a circle to a 3D point on the +z hemisphere of a unit sphere.
	 * If the 2D point is outside the circle, it is first mapped to the nearest point on
	 * the circle before projection.
	 * Orthographic projection is used, though technically the field of view of the camera
	 * should be taken into account.  However, the discrepancy is negligible.
	 *
	 * @param  {THREE.Vector2}	screenPoint
	 * @return {THREE.Vector3}
	 */
	pointOnUnitSphere (screenPoint) {
		let v = new THREE.Vector3();
		// Turn the mouse points into vectors relative to the center of the circle and normalize them.
		// Note we need to flip the y value since the 3D coordinate has positive y going up.
		v.x =  (screenPoint.x - this._boundingSphereScreenCenter.x) / this._boundingSphereScreenRadius;
		v.y = -(screenPoint.y - this._boundingSphereScreenCenter.y) / this._boundingSphereScreenRadius;
		const lengthSquared = v.x*v.x + v.y*v.y;

		// Project the point onto the sphere, assuming orthographic projection.
		// Points beyond the virtual sphere are normalized onto edge of the sphere (where z = 0).
		if (lengthSquared < 1.0) {
			v.z = Math.sqrt(1.0 - lengthSquared);
		} else {
			const length = Math.sqrt (lengthSquared);
			v.x /= length;
			v.y /= length;
			v.z = 0.0;
			// console.log("length: ", v.length())
		}
		return v;
	}


	/**
	 * getRotationMatrix - Compute the incremental 3D rotation to based on the 2D mouse movement.
	 *    *** This is Virtual Sphere magic! ***
	 *
	 * @param  {THREE.Vector2}    screenPointP
	 * @param  {THREE.Vector2}    screenPointQ
	 * @return {THREE.Matrix4}
	 */
	getRotationMatrix (screenPointP, screenPointQ) {
	 	// Project 2D mouse points over _boundingSphereScreenCenter/Radius to
		// 3D vectors on the +z hemisphere of a unit sphere.
	 	const op = this.pointOnUnitSphere(screenPointP);
	 	const oq = this.pointOnUnitSphere(screenPointQ);

		// Compute the axis   of rotation by the cross-product of op & oq.
        // Compute the amount of rotation by arc sin of the length of the axis.
		const axis = new THREE.Vector3().crossVectors(op, oq);
		const angle = Math.asin(axis.length());

		// Return the incremental rotation to apply as a matrix.
		// Note Three.js needs the axis to be normalized to create a proper Matrix4!
		// https://threejs.org/docs/#api/en/math/Matrix4.makeRotationAxis
		// https://threejs.org/docs/?q=vect#api/en/math/Vector3.normalize
		return new THREE.Matrix4().makeRotationAxis(axis.normalize(), angle);
	 }

}
