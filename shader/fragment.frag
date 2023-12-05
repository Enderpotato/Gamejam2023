precision mediump float;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uMatcapTexture;
uniform vec3 uCameraPosition;

void main() {

    // ambient lighting (global illumination)
    vec3 ambient = vec3(0.5, 0.5, 0.5);

    // diffuse lighting (lambertian) lighting
    // light color, light source, normal, diffuse strength
    vec3 normal = normalize(vNormal.xyz);
    vec3 lightColor = vec3(1.0, 1.0, 1.0); // color - white

    // vector pointing from the surface to the light source
    vec3 lightSource = normalize(vec3(0, 0, 0) - vWorldPosition); // light source at (0, 0, 0)

    float diffuseStrength = max(0.0, dot(normal, lightSource));
    vec3 diffuse = lightColor * diffuseStrength;

    // specular lighting 
    vec3 cameraSource = vec3(uCameraPosition.x, uCameraPosition.y, uCameraPosition.z); // camera at (0, 0, 0
    vec3 viewSource = normalize(cameraSource - vWorldPosition);
    vec3 reflectSource = reflect(-lightSource, normal);
    float specularStrength = pow(max(0.0, dot(viewSource, reflectSource)), 4.0);
    vec3 specular = lightColor * specularStrength;

    // lighting = ambient + diffuse + specular (blinn-phong model)
    vec3 lighting = vec3(0, 0, 0);
    // lighting = ambient * 0.2 + diffuse * 0.7 + specular; // very metallic
    lighting = ambient * 0.2 + diffuse + specular * 0.4; // less metallic
    // lighting = vec3(1.0, 1.0, 1.0);

    vec4 matcapColor = texture2D(uMatcapTexture, vTexCoord);

    gl_FragColor = vec4(matcapColor.rgb * lighting, 1.0);
}