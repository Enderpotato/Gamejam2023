import { Matrix_MultiplyVector } from "../helperFuncs/testfuncs.js";

export default function renderWithShader(scene, renderer) {
  scene.objects.forEach((object) => {
    if (object instanceof Cube) console.log("cube");
    if (object instanceof Mesh || object instanceof MeshCube)
      shaderRenderMesh(object);
  });
}

function shaderRenderMesh(mesh) {
  mesh.triangles.forEach((tri) => {
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

export function renderShaderCube(width, viewMatrix) {
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

  let transformedVertices = [];
  vertices.forEach((vert) => {
    transformedVertices.push(Matrix_MultiplyVector(viewMatrix, vert));
  });

  beginShape();
  vertex(...transformedVertices[0].toArray());
  endShape();
}
