import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor() {
    this.triangles = [];
  }

  update(dt) {
    let position = new Vector3(0, 0, 8);
    this.triangles.forEach((triangle) => {
      ShapeMorph.rotateTriangle(
        triangle,
        Quaternion.fromEulerLogical(0.01, 0.01, 0.01, "XYZ"),
        position
      );
    });
  }
}

Mesh.prototype.createFromObj = function (filename) {};
