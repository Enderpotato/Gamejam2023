import Vector3 from "../../structs/Vector3.js";
import ShapeMorph from "../ShapeMorph.js";

export default class Cube {
  constructor(center, width) {
    this.position = center; //Vector3
    this.width = width; //float
    let halfWidth = width / 2;

    this.vertices = [
      new Vector3(-halfWidth, -halfWidth, -halfWidth).add(this.position),
      new Vector3(halfWidth, -halfWidth, -halfWidth).add(this.position),
      new Vector3(halfWidth, halfWidth, -halfWidth).add(this.position),
      new Vector3(-halfWidth, halfWidth, -halfWidth).add(this.position),
      new Vector3(-halfWidth, -halfWidth, halfWidth).add(this.position),
      new Vector3(halfWidth, -halfWidth, halfWidth).add(this.position),
      new Vector3(halfWidth, halfWidth, halfWidth).add(this.position),
      new Vector3(-halfWidth, halfWidth, halfWidth).add(this.position),
    ];

    this.edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
  }

  update(dt) {
    let q = Quaternion.fromEulerLogical(-0.1, 0, 0.01, "XYZ");
    ShapeMorph.rotate(this, q);
  }
}
