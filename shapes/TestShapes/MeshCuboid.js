import Vector3 from "../../structs/Vector3.js";
import Triangle from "../Triangle.js";
import { Vector2T } from "../../structs/Vector2.js";
import ShapeMorph from "../ShapeMorph.js";

export default class MeshCuboid {
  constructor(width, length, height) {
    this.w = width;
    this.l = length;
    this.h = height;
    this.textureImg = null;

    // initialize triangles using position and width
    this.meshTriangles = [];
    this.triangles = [];

    let half_width = width / 2;
    let half_length = length / 2;
    let half_height = height / 2;

    // front face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(half_width, half_length, -half_height),
          new Vector3(half_width, -half_length, -half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(-half_width, half_length, -half_height),
          new Vector3(half_width, half_length, -half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // back face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, half_height),
          new Vector3(half_width, -half_length, half_height),
          new Vector3(half_width, half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, half_height),
          new Vector3(half_width, half_length, half_height),
          new Vector3(-half_width, half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // left face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(-half_width, -half_length, half_height),
          new Vector3(-half_width, half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(-half_width, half_length, half_height),
          new Vector3(-half_width, half_length, -half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // right face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(half_width, -half_length, -half_height),
          new Vector3(half_width, half_length, half_height),
          new Vector3(half_width, -half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(half_width, -half_length, -half_height),
          new Vector3(half_width, half_length, -half_height),
          new Vector3(half_width, half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // top face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, half_length, -half_height),
          new Vector3(half_width, half_length, half_height),
          new Vector3(half_width, half_length, -half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, half_length, -half_height),
          new Vector3(-half_width, half_length, half_height),
          new Vector3(half_width, half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // bottom face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(half_width, -half_length, -half_height),
          new Vector3(half_width, -half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-half_width, -half_length, -half_height),
          new Vector3(half_width, -half_length, half_height),
          new Vector3(-half_width, -half_length, half_height),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    this.meshTriangles.forEach((triangle) => {
      this.triangles.push(triangle);
    });
  }
}

MeshCuboid.prototype.update = function (position, quat, scale) {
  this.triangles = this.meshTriangles.map((triangle) => {
    return ShapeMorph.transformToWorld(triangle, quat, position, scale);
  });
};

MeshCuboid.prototype.setTexture = function (textureImg) {
  this.textureImg = textureImg; // p5.Image
};
