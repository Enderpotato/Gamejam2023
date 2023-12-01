import { transformWorldtoScreen } from "../testfuncs.js";
import Renderer from "./Renderer.js";

export function RenderCube(cube) {
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
}

export function renderTriangle(tri) {
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
}

export function renderMesh(mesh) {
  mesh.triangles.forEach((tri) => {
    Renderer.renderTriangle(tri);
  });
}
