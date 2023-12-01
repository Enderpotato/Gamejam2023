import { transformWorldtoScreen } from "../testfuncs.js";
import { RenderCube, renderMesh, renderTriangle } from "./renderFunctions.js";
import Cube from "../shapes/TestShapes/Cube.js";
import Triangle from "../shapes/Triangle.js";
import MeshCube from "../shapes/TestShapes/MeshCube.js";

export default class Renderer {
  constructor() {}

  render(scene) {
    scene.objects.forEach((object) => {
      if (object instanceof Cube) Renderer.renderCube(object);
      if (object instanceof MeshCube) Renderer.renderMesh(object);
    });
  }
}

Renderer.renderCube = RenderCube;

Renderer.renderTriangle = renderTriangle;

Renderer.renderMesh = renderMesh;
