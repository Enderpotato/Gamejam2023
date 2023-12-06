import Vector3 from "../structs/Vector3.js";

export default class BoundingBox {
  constructor(pos_vec, w, l, h) {
    this.w = w;
    this.l = l;
    this.h = h;
    this.pos = pos_vec;

    this.minX = pos_vec.x - w / 2;
    this.minY = pos_vec.y - l / 2;
    this.minZ = pos_vec.z - h / 2;

    this.maxX = pos_vec.x + w / 2;
    this.maxY = pos_vec.y + l / 2;
    this.maxZ = pos_vec.z + h / 2;
  }
}

BoundingBox.createFromMinMax = function (min, max) {
  let w = max.x - min.x;
  let l = max.y - min.y;
  let h = max.z - min.z;
  let pos = new Vector3(
    (max.x + min.x) / 2,
    (max.y + min.y) / 2,
    (max.z + min.z) / 2
  );
  return new BoundingBox(pos, w, l, h);
};

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

BoundingBox.createFromCube = function (gameobj) {
  let width = gameobj.mesh.width;
  return new BoundingBox(gameobj.position, width, width, width);
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

  return BoundingBox.createFromMinMax(min, max);
};

BoundingBox.prototype.draw = function () {
  // Draw the bounding box
  fill(255, 0, 0, 30);
  beginShape(TRIANGLES);
  vertex(this.maxX, this.maxY, this.maxZ);
  vertex(this.maxX, this.maxY, this.minZ);
  vertex(this.maxX, this.minY, this.maxZ);
  vertex(this.maxX, this.minY, this.maxZ);
  vertex(this.maxX, this.maxY, this.minZ);
  vertex(this.maxX, this.minY, this.minZ);

  vertex(this.minX, this.maxY, this.maxZ);
  vertex(this.minX, this.maxY, this.minZ);
  vertex(this.minX, this.minY, this.maxZ);
  vertex(this.minX, this.minY, this.maxZ);
  vertex(this.minX, this.maxY, this.minZ);
  vertex(this.minX, this.minY, this.minZ);

  vertex(this.maxX, this.maxY, this.maxZ);
  vertex(this.maxX, this.maxY, this.minZ);
  vertex(this.minX, this.maxY, this.maxZ);
  vertex(this.minX, this.maxY, this.maxZ);
  vertex(this.maxX, this.maxY, this.minZ);
  vertex(this.minX, this.maxY, this.minZ);

  vertex(this.maxX, this.minY, this.maxZ);
  vertex(this.maxX, this.minY, this.minZ);
  vertex(this.minX, this.minY, this.maxZ);
  vertex(this.minX, this.minY, this.maxZ);
  vertex(this.maxX, this.minY, this.minZ);
  vertex(this.minX, this.minY, this.minZ);

  vertex(this.maxX, this.maxY, this.maxZ);
  vertex(this.maxX, this.minY, this.maxZ);
  vertex(this.minX, this.maxY, this.maxZ);
  vertex(this.minX, this.maxY, this.maxZ);
  vertex(this.maxX, this.minY, this.maxZ);
  vertex(this.minX, this.minY, this.maxZ);

  vertex(this.maxX, this.maxY, this.minZ);
  vertex(this.maxX, this.minY, this.minZ);
  vertex(this.minX, this.maxY, this.minZ);
  vertex(this.minX, this.maxY, this.minZ);
  vertex(this.maxX, this.minY, this.minZ);
  vertex(this.minX, this.minY, this.minZ);
  endShape();
};
