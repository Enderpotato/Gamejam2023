import Vector3 from "./structs/Vector3.js";
import GameObject from "./GameObject.js";

export default class Steve extends GameObject {
  constructor(position, mesh) {
    super(position);
    this.mesh = mesh || null;
  }
}

Steve.prototype.update = function (dt) {
  // semi-implicit euler integration (copy-pasted from GameObject.js)
  this.acc = Vector3.elementMult(this.force, this.invMass);
  if (this.immovable) this.acc = Vector3.zeros();
  this.velocity.add_(this.acc.elementMult(dt));
  this.position.add_(this.velocity.elementMult(dt));
  this.acc = Vector3.zeros();
  this.force = Vector3.zeros();

  const quat = Quaternion.fromEulerLogical(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z,
    "XYZ"
  );
  this.mesh.update(this.position, quat, this.scale);
  this.collider.createBoundingBox();
};
