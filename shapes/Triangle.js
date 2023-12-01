import Vector3 from "../structs/Vector3.js";

export default class Triangle {
  constructor(vertices) {
    this.vertices = vertices; // array of Vector3
    this.normal = null; // Vector3

    this.color = new Vector3(255, 255, 255);
  }
}

Triangle.init = function () {
  return new Triangle([
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
  ]);
};

// since triangle is on a plane as it's 2D, we can calc the normal using the cross product
// of two vectors on the plane
Triangle.prototype.calcNormal = function () {
  // vertices are in clockwise order
  let v1 = this.vertices[1].subtract(this.vertices[0]);
  let v2 = this.vertices[2].subtract(this.vertices[0]);
  this.normal = v1.cross(v2).normalize();
};

Triangle.prototype.clone = function () {
  let vertices = [];
  this.vertices.forEach((v) => {
    vertices.push(v.clone());
  });
  let tri = new Triangle(vertices);
  if (this.normal != null) tri.normal = this.normal.clone();
  tri.color = this.color.clone();
  return tri;
};
