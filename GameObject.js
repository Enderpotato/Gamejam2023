import Vector3 from "./structs/Vector3.js";
import BoundingBox from "./physics/BoundingBox.js";
import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";

export default class GameObject {
  constructor(position, mesh) {
    this.position = position;
    this.rotation = Vector3.zeros();
    this.mesh = mesh;
    if (mesh != null) mesh.position = position;

    this.mass = 1;
    this.inverseMass = 1 / this.mass;
    this.restitution = 1; // bounciness

    this.velocity = Vector3.zeros();
    this.acc = Vector3.zeros();
    this.force = Vector3.zeros();
    this.angularVelocity = Vector3.zeros();

    // this.inertia = new Vector3(
    //   this.boundingBox.w * this.boundingBox.w +
    //     this.boundingBox.l * this.boundingBox.l,
    //   this.boundingBox.w * this.boundingBox.w +
    //     this.boundingBox.h * this.boundingBox.h,
    //   this.boundingBox.l * this.boundingBox.l +
    //     this.boundingBox.h * this.boundingBox.h
    // ).elementMult(this.mass / 12);
  }
}

GameObject.prototype.update = function (dt) {
  // semi-implicit euler integration
  this.acc = Vector3.elementMult(this.force, this.inverseMass);
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

  this.createBoundingBox();

  const quat = Quaternion.fromEulerLogical(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z,
    "XYZ"
  );

  this.mesh.update(this.position, quat);
};

GameObject.prototype.createBoundingBox = function () {
  if (this.mesh instanceof Mesh) {
    this.boundingBox = BoundingBox.createFromMesh(this);
    return;
  }
  if (this.mesh instanceof MeshCube) {
    this.boundingBox = BoundingBox.createFromCube(this);
    return;
  }
};

GameObject.prototype.onCollision = function (otherObject) {
  // Calculate the collision normal
  let collisionNormal = Vector3.subtract(
    this.position,
    otherObject.position
  ).normalize();

  // Calculate the overlap between the objects
  let overlap = new Vector3(
    this.boundingBox.w + otherObject.boundingBox.w,
    this.boundingBox.l + otherObject.boundingBox.l,
    this.boundingBox.h + otherObject.boundingBox.h
  )
    .subtract(Vector3.subtract(this.position, otherObject.position).abs())
    .max(Vector3.zeros())
    .elementMult(0.5);

  //   Move the objects apart
  this.position.add_(overlap.elementMult(collisionNormal.elementMult(0.5)));
  otherObject.position.add_(
    overlap.elementMult(collisionNormal.elementMult(-0.5))
  );

  // Calculate the collision tangent
  let collisionTangent = new Vector3(
    -collisionNormal.y,
    collisionNormal.x,
    collisionNormal.z
  );

  // Project the velocities onto the collision normal and tangent
  let v1n = this.velocity.dot(collisionNormal);
  let v1t = this.velocity.dot(collisionTangent);
  let v2n = otherObject.velocity.dot(collisionNormal);
  let v2t = otherObject.velocity.dot(collisionTangent);

  // Calculate the new velocities along the normal direction after the collision
  let mdiff = this.mass - otherObject.mass;
  let invMassSum = 1 / (this.mass + otherObject.mass);
  let restitution = this.restitution * otherObject.restitution;
  let newV1n =
    restitution * (mdiff * v1n + 2 * otherObject.mass * v2n) * invMassSum;
  let newV2n = restitution * (mdiff * v2n + 2 * this.mass * v1n) * invMassSum;

  // The velocities along the tangent direction don't change
  let newV1t = v1t;
  let newV2t = v2t;

  // Convert the velocities back to the original coordinate system
  this.velocity = Vector3.add(
    Vector3.elementMult(collisionNormal, newV1n),
    Vector3.elementMult(collisionTangent, newV1t)
  );
  otherObject.velocity = Vector3.add(
    Vector3.elementMult(collisionNormal, newV2n),
    Vector3.elementMult(collisionTangent, newV2t)
  );
};
