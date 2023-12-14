import GameObject from "./GameObject.js";
import Vector3 from "../structs/Vector3.js";
import Vector2 from "../structs/Vector2.js";
import Material from "../graphics/Material.js";
import { player, scene } from "../preload.js";
import Direction from "../search2.js";

export default class Ghost extends GameObject {
  constructor(position, mesh) {
    super(position, mesh);
    this.scale = new Vector3(3, 3, 3);
    this.setMaterial(new Material(0.9, 0.4, 0.1));
    this.hostile = false;
    this.hostileCooldown = 0;
    this.lifetime = 100;
    this.direction = new Direction(8);
  }
}

Ghost.prototype.update = function (dt) {
  this.lifetime -= dt;
  if (this.lifetime < 0) {
    let index = scene.objects.indexOf(this);
    scene.objects.splice(index, 1);
  }

  // semi-implicit euler integration (copy-pasted from GameObject.js)
  this.acc = Vector3.elementMult(this.force, this.invMass);
  if (this.immovable) this.acc = Vector3.zeros();
  this.velocity.add_(this.acc.elementMult(dt));
  this.position.add_(this.velocity.elementMult(dt));
  this.acc = Vector3.zeros();
  this.force = Vector3.zeros();

  //idk (im racist)
  let vectorToPlayer = player.position.subtract(this.position);
  let distToPlayer = new Vector2(vectorToPlayer.x, vectorToPlayer.z).mag();
  // player is within 50 units (ghost can detect through walls)
  this.hostile = distToPlayer < 50;

  if (this.hostile) {
    let ghostVel = this.direction
      .getDirection(this.position, player.position)
      .elementMult(deltaTime * 10);
    this.rotation.y = Math.atan2(-ghostVel.x, ghostVel.z);
    this.position.add_(ghostVel);
  } else {
    let ghostVel = this.direction
      .wanderDirection(this.position)
      .elementMult(deltaTime * 10);
    this.rotation.y = Math.atan2(-ghostVel.x, ghostVel.z);
    this.position.add_(ghostVel);
  }

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

Ghost.prototype.collideWithPlayer = function () {
  console.log("boo");
};
