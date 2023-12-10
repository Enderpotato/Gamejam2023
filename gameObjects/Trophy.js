import GameObject from "./GameObject.js";
import Vector3 from "../structs/Vector3.js";
import { player } from "../sceneSetup.js";
import { scene } from "../sceneSetup.js";

export default class Trophy extends GameObject {
  constructor(position, mesh) {
    super(position, mesh);
  }
}

Trophy.prototype.update = function (dt) {
  // semi-implicit euler integration (copy-pasted from GameObject.js cuz this dont have mesh)
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

  if (this.collider.collide(player.collider)) {
    console.log("You win!");

    let index = scene.objects.indexOf(this);

    if (index !== -1) {
      scene.objects.splice(index, 1);
    }
    // bro i swear this is not me copilot literally generated this
    // window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
};
