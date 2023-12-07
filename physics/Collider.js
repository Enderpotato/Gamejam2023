import BoundingBox from "./BoundingBox.js";
import Mesh from "../shapes/Mesh.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Vector3 from "../structs/Vector3.js";

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
  this.boundingBox = BoundingBox.createFromMesh(this.gameobj);
  return;
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
  this.isCollidingBelow = false;
  otherCollider.isCollidingBelow = false;
  // Calculate the overlap on each axis
  let overlap = new Vector3(
    Math.max(0, this.boundingBox.maxX - otherCollider.boundingBox.minX),
    Math.max(0, this.boundingBox.maxY - otherCollider.boundingBox.minY),
    Math.max(0, this.boundingBox.maxZ - otherCollider.boundingBox.minZ)
  );

  // Calculate the collision normal
  let collisionNormal;
  if (overlap.x < overlap.y && overlap.x < overlap.z) {
    collisionNormal = new Vector3(
      Math.sign(this.gameobj.position.x - otherObject.position.x),
      0,
      0
    );
    overlap = new Vector3(overlap.x, 0, 0);
  } else if (overlap.y < overlap.z) {
    collisionNormal = new Vector3(
      0,
      Math.sign(this.gameobj.position.y - otherObject.position.y),
      0
    );
    overlap = new Vector3(0, overlap.y, 0);
  } else {
    collisionNormal = new Vector3(
      0,
      0,
      Math.sign(this.gameobj.position.z - otherObject.position.z)
    );
    overlap = new Vector3(0, 0, overlap.z);
  }

  // Project the velocities onto the collision normal
  let v1n = this.gameobj.velocity.dot(collisionNormal);
  let v2n = otherObject.velocity.dot(collisionNormal);

  // Calculate the new velocities along the normal direction after the collision
  let restitution = this.gameobj.restitution * otherObject.restitution;
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

  const RESTING_THRESHOLD = 0.1;

  // If the object is moving downwards slowly enough, consider it to be at rest
  if (collisionNormal.y > 0 && Math.abs(newV1n) < RESTING_THRESHOLD) {
    newV1n = 0;
  }
  if (collisionNormal.y < 0 && Math.abs(newV2n) < RESTING_THRESHOLD) {
    newV2n = 0;
  }

  // Convert the velocities back to the original coordinate system
  this.gameobj.velocity = Vector3.elementMult(collisionNormal, newV1n);

  otherObject.velocity = Vector3.elementMult(collisionNormal, newV2n);

  let overlapMag = overlap.mag() * 0.5 + 0.001;

  // haha idk how to fix so i did this
  if (this.gameobj.mesh instanceof Mesh && otherObject.mesh instanceof Mesh)
    collisionNormal.y *= -1;

  // Resolve penetration
  if (!this.gameobj.immovable) {
    this.gameobj.position.x += collisionNormal.x * overlapMag;
    this.gameobj.position.y += collisionNormal.y * overlapMag;
    this.gameobj.position.z += collisionNormal.z * overlapMag;

    // If the object is on the ground, stop applying gravity
    if (collisionNormal.y < 0) {
      this.isCollidingBelow = true;
      this.gameobj.position.y += 0.001;
    }
  }
  if (!otherObject.immovable) {
    otherObject.position.x -= collisionNormal.x * overlapMag;
    otherObject.position.y -= collisionNormal.y * overlapMag;
    otherObject.position.z -= collisionNormal.z * overlapMag;

    if (collisionNormal.y > 0) {
      otherCollider.isCollidingBelow = true;
      otherObject.position.y += 0.001;
    }
  }
};
