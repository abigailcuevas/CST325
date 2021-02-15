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
    var rad = this.radius * this.radius;
    var extra = (r1.origin.clone().subtract(this.center.clone())); //(o-c)
    var extra2 = extra.clone().dot(extra.clone()); //(o-c)^2
    
    var first = r1.direction.clone().dot(r1.direction.clone());//direction*direction
    var temp = (r1.direction.clone().dot((r1.origin.clone().subtract(this.center)))); //* (r1.origin - this.center.clone());
    var second = 2.0 * temp;
    var third = (extra2 - rad);

    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.

    // 1. review slides/book math
    
    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation

    // 3. calculate the discriminant
     var discriminant = (second * second) - (4 * first * third );

     var sqrtDelta = (-second - (Math.sqrt(discriminant)));
     var sqrtDelta2 = (-second + (Math.sqrt(discriminant)));

    var min = sqrtDelta/(2*first);
    var max = sqrtDelta2/(2*first);
    var division = (1/9);  
       
    var points = ((r1.origin.clone().add(r1.direction)).multiplyScalar(division));
    var norma =((r1.origin.clone().add(r1.direction)).multiplyScalar(division));

    var point1 = this.center.clone().multiplyScalar(3);
    var norm = this.center.clone();
    var normal = (this.center.clone().multiplyScalar(discriminant)).subtract(this.center.clone());
  

    // 4. use the discriminant to determine if further computation is necessary 
    //    if (determinant...) { ... } else { ... }
  
    if(discriminant > 0 && sqrtDelta > 0)
    {
        return {
        hit: true,
        point: points,
        normal: norma,
        distance: min  
      }; 
    }
    else if(discriminant == 0 && max > 0)
    {
      if( this.radius > 1)
      {
        return{
          hit: true,
          point: point1,
          normal: norm,
          distance: min};
      }
      else{
        return{
          normal: normal,
        };
      }
    }
    else{
        return {hit: false,
          normal: norm,
          point: null}; 
      }

    // 5. return the following object literal "result" based on whether the intersection
    //    is valid (i.e. the intersection is in front of the ray and the ray is not inside
    //    the sphere)
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the closest VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }

    // An object created from a literal that we will return as our result
    // Replace the null values in the properties below with the right values
    // var result = {
    //   hit: true,      // should be of type Boolean
    //   point: hitPoint,    // should be of type Vector3
    //   normal: this.normal,   // should be of type Vector3
    //   distance: alpha, // should be of type Number (scalar)
    // };

     //return result;
  }
}

// EOF 00100001-1