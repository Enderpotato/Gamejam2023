precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform float uAspectRatio;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    vWorldPosition = aPosition;

    vec4 position = vec4(aPosition, 1.0);

    gl_Position = uProjectionMatrix * uModelViewMatrix * position;

    gl_Position.y *= uAspectRatio;

    vTexCoord = aTexCoord;

    vNormal = aNormal;

}