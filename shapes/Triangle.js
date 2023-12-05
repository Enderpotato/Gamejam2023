import Vector3 from "../structs/Vector3.js";
import { Vector2T } from "../structs/Vector2.js";

export default class Triangle {
  constructor(vertices, texture = null) {
    this.vertices = vertices; // array of Vector3
    this.normal = null; // Vector3

    // for texture mapping, type Vector2T[3]
    this.texture =
      texture !== null
        ? texture
        : [new Vector2T(0, 0), new Vector2T(0, 0), new Vector2T(0, 0)];
    this.color = new Vector3(0, 255, 255);
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
  this.normal = Vector3.cross(v1, v2).normalize();
};

Triangle.prototype.textureClone = function () {
  let texture = [];
  this.texture.forEach((t) => {
    texture.push(t.clone());
  });
  return texture;
};

Triangle.prototype.clone = function () {
  let vertices = [];
  this.vertices.forEach((v) => {
    vertices.push(v.clone());
  });
  let tri = new Triangle(vertices);
  tri.normal = tri.normal ? this.normal.clone() : 0;
  tri.color = this.color.clone();
  tri.texture = this.textureClone();
  return tri;
};
