import { RenderCube, renderTriangle } from "./renderFunctions.js";
import Cube from "../shapes/TestShapes/Cube.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Mesh from "../shapes/Mesh.js";
import { camera } from "../index.js";

export default class Renderer {
  constructor() {
    this.trianglesToRender = [];
  }

  render(scene) {
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
      if (object instanceof Mesh) this.loadMesh(object);

      // sort triangles by distance from camera
      this.trianglesToRender.sort((a, b) => {
        let aDist = a.vertices[0].distance(camera.position);
        let bDist = b.vertices[0].distance(camera.position);
        return bDist - aDist;
      });

      push();
      translate(-width / 4, 0);
      this.trianglesToRender.forEach((tri) => {
        Renderer.renderTriangle(tri);
      });
      pop();
    });
  }

  clear() {
    this.trianglesToRender = [];
  }
}

Renderer.renderCube = RenderCube;

Renderer.renderTriangle = renderTriangle;

Renderer.prototype.loadMesh = function (mesh) {
  mesh.triangles.forEach((tri) => {
    tri.calcNormal();

    // Backface culling
    let cameraToTriangle = tri.vertices[0].subtract(camera.position);
    let dot = cameraToTriangle.dot(tri.normal);
    if (dot > 0) return;
    this.trianglesToRender.push(tri);
  });
};
