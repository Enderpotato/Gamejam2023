import Mesh from "./shapes/Mesh.js";
import Vector3 from "./structs/Vector3.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import { boxMullerRandom } from "./helperFuncs/testfuncs.js";
import Player from "./gameObjects/Player.js";
import Scene from "./scene.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";

let customMesh1 = Mesh.createFromObj("./assets/testObjs/teapot.obj");

export const Gravity = new Vector3(0, 13, 0);
let steveMesh;
export let ghostMesh;
export let trophyMesh;
export const floorMesh = new MeshCuboid(300, 40, 300);
export const player = new Player(new Vector3(0, 0, 0));
export const scene = new Scene([]);

export function setupMeshes() {
  steveMesh = Mesh.createFromObj("./assets/game3dModels/steve.obj");
  ghostMesh = Mesh.createFromObj("./assets/game3dModels/ghost.obj");
  trophyMesh = Mesh.createFromObj("./assets/game3dModels/trophy.obj");

  steveMesh.setTexture(Textures["steve"]);
  ghostMesh.setTexture(Textures["ghost"]);
  trophyMesh.setTexture(Textures["trophy"]);
  floorMesh.setTexture(Textures["bricks"]);
}

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
