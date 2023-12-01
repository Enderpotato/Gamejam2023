import Triangle from "../Triangle.js";
import Vector3 from "../../structs/Vector3.js";
import ShapeMorph from "../ShapeMorph.js";

export default class MeshCube {
  constructor(position, width) {
    // initialize triangles using position and width
    this.triangles = [];
    this.position = position;

    // use 12 triangles to make a cube
    let halfWidth = width / 2;
    // front
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(position),
      ])
    );
    // back
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    // left
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(position),
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(position),
      ])
    );
    // right
    this.triangles.push(
      new Triangle([
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(position),
      ])
    );
    // top
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, halfWidth, halfWidth).add(position),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(position),
      ])
    );
    // bottom
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(position),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(position),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(position),
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(position),
      ])
    );
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
