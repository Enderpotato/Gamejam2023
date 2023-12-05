import Triangle from "../Triangle.js";
import Vector3 from "../../structs/Vector3.js";
import ShapeMorph from "../ShapeMorph.js";
import { Vector2T } from "../../structs/Vector2.js";

export default class MeshCube {
  constructor(width) {
    // initialize triangles using position and width
    this.meshTriangles = [];
    this.triangles = [];
    this.width = width;

    // use 12 triangles to make a cube
    // triangle consists of 3 vertices in clockwise order
    let halfWidth = width / 2;

    // front face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, -halfWidth),
          new Vector3(halfWidth, -halfWidth, -halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(-halfWidth, halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, -halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // back face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, halfWidth),
          new Vector3(halfWidth, -halfWidth, halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
          new Vector3(-halfWidth, halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // left face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(-halfWidth, halfWidth, halfWidth),
          new Vector3(-halfWidth, halfWidth, -halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(-halfWidth, -halfWidth, halfWidth),
          new Vector3(-halfWidth, halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // right face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
          new Vector3(halfWidth, -halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // top face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, halfWidth, -halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
          new Vector3(halfWidth, halfWidth, -halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, halfWidth, -halfWidth),
          new Vector3(-halfWidth, halfWidth, halfWidth),
          new Vector3(halfWidth, halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // bottom face
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, -halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.meshTriangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth),
          new Vector3(halfWidth, -halfWidth, halfWidth),
          new Vector3(-halfWidth, -halfWidth, halfWidth),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );
  }
}

MeshCube.prototype.update = function (position, quat) {
  this.triangles = this.meshTriangles.map((triangle) => {
    return ShapeMorph.transformToWorld(triangle, quat, position);
  });
}
