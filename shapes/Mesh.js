import Triangle from "./Triangle.js";
import Vector3 from "../structs/Vector3.js";
import ShapeMorph from "./ShapeMorph.js";

export default class Mesh {
  constructor(center, width) {
    // initialize triangles using center and width
    this.triangles = [];

    // use 12 triangles to make a cube
    let halfWidth = width / 2;
    // front
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(center),
      ])
    );
    // back
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    // left
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(center),
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(center),
      ])
    );
    // right
    this.triangles.push(
      new Triangle([
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(center),
      ])
    );
    // top
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, halfWidth, halfWidth).add(center),
        new Vector3(-halfWidth, halfWidth, halfWidth).add(center),
      ])
    );
    // bottom
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(center),
      ])
    );
    this.triangles.push(
      new Triangle([
        new Vector3(-halfWidth, -halfWidth, -halfWidth).add(center),
        new Vector3(halfWidth, -halfWidth, halfWidth).add(center),
        new Vector3(-halfWidth, -halfWidth, halfWidth).add(center),
      ])
    );
  }

  update(dt) {}
}
