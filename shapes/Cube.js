export default class Cube {
  constructor(center, width) {
    this.position = center;
    this.width = width;
    let halfWidth = width / 2;

    this.vertices = [
      p5.Vector(-halfWidth, -halfWidth, -halfWidth),
      p5.Vector(halfWidth, -halfWidth, -halfWidth),
      p5.Vector(halfWidth, halfWidth, -halfWidth),
      p5.Vector(-halfWidth, halfWidth, -halfWidth),
      p5.Vector(-halfWidth, -halfWidth, halfWidth),
      p5.Vector(halfWidth, -halfWidth, halfWidth),
      p5.Vector(halfWidth, halfWidth, halfWidth),
      p5.Vector(-halfWidth, halfWidth, halfWidth),
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
}
