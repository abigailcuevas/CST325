/* 
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

var Sphere = function(center, radius) {
  // Sanity checks (your modification should be below this where indicated)
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  this.center = center;
  this.radius = radius;

  // todo - make sure this.center and this.radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  // YOUR CODE HERE
  if(this.center == undefined){
    this.center = new Vector3(0,0,0);
  }
  if(this.radius == undefined){
    this.radius = 1;
  }
  
  // Sanity checks (your modification should be above this)
  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    console.error("The radius must be a Number");
  }
};

Sphere.prototype = {
  
   //----------------------------------------------------------------------------- 
  raycast: function(r1) {
    // todo - determine whether the ray intersects this sphere and if so, where
    
    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.
    // 1. review slides/book math
    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation
    // 3. calculate the discriminant
    // 4. use the discriminant to determine if further computation is necessary 
    //    if (determinant...) { ... } else { ... }
  
    var sphereOriginToRayOrigin = r1.origin.clone().subtract(this.center);

		var a = r1.direction.dot(r1.direction);
		var b = r1.direction.clone().multiplyScalar(2).dot(sphereOriginToRayOrigin);
		var c = sphereOriginToRayOrigin.dot(sphereOriginToRayOrigin) - this.radius * this.radius;

		var result = { 
      hit: false 
    };

		var discriminant = b * b - 4 * a * c;
		if (discriminant < 0) {
			return result;
		}

		var t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
		var t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

		if (t1 > 0 && t2 > 0) {
			var t = (t1 < t2) ? t1: t2;
			var originOffset = r1.clone().direction.multiplyScalar(t);

			result.hit = true;
			result.point = r1.origin.clone().add(originOffset);
			result.normal = (result.point.clone().subtract(this.center)).normalize();
			result.distance = originOffset.length();
		}
    
		return result;
    
  }
  
}

// EOF 00100001-1
