export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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
