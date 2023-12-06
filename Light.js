export default class Light {
  constructor(position, color) {
    this.position = position || [0, 0, 0];
    this.color = color || [1, 1, 1];
  }
}

Light.prototype.getUPosition = function () {
  return this.position;
};

Light.prototype.getUColor = function () {
  return this.color;
};
