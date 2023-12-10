import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import GameObject from "./GameObject.js";
import Scene from "./Scene.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import Player from "./Player.js";
import Material from "./graphics/Material.js";
import { loadMap, Map2d } from "./map.js";
import Steve from "./Steve.js";

let customMesh1 = new Mesh().createFromObj("./assets/testObjs/teapot.obj");
let customMesh2 = new Mesh().createFromObj("./assets/testObjs/bedroom.obj");
let customMesh3 = new Mesh().createFromObj("./assets/testObjs/floor.obj");
let steveMesh = new Mesh().createFromObj("./assets/testObjs/steve.obj");
let customMesh5 = new Mesh().createFromObj("./assets/testObjs/Videoship.obj");

const gObject1 = new GameObject(new Vector3(0, -200, 30), customMesh1);
const gObject2 = new GameObject(new Vector3(-30, 0, 30), customMesh2);
export const steve = new Steve(new Vector3(0, 0, 20), steveMesh);
export const player = new Player();
steve.scale = new Vector3(3, 3, 3);
const gObject4 = new GameObject(new Vector3(-30, -200, 30), customMesh5);
gObject4.velocity.x = 8;

const cube1 = new MeshCuboid(10, 10, 20);
const gObject5 = new GameObject(new Vector3(30, -200, 30), cube1);
gObject5.velocity.x = -8;
const cube2 = new MeshCuboid(300, 40, 320);
const gObject6 = new GameObject(new Vector3(0, 25, 20), cube2);
gObject6.immovable = true;
const cube3 = new MeshCuboid(10, 10, 20);
const gObject7 = new GameObject(new Vector3(10, -230, 30), cube3);

export const scene = new Scene([gObject6, steve]);
export const Gravity = new Vector3(0, 10, 0);
loadMap("./assets/maps/map1.csv").then((sceneArray) => {
  scene.addObjects(sceneArray);
});

gObject7.setMaterial(new Material(0.0, 1.0, 0.6));

export { gObject1, gObject2, gObject4, gObject5, gObject6 };

const lightFollow = new Light();
lightFollow.update = function (dt) {
  this.position = player.position;
};
export const Lights = [lightFollow];

export function sceneSetTextures() {
  customMesh1.setTexture(Textures["white"]);
  customMesh2.setTexture(Textures["map"]);
  steveMesh.setTexture(Textures["steve"]);
  cube1.setTexture(Textures["sand"]);
  cube2.setTexture(Textures["bricks"]);
}
