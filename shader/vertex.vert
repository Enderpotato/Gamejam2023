precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec2 vTexCoord;

void main() {

    vec4 position = vec4(aPosition, 1.0);

    gl_Position = uProjectionMatrix * uModelViewMatrix * position;
    // gl_Position = uProjectionMatrix * uCameraViewMatrix * position;

    // gl_Position = uProjectionMatrix * position;
    // gl_Position = position;

    vTexCoord = aTexCoord;
}