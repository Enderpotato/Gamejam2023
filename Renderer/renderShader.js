import Vector3 from "../structs/Vector3.js";
import Triangle from "../shapes/Triangle.js";
import Cube from "../shapes/TestShapes/Cube.js";
import Mesh from "../shapes/Mesh.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Player from "../Player.js";
import { cameraC } from "../index.js";
import { bestShader } from "../preload.js";
import { Textures } from "../preload.js";
import GameObject from "../GameObject.js";

export default function renderWithShader(scene, frustum, shader) {
  let objectsToRender = [];
  scene.objects.forEach((object) => {
    if (object instanceof Player) return;
    if (object instanceof GameObject) {
      if (objectInFrustum(object, frustum)) objectsToRender.push(object);
    }
  });
  // console.log(objectsToRender.length);

  objectsToRender.forEach((object) => {
    shader.setUniform("uRoughness", object.material.roughness);
    shader.setUniform("uMetallic", object.material.metallic);
    renderMesh(object.mesh);
  });
}
function objectInFrustum(object, frustum) {
  let { nearCorners, farCorners } = frustum;
  let bbox = object.collider.boundingBox;
  return true;

  // Calculate the normals of the frustum planes
  let normals = [
    nearCorners[2]
      .subtract(nearCorners[1])
      .cross(nearCorners[0].subtract(nearCorners[1]))
      .normalize(), // Near plane
    farCorners[2]
      .subtract(farCorners[1])
      .cross(farCorners[0].subtract(farCorners[1]))
      .normalize(), // Far plane
    nearCorners[3]
      .subtract(farCorners[0])
      .cross(nearCorners[0].subtract(farCorners[0]))
      .normalize(), // Left plane
    nearCorners[0]
      .subtract(farCorners[1])
      .cross(nearCorners[1].subtract(farCorners[1]))
      .normalize(), // Right plane
    nearCorners[1]
      .subtract(farCorners[2])
      .cross(nearCorners[2].subtract(farCorners[2]))
      .normalize(), // Bottom plane
    nearCorners[2]
      .subtract(farCorners[3])
      .cross(nearCorners[3].subtract(farCorners[3]))
      .normalize(), // Top plane
  ];

  // Check each corner of the AABB against each plane of the frustum
  let corners = [
    new Vector3(bbox.minX, bbox.minY, bbox.minZ),
    new Vector3(bbox.minX, bbox.minY, bbox.maxZ),
    new Vector3(bbox.minX, bbox.maxY, bbox.minZ),
    new Vector3(bbox.minX, bbox.maxY, bbox.maxZ),
    new Vector3(bbox.maxX, bbox.minY, bbox.minZ),
    new Vector3(bbox.maxX, bbox.minY, bbox.maxZ),
    new Vector3(bbox.maxX, bbox.maxY, bbox.minZ),
    new Vector3(bbox.maxX, bbox.maxY, bbox.maxZ),
  ];

  // Check each plane of the frustum against each corner of the AABB
  for (let normal of normals) {
    let pVertex = new Vector3(
      normal.x >= 0 ? bbox.maxX : bbox.minX,
      normal.y >= 0 ? bbox.maxY : bbox.minY,
      normal.z >= 0 ? bbox.maxZ : bbox.minZ
    );

    if (normal.dot(pVertex) < 0) {
      return false; // The AABB is outside this plane of the frustum
    }
  }

  return true; // At least one corner is inside all planes of the frustum
}
function renderMesh(mesh) {
  let trianglesToRender = [];
  let validTriangles = returnValidTriangles(mesh);
  trianglesToRender = trianglesToRender.concat(validTriangles);

  beginShape(TRIANGLES);
  trianglesToRender.forEach((tri) => {
    shaderRenderTriangle(
      tri,
      mesh.textureImg ? mesh.textureImg : Textures.diamond
    );
  });
  endShape(CLOSE);
}

function returnValidTriangles(mesh) {
  // backface culling
  let validTriangles = [];
  mesh.triangles.forEach((tri) => {
    tri.calcNormal();
    let normal = tri.normal;
    let cameraToTriangle = tri.vertices[0].clone().subtract(cameraC.position);
    let dot = normal.dot(cameraToTriangle);
    if (dot < 0) {
      validTriangles.push(tri);
    }
  });
  // console.log(validTriangles.length);
  return validTriangles;
}

function shaderRenderTriangle(tri, dexter) {
  bestShader.setUniform("uMatcapTexture", dexter);
  tri.calcNormal();
  let norm = tri.normal;
  textureMode(NORMAL);
  texture(dexter);
  normal(norm.x, norm.y, norm.z);
  vertex(
    tri.vertices[0].x,
    tri.vertices[0].y,
    tri.vertices[0].z,
    tri.texture[0].u,
    tri.texture[0].v
  );
  normal(norm.x, norm.y, norm.z);
  vertex(
    tri.vertices[1].x,
    tri.vertices[1].y,
    tri.vertices[1].z,
    tri.texture[1].u,
    tri.texture[1].v
  );
  normal(norm.x, norm.y, norm.z);
  vertex(
    tri.vertices[2].x,
    tri.vertices[2].y,
    tri.vertices[2].z,
    tri.texture[2].u,
    tri.texture[2].v
  );
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
