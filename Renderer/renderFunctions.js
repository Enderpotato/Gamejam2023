import {
  Matrix_MultiplyVector,
  perspectiveProject,
} from "../helperFuncs/testfuncs.js";
import Renderer from "./Renderer.js";
import { camera } from "../index.js";
import Vector3 from "../structs/Vector3.js";
import { triangleClipAgainstPlane } from "../helperFuncs/clipping.js";
import Triangle from "../shapes/Triangle.js";

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
  // Clip viewed triangle against near plane, this could form two additional triangles.
  let clippedTriangles = 0;
  let clipped = [Triangle.init(), Triangle.init()];
  clippedTriangles = triangleClipAgainstPlane(
    new Vector3(0, 0, 5.2),
    new Vector3(0, 0, 1),
    tri,
    clipped[0],
    clipped[1]
  );

  for (let n = 0; n < clippedTriangles; n++) {
    // Project triangles from 3D --> 2D
    let triProjected = clipped[n].clone();
    triProjected.vertices[0] = perspectiveProject(clipped[n].vertices[0]);
    triProjected.vertices[1] = perspectiveProject(clipped[n].vertices[1]);
    triProjected.vertices[2] = perspectiveProject(clipped[n].vertices[2]);
    triProjected.normal = tri.normal;
    Renderer.trianglesToRaster.push(triProjected);
  }
}

export function rasterTriangle(tri) {
  let clipped = [Triangle.init(), Triangle.init()];
  let triList = [tri];
  let nNewTriangles = 1;

  // Clip each triangle against screen edges. ClipTriangle() may yield
  // a variable number of triangles, so create a queue that we traverse
  // to ensure we process all triangles from original game state this frame
  for (let p = 0; p < 4; p++) {
    let trisToAdd = 0;
    while (nNewTriangles > 0) {
      // Take triangle from front of queue
      let test = triList.shift();
      nNewTriangles--;

      stroke(255, 0, 0);
      strokeWeight(5);
      point(0, -height / 2);

      // *******************************************************************
      // triangleClipAgainstPlane have issues !!! only right plane works properly!!!
      // *******************************************************************

      // Clip it against a plane. We only need to test each
      // subsequent plane, against subsequent new triangles
      // as all triangles after a plane clip are guaranteed
      // to lie on the inside of the plane.
      switch (p) {
        // top plane
        case 0:
          trisToAdd = triangleClipAgainstPlane(
            new Vector3(0, -height / 2, 0),
            new Vector3(0, 1, 0),
            test,
            clipped[0],
            clipped[1]
          );
          break;

        // bottom plane
        case 1:
          trisToAdd = triangleClipAgainstPlane(
            new Vector3(0, height / 2, 0),
            new Vector3(0, -1, 0),
            test,
            clipped[0],
            clipped[1]
          );
          // clipped[0] = test;
          // trisToAdd = 1;
          break;

        // left plane
        case 2:
          trisToAdd = triangleClipAgainstPlane(
            new Vector3(-width / 2, 0, 0),
            new Vector3(1, 0, 0),
            test,
            clipped[0],
            clipped[1]
          );
          // clipped[0] = test;
          // trisToAdd = 1;
          break;

        // right plane
        case 3:
          trisToAdd = triangleClipAgainstPlane(
            new Vector3(width / 2, 0, 0),
            new Vector3(-1, 0, 0),
            test,
            clipped[0],
            clipped[1]
          );
          break;

        default:
          console.log("lol");
          break;
      }

      // Clipping may yield a variable number of triangles, so
      // add these new ones to the back of the queue for subsequent
      // clipping against next planes
      for (let w = 0; w < trisToAdd; w++) {
        triList.push(clipped[w]);
      }
    }
    nNewTriangles = triList.length;
  }

  triList.forEach((tri) => {
    stroke(0);
    strokeWeight(1);
    // noStroke();

    let fillColor = tri.color.toColor();
    fill(fillColor);

    triangle(
      tri.vertices[0].x,
      tri.vertices[0].y,
      tri.vertices[1].x,
      tri.vertices[1].y,
      tri.vertices[2].x,
      tri.vertices[2].y
    );
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
