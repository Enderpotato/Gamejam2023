import BoundingBox from "./BoundingBox.js";
import Mesh from "../shapes/Mesh.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Vector3 from "../structs/Vector3.js";
import MeshCuboid from "../shapes/TestShapes/MeshCuboid.js";
import Player from "../Player.js";

export default class Collider {
  constructor(gameobj) {
    this.gameobj = gameobj;
    this.boundingBox = null;

    this.isCollidingBelow = false;
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
  if (mesh instanceof MeshCuboid) {
    this.boundingBox = BoundingBox.createFromCuboid(this.gameobj);
    return;
  }
};

Collider.prototype.onCollision = function (otherCollider) {
  let otherObject = otherCollider.gameobj;
  if (this.gameobj.immovable && otherObject.immovable) return;

  // Calculate the overlap on each axis
  let overlap = new Vector3(
    Math.min(this.boundingBox.maxX, otherCollider.boundingBox.maxX) -
      Math.max(this.boundingBox.minX, otherCollider.boundingBox.minX),
    Math.min(this.boundingBox.maxY, otherCollider.boundingBox.maxY) -
      Math.max(this.boundingBox.minY, otherCollider.boundingBox.minY),
    Math.min(this.boundingBox.maxZ, otherCollider.boundingBox.maxZ) -
      Math.max(this.boundingBox.minZ, otherCollider.boundingBox.minZ)
  ).max(0);

  // Find the minimum overlap axis
  let minOverlap = Math.min(overlap.x, overlap.y, overlap.z);

  // Calculate the collision normal based on the minimum overlap axis
  let collisionNormal;
  if (minOverlap == overlap.x) {
    collisionNormal = new Vector3(1, 0, 0);
  } else if (minOverlap == overlap.y) {
    collisionNormal = new Vector3(0, 1, 0);
  } else {
    collisionNormal = new Vector3(0, 0, 1);
  }

  // Determine which bounding box is overlapping which
  if (
    (overlap.x &&
      this.boundingBox.position.x > otherCollider.boundingBox.position.x) ||
    (overlap.y &&
      this.boundingBox.position.y > otherCollider.boundingBox.position.y) ||
    (overlap.z &&
      this.boundingBox.position.z > otherCollider.boundingBox.position.z)
  ) {
    collisionNormal = collisionNormal.neg();
  }
  if (collisionNormal.y > 0) this.isCollidingBelow = true;
  if (collisionNormal.y < 0) otherCollider.isCollidingBelow = true;

  // Project the velocities onto the collision normal
  let v1n = this.gameobj.velocity.dot(collisionNormal);
  let v2n = otherObject.velocity.dot(collisionNormal);

  // Calculate the new velocities along the normal direction after the collision
  let restitution =
    this.gameobj.material.restitution * otherObject.material.restitution;
  let newV1n, newV2n;

  if (this.gameobj.immovable) {
    // If this object is immovable, its velocity does not change
    newV1n = v1n;
    newV2n = -restitution * v2n;
  } else if (otherObject.immovable) {
    // If the other object is immovable, its velocity does not change
    newV1n = -restitution * v1n;
    newV2n = v2n;
  } else {
    let mdiff = this.gameobj.mass - otherObject.mass;
    let invMassSum = 1 / (this.gameobj.mass + otherObject.mass);
    newV1n =
      restitution * (mdiff * v1n + 2 * otherObject.mass * v2n) * invMassSum;
    newV2n =
      restitution * (mdiff * v2n + 2 * this.gameobj.mass * v1n) * invMassSum;
  }

  // round velocities to 0
  if (Math.abs(newV1n) < 0.01) newV1n = 0;
  if (Math.abs(newV2n) < 0.01) newV2n = 0;

  this.gameobj.velocity = Vector3.elementMult(collisionNormal, newV1n);
  otherObject.velocity = Vector3.elementMult(collisionNormal, newV2n);

  let overlapMag = minOverlap; //+ 0.0001;
  // Resolve penetration
  // let thisObjectImmovable =
  //   this.gameobj.immovable || this.gameobj instanceof Player;
  // let otherObjectImmovable =
  //   otherObject.immovable || otherObject instanceof Player;
  let thisObjectImmovable = this.gameobj.immovable;
  let otherObjectImmovable = otherObject.immovable;

  if (thisObjectImmovable && !otherObjectImmovable) {
    otherObject.position.add_(collisionNormal.elementMult(overlapMag));
    return;
  }
  if (otherObjectImmovable && !thisObjectImmovable) {
    this.gameobj.position.add_(collisionNormal.elementMult(-overlapMag));
    return;
  }
  this.gameobj.position.add_(collisionNormal.elementMult(-overlapMag));
  otherObject.position.add_(collisionNormal.elementMult(overlapMag));
};
