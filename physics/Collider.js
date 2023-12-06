import BoundingBox from "./BoundingBox.js";
import Mesh from "../shapes/Mesh.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Vector3 from "../structs/Vector3.js";

export default class Collider {
  constructor(gameobj) {
    this.gameobj = gameobj;
    this.boundingBox = null;
  }
}

Collider.prototype.collide = function (other) {
  if (this.boundingBox == null) this.createBoundingBox();
  if (other.boundingBox == null) other.createBoundingBox();
  return BoundingBox.intersect(this.boundingBox, other.boundingBox);
};

Collider.prototype.createBoundingBox = function () {
  let mesh = this.gameobj.mesh;
  if (mesh instanceof Mesh) {
    this.boundingBox = BoundingBox.createFromMesh(this.gameobj);
    return;
  }
  if (mesh instanceof MeshCube) {
    this.boundingBox = BoundingBox.createFromCube(this.gameobj);
    return;
  }
};

Collider.prototype.onCollision = function (otherCollider) {
  let otherObject = otherCollider.gameobj;
  // Calculate the collision normal
  let collisionNormal = Vector3.subtract(
    this.gameobj.position,
    otherObject.position
  ).normalize();

  // Calculate the overlap between the objects
  let overlap = new Vector3(
    this.boundingBox.w + otherCollider.boundingBox.w,
    this.boundingBox.l + otherCollider.boundingBox.l,
    this.boundingBox.h + otherCollider.boundingBox.h
  )
    .subtract(
      Vector3.subtract(this.gameobj.position, otherObject.position).abs()
    )
    .max(Vector3.zeros())
    .elementMult(0.5);

  //   Move the objects apart
  this.gameobj.position.add_(
    overlap.elementMult(collisionNormal.elementMult(0.5))
  );
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
  let v1n = this.gameobj.velocity.dot(collisionNormal);
  let v1t = this.gameobj.velocity.dot(collisionTangent);
  let v2n = otherObject.velocity.dot(collisionNormal);
  let v2t = otherObject.velocity.dot(collisionTangent);

  // Calculate the new velocities along the normal direction after the collision
  let mdiff = this.gameobj.mass - otherObject.mass;
  let invMassSum = 1 / (this.gameobj.mass + otherObject.mass);
  let restitution = this.gameobj.restitution * otherObject.restitution;
  let newV1n =
    restitution * (mdiff * v1n + 2 * otherObject.mass * v2n) * invMassSum;
  let newV2n =
    restitution * (mdiff * v2n + 2 * this.gameobj.mass * v1n) * invMassSum;

  // The velocities along the tangent direction don't change
  let newV1t = v1t;
  let newV2t = v2t;

  // Convert the velocities back to the original coordinate system
  this.gameobj.velocity = Vector3.add(
    Vector3.elementMult(collisionNormal, newV1n),
    Vector3.elementMult(collisionTangent, newV1t)
  );
  otherObject.velocity = Vector3.add(
    Vector3.elementMult(collisionNormal, newV2n),
    Vector3.elementMult(collisionTangent, newV2t)
  );
};
