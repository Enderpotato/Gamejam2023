import Triangle from "../Triangle.js";
import Vector3 from "../../structs/Vector3.js";
import ShapeMorph from "../ShapeMorph.js";
import { Vector2T } from "../../structs/Vector2.js";

export default class MeshCube {
  constructor(position, width) {
    // initialize triangles using position and width
    this.triangles = [];
    this.position = position;

    // use 12 triangles to make a cube
    // triangle consists of 3 vertices in clockwise order
    let halfWidth = width / 2;

    // front face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, -halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, -halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // back face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 0), new Vector2T(1, 1)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // left face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, -halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(-halfWidth, -halfWidth, halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // right face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );

    // top face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, -halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, halfWidth, -halfWidth).add(this.position),
          new Vector3(-halfWidth, halfWidth, halfWidth).add(this.position),
          new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(0, 1), new Vector2T(1, 1)]
      )
    );

    // bottom face
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(1, 0)]
      )
    );
    this.triangles.push(
      new Triangle(
        [
          new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
          new Vector3(halfWidth, -halfWidth, halfWidth).add(this.position),
          new Vector3(-halfWidth, -halfWidth, halfWidth).add(this.position),
        ],
        [new Vector2T(0, 0), new Vector2T(1, 1), new Vector2T(0, 1)]
      )
    );
  }

  update(dt) {
    this.triangles.forEach((triangle) => {
      ShapeMorph.rotateTriangle(
        triangle,
        Quaternion.fromEulerLogical(-0.01, 0.01, 0.01, "XYZ"),
        this.position
      );
    });
  }
}
