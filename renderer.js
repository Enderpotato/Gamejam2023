import { transformWorldtoScreen } from "./testfuncs.js";
import Cube from "./shapes/Cube.js";

export default class Renderer {
  constructor() {}

  render(scene) {
    fill(255, 0, 0);
    text("Renderer working!", 100, 50);

    push();
    translate(width / 2, height / 2);
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
    });
    pop();
  }
}

Renderer.renderCube = function (cube) {
  let transformedVertices = [];

  cube.vertices.forEach((vertex) => {
    let transformedVertex = transformWorldtoScreen(vertex);
    transformedVertices.push(transformedVertex);
    fill(255, 255, 255);
    rectMode(CENTER);
    rect(transformedVertex.x, transformedVertex.y, 5, 5);
  });

  cube.edges.forEach((edge) => {
    let transformedVertex1 = transformedVertices[edge[0]];
    let transformedVertex2 = transformedVertices[edge[1]];
    stroke(255, 255, 255);
    strokeWeight(2);
    line(
      transformedVertex1.x,
      transformedVertex1.y,
      transformedVertex2.x,
      transformedVertex2.y
    );
  });
};
