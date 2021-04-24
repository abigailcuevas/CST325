precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    
    // diffuse contribution
    // 1. normalize the light direction and store in a separate variable
    
    vec3 nuLightDirection = normalize(uLightPosition - vWorldPosition);
   
   // 2. normalize the world normal and store in a separate variable
    vec3 nvWorldNormal = normalize(vWorldNormal);
    // 3. calculate the lambert term
    float lambert = dot(nvWorldNormal, nuLightDirection);


    // specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 nEyeDirection = normalize(uCameraPosition - vWorldPosition);
    // 2. in world space, calculate the reflection vector (normalized)
    vec3 reflectionVec = normalize(reflect(-nuLightDirection,nvWorldNormal));
    // 3. calculate the phong term
    float phong = pow(max(dot(nEyeDirection, reflectionVec), 0.0), 64.0);

    vec3 lightAttenuation = texture2D(uTexture, vTexcoords).rgb;

    // combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    vec3 diffuseVal = texture2D(uTexture,vTexcoords).rgb * lambert;
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)
   vec3 specularVal = texture2D(uTexture, vTexcoords).rgb * phong;
    
    vec3 ambient = lightAttenuation * 0.1;
    vec3 diffuseColor = diffuseVal * 1.0;
    vec3 specColor = specularVal  * 0.3;

    vec3 finalColor = ambient + diffuseColor + specColor;

    gl_FragColor = vec4(finalColor, 1.0);
    
}
