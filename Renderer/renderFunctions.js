import { transformWorldtoScreen, perspectiveProject } from "../testfuncs.js";
import Renderer from "./Renderer.js";

export function RenderCube(cube) {
  let transformedVertices = [];

  cube.vertices.forEach((vertex) => {
    let transformedVertex = perspectiveProject(vertex);
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
  tri.calcNormal();

  drawNormal(tri);

  let transformedVertices = [];
  tri.vertices.forEach((vertex) => {
    let transformedVertex = perspectiveProject(vertex);
    transformedVertices.push(transformedVertex);
  });

  //   stroke(255, 255, 255);
  //   noFill();
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(255, 255, 255);
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

function drawNormal(tri) {
  //draw out the normal
  let normal = tri.normal;

  //get center of triangle
  let center = tri.vertices[0]
    .add(tri.vertices[1])
    .add(tri.vertices[2])
    .elementDiv(3);

  let normalVertex = center.add(normal);

  let transformedNormal = perspectiveProject(normalVertex);
  let transformedCenter = perspectiveProject(center);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(
    transformedCenter.x,
    transformedCenter.y,
    transformedNormal.x,
    transformedNormal.y
  );
}
