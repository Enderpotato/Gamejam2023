import { RenderCube, renderMesh, renderTriangle } from "./renderFunctions.js";
import Cube from "../shapes/TestShapes/Cube.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";
import Mesh from "../shapes/Mesh.js";

export default class Renderer {
  constructor() {}

  render(scene) {
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
      if (object instanceof MeshCube) Renderer.renderMesh(object);
      if (object instanceof Mesh) Renderer.renderMesh(object);
    });
  }

}

Renderer.renderCube = RenderCube;

Renderer.renderTriangle = renderTriangle;

Renderer.renderMesh = renderMesh;
