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
    this.direction = new Direction();
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
  this.position.add_(this.direction.getDirection(this.position, player.position).normalize().elementMult(deltaTime*10));
  // let noisyVector = new Vector3(noise(this.position.x), 0, noise(this.position.y)).normalize().elementMult(deltaTime);
  // console.log(player.position)
  // this.position.add_(noisyVector.normalize());
  // console.log(this.direction);
  
  let PI = Math.PI;
  let yRotations = [0, PI/4, PI/2, 3*PI/4, PI, -3*PI/4, -PI/2, -PI/4];
  let relativePosition = this.position.subtract(player.position);

  if (Math.sign(relativePosition.x) == -1 && Math.sign(relativePosition.z) == -1){
    this.rotation.y = -Math.atan(relativePosition.x/relativePosition.z);
  } else if (Math.sign(relativePosition.x) == 1 && Math.sign(relativePosition.z) == -1){
    this.rotation.y = -Math.atan(relativePosition.x/relativePosition.z);
  } else if (Math.sign(relativePosition.x) == 1 && Math.sign(relativePosition.z) == 1){
    this.rotation.y = PI - Math.atan(relativePosition.x/relativePosition.z);
  } else if (Math.sign(relativePosition.x) == -1 && Math.sign(relativePosition.z) == 1){
    this.rotation.y = -PI - Math.atan(relativePosition.x/relativePosition.z);
  }
  // console.log(Math.sign(relativePosition.x), Math.sign(relativePosition.z))

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
