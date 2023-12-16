import Vector3 from "../structs/Vector3.js";

export default class Light {
  constructor(position, color) {
    this.position = position || new Vector3(0, 0, 0);
    this.color = color || new Vector3(1, 1, 1);
    this.lit = true;
  }
}

Light.prototype.update = function (dt) {};

Light.prototype.reset = function () {};

Light.prototype.getUPosition = function () {
  return this.position.toArray();
};

Light.prototype.getUColor = function () {
  return this.color.toArray();
};
