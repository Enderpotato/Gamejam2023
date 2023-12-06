import Vector3 from "./structs/Vector3.js";
import Collider from "./physics/Collider.js";

export default class GameObject {
  constructor(position, mesh) {
    this.position = position;
    this.rotation = Vector3.zeros();
    this.mesh = mesh;
    this.collider = new Collider(this);
    this.immovable = false;
    if (mesh != null) mesh.position = position;

    this.mass = 1;
    this.inverseMass = 1 / this.mass;
    this.restitution = 0.1; // bounciness

    this.velocity = Vector3.zeros();
    this.acc = Vector3.zeros();
    this.force = Vector3.zeros();
    this.angularVelocity = Vector3.zeros();
    this.rotation.z = Math.PI;
  }
}

GameObject.prototype.setMass = function (mass) {
  this.mass = mass;
  this.inverseMass = 1 / mass;
};

GameObject.prototype.update = function (dt) {
  // semi-implicit euler integration
  this.acc = Vector3.elementMult(this.force, this.inverseMass);
  if (this.immovable) this.acc = Vector3.zeros();
  this.velocity.add_(this.acc.elementMult(dt));
  this.position.add_(this.velocity.elementMult(dt));
  this.acc = Vector3.zeros();
  this.force = Vector3.zeros();

  let [rotate_x, rotate_y, rotate_z] = [0, 0, 0];
  // i, o, p key for axis rotation (DEBUG)
  const speed = 2 * dt;
  if (keyIsDown(73)) rotate_x = speed;
  if (keyIsDown(79)) rotate_y = speed;
  if (keyIsDown(80)) rotate_z = speed;
  this.rotation.add_(new Vector3(rotate_x, rotate_y, rotate_z));

  this.collider.createBoundingBox();

  const quat = Quaternion.fromEulerLogical(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z,
    "XYZ"
  );

  this.mesh.update(this.position, quat);
};
