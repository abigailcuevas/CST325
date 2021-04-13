precision mediump float;

uniform sampler2D uTexture;
//uniform sampler2D tempTexture;
uniform float uAlpha;
uniform float uTempAlpha;

// todo #3 - receive texture coordinates and verify correctness by DONE
// using them to set the pixel color 
varying vec2 fragmentShader;

void main(void) {
    // todo #3 DONE
   //gl_FragColor = vec4(fragmentShader,0.0,1.0);

    // todo #5 DONE
    //gl_FragColor=texture2D(uTexture,fragmentShader);

    // todo #11 DONE
    vec4 color1 = texture2D(uTexture, fragmentShader+(cos(uTempAlpha)/(3.14)/1.5));
    gl_FragColor = color1; 
    gl_FragColor.a = uAlpha;

}
