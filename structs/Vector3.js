export default class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

Vector3.prototype.normalize_ = function () {
  let invMag = 1 / Vector3.mag(this);
  this.x *= invMag;
  this.y *= invMag;
  this.z *= invMag;
};

Vector3.zeros = function () {
  return new Vector3(0, 0, 0);
};

Vector3.ones = function () {
  return new Vector3(1, 1, 1);
};

Vector3.add = function (a, b) {
  if (typeof b === "number") return new Vector3(a.x + b, a.y + b, a.z + b);
  return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
};

Vector3.add3 = function (a, b, c) {
  return new Vector3(a.x + b.x + c.x, a.y + b.y + c.y, a.z + b.z + c.z);
};

Vector3.subtract = function (a, b) {
  if (typeof b === "number") return new Vector3(a.x - b, a.y - b, a.z - b);
  return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
};

Vector3.elementMult = function (a, b) {
  if (typeof b === "number") return new Vector3(a.x * b, a.y * b, a.z * b);
  return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
};

Vector3.elementDiv = function (a, b) {
  if (typeof b === "number") return new Vector3(a.x / b, a.y / b, a.z / b);
  return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
};

Vector3.dot = function (a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

Vector3.cross = function (a, b) {
  return new Vector3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
};

Vector3.mag = function (a) {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
};

Vector3.magSq = function (a) {
  return a.x * a.x + a.y * a.y + a.z * a.z;
};

Vector3.distance = function (a, b) {
  return Math.sqrt(
    (a.x - b.x) * (a.x - b.x) +
      (a.y - b.y) * (a.y - b.y) +
      (a.z - b.z) * (a.z - b.z)
  );
};

Vector3.normalize = function (a) {
  let mag = Vector3.mag(a);
  if (mag === 0) return new Vector3(0, 0, 0);
  return new Vector3(a.x / mag, a.y / mag, a.z / mag);
};

Vector3.neg = function (a) {
  return new Vector3(-a.x, -a.y, -a.z);
};

Vector3.toArray = function (a) {
  return [a.x, a.y, a.z];
};

Vector3.fromArray = function (a) {
  if (a.length !== 3)
    console.warn("Vector3.fromArray: array length should be 3");
  return new Vector3(a[0], a[1], a[2]);
};

Vector3.prototype.add = function (b) {
  if (typeof b === "number")
    return new Vector3(this.x + b, this.y + b, this.z + b);

  return new Vector3(this.x + b.x, this.y + b.y, this.z + b.z);
};

Vector3.prototype.add_ = function (b) {
  if (typeof b === "number") {
    this.x += b;
    this.y += b;
    this.z += b;
    return;
  }

  this.x += b.x;
  this.y += b.y;
  this.z += b.z;
};

Vector3.prototype.subtract = function (b) {
  if (typeof b === "number")
    return new Vector3(this.x - b, this.y - b, this.z - b);

  return new Vector3(this.x - b.x, this.y - b.y, this.z - b.z);
};

Vector3.prototype.subtract_ = function (b) {
  if (typeof b === "number") {
    this.x -= b;
    this.y -= b;
    this.z -= b;
    return;
  }

  this.x -= b.x;
  this.y -= b.y;
  this.z -= b.z;
};

Vector3.prototype.elementMult = function (b) {
  if (typeof b === "number")
    return new Vector3(this.x * b, this.y * b, this.z * b);

  return new Vector3(this.x * b.x, this.y * b.y, this.z * b.z);
};

Vector3.prototype.elementDiv = function (b) {
  if (typeof b === "number")
    return new Vector3(this.x / b, this.y / b, this.z / b);

  return new Vector3(this.x / b.x, this.y / b.y, this.z / b.z);
};

Vector3.prototype.max = function (b) {
  if (typeof b === "number")
    return new Vector3(
      Math.max(this.x, b),
      Math.max(this.y, b),
      Math.max(this.z, b)
    );

  return new Vector3(
    Math.max(this.x, b.x),
    Math.max(this.y, b.y),
    Math.max(this.z, b.z)
  );
};

Vector3.prototype.abs = function () {
  return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
};

Vector3.prototype.dot = function (b) {
  return this.x * b.x + this.y * b.y + this.z * b.z;
};

Vector3.prototype.cross = function (b) {
  return new Vector3(
    this.y * b.z - this.z * b.y,
    this.z * b.x - this.x * b.z,
    this.x * b.y - this.y * b.x
  );
};

Vector3.prototype.mag = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector3.prototype.magSq = function () {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};

Vector3.prototype.normalize = function () {
  let mag = this.mag();
  if (mag === 0) return new Vector3(0, 0, 0);
  return new Vector3(this.x / mag, this.y / mag, this.z / mag);
};

Vector3.prototype.normalize_ = function () {
  let mag = this.mag();
  if (mag === 0) return;
  mag = 1 / mag;
  this.x *= mag;
  this.y *= mag;
  this.z *= mag;
};

Vector3.prototype.neg = function () {
  return new Vector3(-this.x, -this.y, -this.z);
};

Vector3.prototype.toArray = function () {
  return [this.x, this.y, this.z];
};

Vector3.prototype.clone = function () {
  return new Vector3(this.x, this.y, this.z);
};

Vector3.prototype.map = function (f) {
  return new Vector3(f(this.x), f(this.y), f(this.z));
};

Vector3.prototype.quaternionRotate = function (q) {
  let rotatedArray = q.rotateVector(this.toArray());
  return Vector3.fromArray(rotatedArray);
};

Vector3.prototype.distance = function (b) {
  return Math.sqrt(
    (this.x - b.x) * (this.x - b.x) +
      (this.y - b.y) * (this.y - b.y) +
      (this.z - b.z) * (this.z - b.z)
  );
};

Vector3.prototype.toColor = function () {
  return color(this.x, this.y, this.z);
};

Vector3.prototype.to4dTensor = function () {
  return tf.tensor2d([[this.x, this.y, this.z, 1]]);
};
