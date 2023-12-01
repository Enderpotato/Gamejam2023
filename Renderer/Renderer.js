import {
  RenderCube,
  projectTriangle,
  rasterTriangle,
} from "./renderFunctions.js";
import Cube from "../shapes/TestShapes/Cube.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Mesh from "../shapes/Mesh.js";
import { camera } from "../index.js";
import Triangle from "../shapes/Triangle.js";
import { Matrix_MultiplyVector } from "../helperFuncs/testfuncs.js";
import Vector3 from "../structs/Vector3.js";

export default class Renderer {
  constructor() {
    this.trianglesToProject = [];
    this.trianglesToRaster = [];
  }

  render(scene) {
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
      if (object instanceof Mesh) this.loadMesh(object);

      // sort triangles by distance from camera
      this.trianglesToProject.sort((a, b) => {
        // let aDist = a.vertices[0].distance(camera.position);
        // let bDist = b.vertices[0].distance(camera.position);
        // return aDist - aDist;
        let z1 = (a.vertices[0].z + a.vertices[1].z + a.vertices[2].z) / 3;
        let z2 = (b.vertices[0].z + b.vertices[1].z + b.vertices[2].z) / 3;

        return z2 - z1;
      });
      this.trianglesToProject.forEach((tri) => {
        Renderer.projectTriangle(tri, this);
      });

      this.trianglesToRaster.forEach((tri) => {
        Renderer.rasterTriangle(tri);
      });
    });
  }

  clear() {
    this.trianglesToProject = [];
    this.trianglesToRaster = [];
  }
}

Renderer.renderCube = RenderCube;

Renderer.projectTriangle = projectTriangle;

Renderer.rasterTriangle = rasterTriangle;

const LightDir = new Vector3(1, 0, 0).normalize();
Renderer.prototype.loadMesh = function (mesh) {
  mesh.triangles.forEach((tri) => {
    tri.calcNormal();

    // Backface culling
    let cameraToTriangle = tri.vertices[0].subtract(camera.position);
    let dot = cameraToTriangle.dot(tri.normal);
    if (dot > 0) return;
    let triViewed = Triangle.init();
    let lightIntensity = Vector3.dot(tri.normal, LightDir) + 1;
    triViewed.color = tri.color.elementMult(lightIntensity);

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

    triViewed.normal = tri.normal;
    this.trianglesToProject.push(triViewed);
  });
};
