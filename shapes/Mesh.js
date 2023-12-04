import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor(position) {
    this.triangles = [];
    this.position = position;
  }

  update(dt) {
    let [rotate_x, rotate_y, rotate_z] = [0, 0, 0];
    // i, o, p key for axis rotation
    const speed = 0.002 * dt;
    if (keyIsDown(73)) rotate_x = speed;
    if (keyIsDown(79)) rotate_y = speed;
    if (keyIsDown(80)) rotate_z = speed;
    this.triangles.forEach((triangle) => {
      ShapeMorph.rotateTriangle(
        triangle,
        Quaternion.fromEulerLogical(rotate_x, rotate_y, rotate_z, "XYZ"),
        this.position
      );
    });
  }
}

Mesh.prototype.createFromObj = function (
  filename,
  config = { flipX: 1, flipY: 1, flipZ: 1 }
) {
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
              parseFloat(tokens[1]) * config.flipX,
              parseFloat(tokens[2]) * config.flipY,
              parseFloat(tokens[3]) * config.flipZ
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
