import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import GameObject from "./gameObjects/GameObject.js";
import Scene from "./Scene.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import Player from "./gameObjects/Player.js";
import Material from "./graphics/Material.js";
import { loadMap, Map2d } from "./map.js";
import Steve from "./gameObjects/Steve.js";
import Ghost from "./gameObjects/Ghost.js";
import { boxMullerRandom } from "./helperFuncs/testfuncs.js";
import Trophy from "./gameObjects/Trophy.js";

let customMesh1 = new Mesh().createFromObj("./assets/testObjs/teapot.obj");
let steveMesh = new Mesh().createFromObj("./assets/game3dModels/steve.obj");
let ghostMesh = new Mesh().createFromObj("./assets/game3dModels/ghost.obj");
let trophyMesh = new Mesh().createFromObj("./assets/game3dModels/trophy.obj");

const trophy = new Trophy(new Vector3(1000, 0, 50), trophyMesh);
trophy.setMaterial(new Material(0, 1, 0.1));
export const steve = new Steve(new Vector3(0, 0, 20), steveMesh);
export const ghost = new Ghost(new Vector3(0, 0, 20), ghostMesh);
export const player = new Player();
steve.scale = new Vector3(3, 3, 3);

const cube2 = new MeshCuboid(300, 40, 300);
const gObject6 = new GameObject(new Vector3(0, 25, 0), cube2);
gObject6.immovable = true;

export const scene = new Scene([gObject6, ghost, trophy, player]);
export const Gravity = new Vector3(0, 13, 0);
loadMap("./assets/maps/map1.csv", scene);

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
  steveMesh.setTexture(Textures["steve"]);
  ghostMesh.setTexture(Textures["ghost"]);
  trophyMesh.setTexture(Textures["trophy"]);
  cube2.setTexture(Textures["bricks"]);
}
