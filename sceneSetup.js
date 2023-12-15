import Mesh from "./shapes/Mesh.js";
import Vector3 from "./structs/Vector3.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import { boxMullerRandom } from "./helperFuncs/testfuncs.js";
import { game, maps } from "./index.js";
import Player, { rotationSpeed } from "./gameObjects/Player.js";
import Scene from "./scene.js";
import { loadMap } from "./map.js";
import GameObject from "./gameObjects/GameObject.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";

// Select all the radio buttons in the group
const radioButtons = document.getElementsByName("map");

export function getMapIndex() {
  let selectedValue;

  // Check each radio button to see if it's checked
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  if (!selectedValue) return 0;

  return parseInt(selectedValue) - 1;
}

// ------------ MESHES ----------------
let steveMesh;
export let ghostMesh;
export let trophyMesh;
export const floorMesh = new MeshCuboid(300, 40, 300);
export function setupMeshes() {
  steveMesh = Mesh.createFromObj("./assets/game3dModels/steve.obj");
  ghostMesh = Mesh.createFromObj("./assets/game3dModels/ghost.obj");
  trophyMesh = Mesh.createFromObj("./assets/game3dModels/trophy.obj");

  steveMesh.setTexture(Textures["steve"]);
  ghostMesh.setTexture(Textures["ghost"]);
  trophyMesh.setTexture(Textures["trophy"]);
  floorMesh.setTexture(Textures["floor"]);
}

export function pointerLock() {
  const element = document.body;
  element.requestPointerLock =
    element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;
  element.requestPointerLock();
}

export async function restartGame() {
  player.reset();
  scene.clear();
  const gObject6 = new GameObject(new Vector3(0, 25, 0), floorMesh);
  gObject6.immovable = true;
  scene.addObjects([gObject6, player]);
  game.numTrophies = 0;
  game.map = maps[getMapIndex()];
  await loadMap(game.map, scene);
  game.currentTrophies = 0;
  game.running = true;
  game.win = false;
  game.winMessage = null;
}

export const player = new Player(new Vector3(0, 0, 0));

document.addEventListener("mousemove", (e) => {
  const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
  const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

  const epsilon = 1;
  let moveX = movementX;
  let moveY = movementY;
  if (Math.abs(movementX) <= epsilon) moveX = 0;
  if (Math.abs(movementY) <= epsilon) moveY = 0;

  player.yawAngle -= moveX * rotationSpeed;
  player.pitchAngle -= moveY * rotationSpeed;
});

export const scene = new Scene([]);

export const Gravity = new Vector3(0, 13, 0);

// ------------ LIGHTS ----------------
let timeSinceLastFlash = 0;
let flashDuration = 2; // duration of flash in seconds
let timeBetweenFlashes = 5; // time between flashes in seconds

const lightFollow = new Light(null, new Vector3(1, 0, 0));
const lightFollow2 = new Light(null, new Vector3(0.2, 0.2, 0.2));
lightFollow.lit = false;
lightFollow.update = function (dt) {
  this.position = player.position;

  timeSinceLastFlash += dt;
  this.lit = false;
  if (timeSinceLastFlash > timeBetweenFlashes + flashDuration) {
    this.lit = false;
    timeSinceLastFlash = 0;
    flashDuration = boxMullerRandom() * 1 + 2.5; // ~ N(2.5, 1)
    timeBetweenFlashes = boxMullerRandom() * 5 + 6; // ~ N(6, 5)
  }
  if (timeSinceLastFlash > timeBetweenFlashes && !this.lit) {
    this.lit = true;
  }

  // this.color = new Vector3(1, 1, 1); // uncomment to have white light
  // this.lit = true; // uncomment to always have light on
};

lightFollow2.update = function (dt) {
  this.position = player.position;
};

export const Lights = [lightFollow, lightFollow2];
