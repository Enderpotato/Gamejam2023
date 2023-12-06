export default class Material {
  constructor(roughness, metallic, color) {
    this.roughness = roughness;
    this.metallic = metallic;
    this.color = color; // Vector3 [0-1]
  }
}
