import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import { Vector2T } from "../structs/Vector2.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor(position, textureImg) {
    this.triangles = [];
    this.meshTriangles = [];

    this.position = position;
    this.rotation = new Vector3(0, 0, 0);
    this.textureImg = textureImg || null;
  }

  update(dt) {
    let [rotate_x, rotate_y, rotate_z] = [0, 0, 0];
    // i, o, p key for axis rotation
    const speed = 0.002 * dt;
    if (keyIsDown(73)) rotate_x = speed;
    if (keyIsDown(79)) rotate_y = speed;
    if (keyIsDown(80)) rotate_z = speed;

    this.rotation.add_(new Vector3(rotate_x, rotate_y, rotate_z));

    const quat = Quaternion.fromEulerLogical(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ"
    );
    this.triangles = this.meshTriangles.map((triangle) => {
      return ShapeMorph.transformToWorld(triangle, quat, this.position);
    });
  }
}

Mesh.prototype.setTexture = function (textureImg) {
  this.textureImg = textureImg; // p5.Image
};

Mesh.prototype.createFromObj = function (filename) {
  // fetch file
  fetch(filename)
    .then((response) => response.text())
    .then((data) => {
      let lines = data.split("\n");
      let vertices = [];
      let textures = [];
      let faces = [];
      let useSlashes = false;
      lines.forEach((line) => {
        if (parseLine(line, vertices, faces, textures)) useSlashes = true;
      });
      faces.forEach((face) => {
        let triangle = null;
        if (useSlashes) {
          triangle = new Triangle([
            vertices[face[0][0] - 1],
            vertices[face[1][0] - 1],
            vertices[face[2][0] - 1],
          ]);
          triangle.texture = [
            textures[face[0][1] - 1],
            textures[face[1][1] - 1],
            textures[face[2][1] - 1],
          ];
        } else {
          triangle = new Triangle([
            vertices[face[0][0] - 1],
            vertices[face[1][0] - 1],
            vertices[face[2][0] - 1],
          ]);
        }

        this.meshTriangles.push(triangle);
      });
    });
};

function parseLine(line, vertices, faces, textures) {
  let tokens = line.split(" ");
  if (tokens[0] === "v") {
    vertices.push(
      new Vector3(
        parseFloat(tokens[1]),
        parseFloat(tokens[2]),
        parseFloat(tokens[3])
      )
    );
    return;
  }
  if (tokens[0] === "f") {
    if (tokens[1].includes("/")) {
      faces.push([
        tokens[1].split("/").map((num) => parseInt(num, 10)),
        tokens[2].split("/").map((num) => parseInt(num, 10)),
        tokens[3].split("/").map((num) => parseInt(num, 10)),
      ]);
      return true;
    }
    faces.push([
      [parseInt(tokens[1], 10), 0],
      [parseInt(tokens[2], 10), 0],
      [parseInt(tokens[3], 10), 0],
    ]);
    return;
  }

  if (tokens[0] === "vt") {
    textures.push(new Vector2T(parseFloat(tokens[1]), parseFloat(tokens[2])));
    return;
  }
}
