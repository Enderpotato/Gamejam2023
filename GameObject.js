import Vector3 from "./structs/Vector3.js";
import Collider from "./physics/Collider.js";
import Material from "./graphics/Material.js";

export default class GameObject {
  constructor(position, mesh) {
    this.position = position;
    this.rotation = Vector3.zeros();
    this.rotation.z = Math.PI; // idk why meshes are always rolled 180 degrees, dis to fix it
    this.rotation.y = Math.PI;
    this.scale = new Vector3(1, 1, 1);

    this.mesh = mesh;
    this.collider = new Collider(this);
    this.immovable = false;

    this.mass = 1;
    this.invMass = 1 / this.mass;
    this.material = new Material();

    this.velocity = Vector3.zeros();
    this.acc = Vector3.zeros();
    this.force = Vector3.zeros();
    this.angularVelocity = Vector3.zeros();
  }
}

GameObject.prototype.setMaterial = function (material) {
  this.material = material;
};

GameObject.prototype.setMass = function (mass) {
  this.mass = mass;
  this.invMass = 1 / mass;
};

GameObject.prototype.update = function (dt) {
  // semi-implicit euler integration
  this.acc = Vector3.elementMult(this.force, this.invMass);
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

  const quat = Quaternion.fromEulerLogical(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z,
    "XYZ"
  );
  this.mesh.update(this.position, quat, this.scale);
  this.collider.createBoundingBox();
};

