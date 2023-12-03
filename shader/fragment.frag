precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D uMatcapTexture;

void main() {
    vec4 matcapColor = texture2D(uMatcapTexture, vTexCoord);
    // vec4 matcapColor = vec4(1.0, 0.0, 0.0, 1.0);

    gl_FragColor = matcapColor;
}