import GameObject from "./GameObject.js";
import BoundingBox from "./physics/BoundingBox.js";

export default class Player extends GameObject {
  constructor(camera) {
    super(camera.position);
    this.camera = camera;
    this.mesh = null;
  }
}

Player.prototype.update = function (dt) {
  this.position = this.camera.position;
  this.boundingBox = new BoundingBox(this.position, 1, 1, 1);
};
