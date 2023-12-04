import Triangle from "../Triangle.js";
import Vector3 from "../../structs/Vector3.js";
import ShapeMorph from "../ShapeMorph.js";
import { Vector2T } from "../../structs/Vector2.js";

export default class MeshCube {
  constructor(position, width) {
    // initialize triangles using position and width
    this.meshTriangles = [];
    this.triangles = [];
    this.position = position;
    this.rotation = new Vector3(0, 0, 0);

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
