precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D uMatcapTexture;

void main() {
    vec4 matcapColor = texture2D(uMatcapTexture, vTexCoord);

    gl_FragColor = matcapColor;
}