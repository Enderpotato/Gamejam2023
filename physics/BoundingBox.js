import Vector3 from "../structs/Vector3.js";

export default class BoundingBox {
  constructor(min, max) {
    this.minX = min.x;
    this.minY = min.y;
    this.minZ = min.z;

    this.maxX = max.x;
    this.maxY = max.y;
    this.maxZ = max.z;

    this.w = this.maxX - this.minX;
    this.l = this.maxY - this.minY;
    this.h = this.maxZ - this.minZ;
    this.position = new Vector3(
      (this.maxX + this.minX) / 2,
      (this.maxY + this.minY) / 2,
      (this.maxZ + this.minZ) / 2
    );
  }
}

BoundingBox.intersect = function (a, b) {
  return (
    a.minX <= b.maxX &&
    a.maxX >= b.minX &&
    a.minY <= b.maxY &&
    a.maxY >= b.minY &&
    a.minZ <= b.maxZ &&
    a.maxZ >= b.minZ
  );
};

BoundingBox.createFromCuboid = function (gameobj) {
  let halfWidth = gameobj.mesh.w * 0.5;
  let halfLength = gameobj.mesh.l * 0.5;
  let halfHeight = gameobj.mesh.h * 0.5;

  let min = new Vector3(
    gameobj.position.x - halfWidth,
    gameobj.position.y - halfLength,
    gameobj.position.z - halfHeight
  );

  let max = new Vector3(
    gameobj.position.x + halfWidth,
    gameobj.position.y + halfLength,
    gameobj.position.z + halfHeight
  );

  return new BoundingBox(min, max);
};

BoundingBox.createFromMesh = function (gameobj) {
  let mesh = gameobj.mesh;
  let min = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  let max = new Vector3(
    -Number.MAX_VALUE,
    -Number.MAX_VALUE,
    -Number.MAX_VALUE
  );

  for (let triangle of mesh.triangles) {
    for (let vertex of triangle.vertices) {
      min.x = Math.min(min.x, vertex.x);
      min.y = Math.min(min.y, vertex.y);
      min.z = Math.min(min.z, vertex.z);
      max.x = Math.max(max.x, vertex.x);
      max.y = Math.max(max.y, vertex.y);
      max.z = Math.max(max.z, vertex.z);
    }
  }
  return new BoundingBox(min, max);
};

BoundingBox.prototype.translateBottomDown = function (amount) {
  this.maxY += amount;
  this.position.y -= amount;
  this.l += amount;
};

BoundingBox.prototype.draw = function () {
  stroke(255, 0, 0);

  noFill();
  push();
  translate(this.position.x, this.position.y, this.position.z);
  box(this.w, this.l, this.h);
  pop();
};
