import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import { Vector2T } from "../structs/Vector2.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor(textureImg) {
    this.triangles = [];
    this.meshTriangles = [];
    this.textureImg = textureImg || null;
  }
}

Mesh.prototype.clone = function () {
  let mesh = new Mesh(this.textureImg);
  mesh.meshTriangles = this.meshTriangles.map((triangle) => {
    return triangle.clone();
  });
  return mesh;
};

Mesh.prototype.update = function (position, quat, scale) {
  this.triangles = this.meshTriangles.map((triangle) => {
    return ShapeMorph.transformToWorld(triangle, quat, position, scale);
  });
};

Mesh.prototype.setTexture = function (textureImg) {
  this.textureImg = textureImg; // p5.Image
};

Mesh.createFromObj = function (filename) {
  let mesh = new Mesh();
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
        let triangle = new Triangle([
          vertices[face[0][0] - 1],
          vertices[face[1][0] - 1],
          vertices[face[2][0] - 1],
        ]);
        if (useSlashes) {
          triangle.texture = [
            textures[face[0][1] - 1],
            textures[face[1][1] - 1],
            textures[face[2][1] - 1],
          ];
        }
        mesh.meshTriangles.push(triangle);
      });
    });
  return mesh;
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
    textures.push(
      new Vector2T(parseFloat(tokens[1]), 1 - parseFloat(tokens[2]))
    );
    return;
  }
}
