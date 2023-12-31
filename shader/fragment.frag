precision mediump float;
#define MAX_LIGHTS 20

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uMatcapTexture;
uniform float uRoughness;
uniform float uMetallic;

uniform vec3 uCameraPosition;
uniform int uNumLights;
uniform vec3 uLightPosition[MAX_LIGHTS];
uniform vec3 uLightColor[MAX_LIGHTS];

void main() {

    // ambient lighting (global illumination)
    vec3 ambient = vec3(0.5, 0.5, 0.5);

    vec3 normal = normalize(vNormal.xyz);
    vec3 diffuse = vec3(0, 0, 0);
    vec3 specular = vec3(0, 0, 0);
    vec3 cameraSource = vec3(uCameraPosition.x, uCameraPosition.y, uCameraPosition.z); // camera at (0, 0, 0
    vec3 viewSource = normalize(cameraSource - vWorldPosition);
    for(int i = 0; i < MAX_LIGHTS; i++) {
        if(i > uNumLights)
            break;
        // diffuse lighting (lambertian) lighting
        // light color, light source, normal, diffuse strength
        vec3 lightColor = uLightColor[i];

        // vector pointing from the surface to the light source
        vec3 lightSource = normalize(uLightPosition[i] - vWorldPosition);

        float diffuseStrength = max(0.0, dot(normal, lightSource));
        diffuse += lightColor * diffuseStrength;

        // specular lighting
        vec3 reflectSource = reflect(-lightSource, normal);
        float specularStrength = pow(max(0.0, dot(viewSource, reflectSource)), 4.0);
        specular += lightColor * specularStrength;
    }

    // lighting = ambient + diffuse + specular (blinn-phong model)
    vec3 lighting = vec3(0, 0, 0);
    lighting = ambient * (1.0 - uMetallic) * 0.4 + diffuse * uRoughness + specular * uMetallic; // in between

    vec4 matcapColor = texture2D(uMatcapTexture, vTexCoord);

    gl_FragColor = vec4(matcapColor.rgb * lighting, 1.0);
}