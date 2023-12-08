export default class Material {
  constructor(roughness, metallic, bounce) {
    this.roughness = roughness || 0.5;
    this.metallic = metallic || 0.5;
    this.restitution = bounce || 0.2;
  }
}
