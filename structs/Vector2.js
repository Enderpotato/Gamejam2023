export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

Vector2.prototype.add = function (b) {
  return new Vector2(this.x + b.x, this.y + b.y);
};

Vector2.prototype.sub = function (b) {
  return new Vector2(this.x - b.x, this.y - b.y);
};

Vector2.prototype.mag = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.normalize = function () {
  let mag = this.mag();
  return new Vector2(this.x / mag, this.y / mag);
};

Vector2.prototype.normalize_ = function () {
  let mag = this.mag();
  this.x /= mag;
  this.y /= mag;
};

// for texture coordinates
export class Vector2T {
  constructor(u, v, w = 1) {
    this.u = u;
    this.v = v;
    this.w = w;
  }
}
Vector2T.lerp = function (a, b, t) {
  return new Vector2T(
    a.u + (b.u - a.u) * t,
    a.v + (b.v - a.v) * t,
    a.w + (b.w - a.w) * t
  );
};

Vector2T.prototype.clone = function () {
  return new Vector2T(this.u, this.v, this.w);
};
