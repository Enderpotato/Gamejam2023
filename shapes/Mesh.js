import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor(position) {
    this.triangles = [];
    this.position = position;
  }

  update(dt) {
    this.triangles.forEach((triangle) => {
      ShapeMorph.rotateTriangle(
        triangle,
        Quaternion.fromEulerLogical(0.01, 0.01, 0.01, "XYZ"),
        this.position
      );
    });
  }
}

Mesh.prototype.createFromObj = function (filename, config = { flipY: 1 }) {
  // fetch file
  fetch(filename)
    .then((response) => response.text())
    .then((data) => {
      let lines = data.split("\n");
      let vertices = [];
      let faces = [];
      lines.forEach((line) => {
        let tokens = line.split(" ");
        if (tokens[0] === "v") {
          vertices.push(
            new Vector3(
              parseFloat(tokens[1]),
              parseFloat(tokens[2]) * config.flipY,
              parseFloat(tokens[3])
            )
          );
        } else if (tokens[0] === "f") {
          faces.push([
            parseInt(tokens[1]),
            parseInt(tokens[2]),
            parseInt(tokens[3]),
          ]);
        }
      });
      faces.forEach((face) => {
        let triangle = new Triangle([
          vertices[face[0] - 1],
          vertices[face[1] - 1],
          vertices[face[2] - 1],
        ]);

        // add position to triangle
        triangle.vertices = triangle.vertices.map((vertex) => {
          return vertex.add(this.position);
        });
        this.triangles.push(triangle);
      });
    });
};
