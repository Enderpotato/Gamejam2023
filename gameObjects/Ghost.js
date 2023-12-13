import GameObject from "./GameObject.js";
import Vector3 from "../structs/Vector3.js";
import Material from "../graphics/Material.js";
import { ghost, player } from "../sceneSetup.js";
import { castRay } from "../helperFuncs/raycast.js";
import Direction from "../search2.js";

export default class Ghost extends GameObject {
  constructor(position, mesh) {
    super(position, mesh);
    this.scale = new Vector3(3, 3, 3);
    this.setMaterial(new Material(0.9, 0.4, 0.1));
    this.hostile = false;
    this.direction = new Direction(16);
  }
}

Ghost.prototype.update = function (dt) {
  // semi-implicit euler integration (copy-pasted from GameObject.js)
  this.acc = Vector3.elementMult(this.force, this.invMass);
  if (this.immovable) this.acc = Vector3.zeros();
  this.velocity.add_(this.acc.elementMult(dt));
  this.position.add_(this.velocity.elementMult(dt));
  this.acc = Vector3.zeros();
  this.force = Vector3.zeros();

  //idk (im racist)
  let ghostVel = this.direction
    .getDirection(this.position, player.position, ghost.rotation.y)
    .normalize()
    .elementMult(deltaTime * 10);
  this.position.add_(ghostVel);
  let PI = Math.PI;
  let relativePositionToGhost = this.position.subtract(player.position);

  this.rotation.y = Math.atan2(
    relativePositionToGhost.x,
    -relativePositionToGhost.z
  );

  const quat = Quaternion.fromEulerLogical(
    this.rotation.x,
    this.rotation.y,
    this.rotation.z,
    "XYZ"
  );
  this.mesh.update(this.position, quat, this.scale);
  this.collider.createBoundingBox();

  // floating effect
  this.collider.boundingBox.translateBottomDown(2);
};
