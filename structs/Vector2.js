export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// for texture coordinates
export class Vector2T {
  constructor(u, v) {
    this.u = u;
    this.v = v;
  }
}

Vector2T.prototype.clone = function () {
  return new Vector2T(this.u, this.v);
};
