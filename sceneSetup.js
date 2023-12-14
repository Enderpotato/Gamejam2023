import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import GameObject from "./gameObjects/GameObject.js";
import Scene from "./Scene.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import { player } from "./preload.js";
import { boxMullerRandom } from "./helperFuncs/testfuncs.js";

let customMesh1 = Mesh.createFromObj("./assets/testObjs/teapot.obj");

// export const ghost = new Ghost(new Vector3(0, 0, 20), ghostMesh);
export const Gravity = new Vector3(0, 13, 0);

export default function sceneSetup() {}

let timeSinceLastFlash = 0;
let flashDuration = 2; // duration of flash in seconds
let timeBetweenFlashes = 5; // time between flashes in seconds

const lightFollow = new Light(null, new Vector3(1, 0, 0));
lightFollow.lit = false;
lightFollow.update = function (dt) {
  this.position = player.position;

  timeSinceLastFlash += dt;
  this.lit = false;
  if (timeSinceLastFlash > timeBetweenFlashes + flashDuration) {
    this.lit = false;
    timeSinceLastFlash = 0;
    flashDuration = boxMullerRandom() * 0.5 + 2; // ~ N(2, 0.5)
    timeBetweenFlashes = boxMullerRandom() * 3 + 10; // ~ N(10, 3)
  }
  if (timeSinceLastFlash > timeBetweenFlashes && !this.lit) {
    this.lit = true;
  }

  this.color = new Vector3(1, 1, 1); // uncomment to have white light
  this.lit = true; // uncomment to always have light on
};
export const Lights = [lightFollow];

export function sceneSetTextures() {
  customMesh1.setTexture(Textures["white"]);
}
