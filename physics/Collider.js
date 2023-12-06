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
  // Calculate the overlap between the objects
  let overlap = new Vector3(
    this.boundingBox.w / 2 +
      otherCollider.boundingBox.w / 2 -
      Math.abs(this.gameobj.position.x - otherObject.position.x),
    this.boundingBox.l / 2 +
      otherCollider.boundingBox.l / 2 -
      Math.abs(this.gameobj.position.y - otherObject.position.y),
    this.boundingBox.h / 2 +
      otherCollider.boundingBox.h / 2 -
      Math.abs(this.gameobj.position.z - otherObject.position.z)
  );

  // Calculate the collision normal
  let collisionNormal;
  if (overlap.x < overlap.y && overlap.x < overlap.z) {
    collisionNormal = new Vector3(
      Math.sign(this.gameobj.position.x - otherObject.position.x),
      0,
      0
    );
  } else if (overlap.y < overlap.z) {
    collisionNormal = new Vector3(
      0,
      Math.sign(this.gameobj.position.y - otherObject.position.y),
      0
    );
  } else {
    collisionNormal = new Vector3(
      0,
      0,
      Math.sign(this.gameobj.position.z - otherObject.position.z)
    );
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
  if (collisionNormal.y < 0 && Math.abs(newV1n) < RESTING_THRESHOLD) {
    newV1n = 0;
  }

  // Convert the velocities back to the original coordinate system
  this.gameobj.velocity = Vector3.elementMult(collisionNormal, newV1n);

  otherObject.velocity = Vector3.elementMult(collisionNormal, newV2n);

  // Displace the objects out of the collision
  let minOverlap = Math.min(overlap.x, overlap.y, overlap.z);
  if (!this.gameobj.immovable) {
    this.gameobj.position.add_(collisionNormal.elementMult(minOverlap));
  }
  if (!otherObject.immovable) {
    otherObject.position.subtract_(collisionNormal.elementMult(minOverlap));
  }
};

Collider.prototype.drawBoundingBox = function () {
  if (this.boundingBox == null) this.createBoundingBox();
  this.boundingBox.draw();
};
