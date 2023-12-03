import Vector3 from "../structs/Vector3.js";
import Triangle from "../shapes/Triangle.js";
import Cube from "../shapes/TestShapes/Cube.js";
import Mesh from "../shapes/Mesh.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import { camera } from "../index.js";
import { brickTexture } from "../preload.js";

export default function renderWithShader(scene, renderer) {
  let trianglesToRender = [];
  scene.objects.forEach((object) => {
    if (object instanceof Cube) console.log("cube");
    if (object instanceof Mesh || object instanceof MeshCube) {
      let validTriangles = returnValidTriangles(object);
      trianglesToRender = trianglesToRender.concat(validTriangles);
    }
  });

  //   console.log(trianglesToRender.length);
  trianglesToRender.forEach((tri) => {
    shaderRenderTriangle(tri, brickTexture);
  });
}

function returnValidTriangles(mesh) {
  //   return mesh.triangles;
  // backface culling
  let validTriangles = [];
  mesh.triangles.forEach((tri) => {
    tri.calcNormal();
    let normal = tri.normal;
    let cameraToTriangle = tri.vertices[0].clone().subtract(camera.position);
    let dot = normal.dot(cameraToTriangle);
    if (dot < 0) {
      validTriangles.push(tri);
    }
  });
  return validTriangles;
}

function shaderRenderTriangle(tri, dexter) {
  //   stroke(0);
  //   strokeWeight(1);
  texture(dexter);
  beginShape(TRIANGLES);
  vertex(
    tri.vertices[0].x,
    tri.vertices[0].y,
    tri.vertices[0].z,
    tri.texture[0].u,
    tri.texture[1].v
  );
  vertex(
    tri.vertices[1].x,
    tri.vertices[1].y,
    tri.vertices[1].z,
    tri.texture[1].u,
    tri.texture[1].v
  );
  vertex(
    tri.vertices[2].x,
    tri.vertices[2].y,
    tri.vertices[2].z,
    tri.texture[2].u,
    tri.texture[2].v
  );
  endShape(CLOSE);
}

export function renderShaderCube(width) {
  let halfWidth = width * 0.5;
  let vertices = [
    new Vector3(-halfWidth, -halfWidth, halfWidth),
    new Vector3(halfWidth, -halfWidth, halfWidth),
    new Vector3(halfWidth, halfWidth, halfWidth),
    new Vector3(-halfWidth, halfWidth, halfWidth),
    new Vector3(-halfWidth, -halfWidth, -halfWidth),
    new Vector3(halfWidth, -halfWidth, -halfWidth),
    new Vector3(halfWidth, halfWidth, -halfWidth),
    new Vector3(-halfWidth, halfWidth, -halfWidth),
  ];

  let triangles = [
    //front
    new Triangle([vertices[0], vertices[1], vertices[2]]),
    new Triangle([vertices[0], vertices[2], vertices[3]]),
    //right
    new Triangle([vertices[1], vertices[5], vertices[6]]),
    new Triangle([vertices[1], vertices[6], vertices[2]]),
    //back
    new Triangle([vertices[7], vertices[6], vertices[5]]),
    new Triangle([vertices[7], vertices[5], vertices[4]]),
    //left
    new Triangle([vertices[4], vertices[0], vertices[3]]),
    new Triangle([vertices[4], vertices[3], vertices[7]]),
    //top
    new Triangle([vertices[3], vertices[2], vertices[6]]),
    new Triangle([vertices[3], vertices[6], vertices[7]]),
    //bottom
    new Triangle([vertices[4], vertices[5], vertices[1]]),
    new Triangle([vertices[4], vertices[1], vertices[0]]),
  ];
  //   console.log(triangles);

  stroke(0);
  triangles.forEach((tri) => {
    beginShape();
    vertex(tri.vertices[0].x, tri.vertices[0].y, tri.vertices[0].z);
    vertex(tri.vertices[1].x, tri.vertices[1].y, tri.vertices[1].z);
    vertex(tri.vertices[2].x, tri.vertices[2].y, tri.vertices[2].z);
    endShape(CLOSE);
  });
}
