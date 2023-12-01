import { transformWorldtoScreen } from "./testfuncs.js";
import Cube from "./shapes/TestShapes/Cube.js";
import Triangle from "./shapes/Triangle.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";

export default class Renderer {
  constructor() {}

  render(scene) {
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
      if (object instanceof MeshCube) Renderer.renderMesh(object);
    });
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

Renderer.renderTriangle = function (tri) {
  let transformedVertices = [];

  tri.vertices.forEach((vertex) => {
    let transformedVertex = transformWorldtoScreen(vertex);
    transformedVertices.push(transformedVertex);
  });

  stroke(255, 255, 255);
  noFill();
  triangle(
    transformedVertices[0].x,
    transformedVertices[0].y,
    transformedVertices[1].x,
    transformedVertices[1].y,
    transformedVertices[2].x,
    transformedVertices[2].y
  );
};

Renderer.renderMesh = function (mesh) {
  mesh.triangles.forEach((tri) => {
    Renderer.renderTriangle(tri);
  });
};
