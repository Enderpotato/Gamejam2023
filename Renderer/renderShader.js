import Vector3 from "../structs/Vector3.js";
import Triangle from "../shapes/Triangle.js";
import Player from "../gameObjects/Player.js";
import { cameraC } from "../index.js";
import { bestShader } from "../preload.js";
import { Textures } from "../preload.js";
import GameObject from "../gameObjects/GameObject.js";

const NumObjectsElement = document.getElementById("objects-rendering");

export default function renderWithShader(scene, frustum, shader) {
  let objectsToRender = [];
  scene.objects.forEach((object) => {
    if (object instanceof Player) return;
    if (object instanceof GameObject) {
      // objectsToRender.push(object);
      // return;
      if (objectInFrustum(object, frustum)) {
        objectsToRender.push(object);
      }
    }
  });
  scene.walls.forEach((object) => {
    if (object instanceof Player) return;
    if (object instanceof GameObject) {
      if (objectInFrustum(object, frustum)) {
        objectsToRender.push(object);
      }
    }
  });
  NumObjectsElement.innerText = objectsToRender.length;

  objectsToRender.forEach((object) => {
    shader.setUniform("uRoughness", object.material.roughness);
    shader.setUniform("uMetallic", object.material.metallic);
    renderMesh(object.mesh);
  });
}
function objectInFrustum(object, frustum) {
  let bbox = object.collider.boundingBox;

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

  let margin = 0.1;
  for (let plane of Object.values(frustum)) {
    let behind = 0;
    for (let corner of corners) {
      let pointToCorner = Vector3.subtract(corner, plane.point).normalize();
      if (Vector3.dot(plane.normal, pointToCorner) > margin) {
        behind++;
      }
    }
    if (behind === 8) {
      return false; // The AABB is completely outside this plane
    }
  }
  return true;
}
function renderMesh(mesh) {
  let trianglesToRender = [];
  let validTriangles = returnValidTriangles(mesh);
  trianglesToRender = trianglesToRender.concat(validTriangles);

  beginShape(TRIANGLES);
  trianglesToRender.forEach((tri) => {
    shaderRenderTriangle(
      tri,
      mesh.textureImg ? mesh.textureImg : Textures.white
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
