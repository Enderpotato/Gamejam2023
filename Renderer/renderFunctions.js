import {
  Matrix_MultiplyVector,
  perspectiveProject,
} from "../helperFuncs/testfuncs.js";
import Renderer from "./Renderer.js";
import { camera } from "../index.js";
import Vector3 from "../structs/Vector3.js";
import { triangleClipAgainstPlane } from "../helperFuncs/clipping.js";
import Triangle from "../shapes/Triangle.js";

const LightDir = new Vector3(1, 0, 0).normalize();

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

export function projectTriangle(tri, Renderer) {
  let triViewed = new Triangle([]);

  // world space -> view space
  triViewed.vertices[0] = Matrix_MultiplyVector(
    camera.matView,
    tri.vertices[0]
  );
  triViewed.vertices[1] = Matrix_MultiplyVector(
    camera.matView,
    tri.vertices[1]
  );
  triViewed.vertices[2] = Matrix_MultiplyVector(
    camera.matView,
    tri.vertices[2]
  );

  // Clip viewed triangle against near plane, this could form two additional triangles.
  // let clippedTriangles = 0;
  // let clipped = [
  //   new Triangle([
  //     new Vector3(0, 0, 0),
  //     new Vector3(0, 0, 0),
  //     new Vector3(0, 0, 0),
  //   ]),
  //   new Triangle([
  //     new Vector3(0, 0, 0),
  //     new Vector3(0, 0, 0),
  //     new Vector3(0, 0, 0),
  //   ]),
  // ];
  // clippedTriangles = triangleClipAgainstPlane(
  //   new Vector3(0, 0, 0.95),
  //   new Vector3(0, 0, 1),
  //   triViewed,
  //   clipped[0],
  //   clipped[1]
  // );

  let triProjected = new Triangle([]);
  // view space -> projection space
  triProjected.vertices[0] = perspectiveProject(triViewed.vertices[0]);
  triProjected.vertices[1] = perspectiveProject(triViewed.vertices[1]);
  triProjected.vertices[2] = perspectiveProject(triViewed.vertices[2]);

  triProjected.normal = tri.normal;
  Renderer.trianglesToRaster.push(triProjected);
}

export function rasterTriangle(tri) {
  stroke(0);
  strokeWeight(1);
  noStroke();
  let lightIntensity = Vector3.dot(tri.normal, LightDir) + 1;
  fill(lightIntensity * 255);

  triangle(
    tri.vertices[0].x,
    tri.vertices[0].y,
    tri.vertices[1].x,
    tri.vertices[1].y,
    tri.vertices[2].x,
    tri.vertices[2].y
  );
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
