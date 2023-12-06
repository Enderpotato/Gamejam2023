import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Vector3 from "./structs/Vector3.js";
import GameObject from "./GameObject.js";
import Scene from "./Scene.js";
import { Textures } from "./preload.js";

let customMesh1 = new Mesh().createFromObj("./assets/testObjs/teapot.obj");
let customMesh2 = new Mesh().createFromObj("./assets/testObjs/bedroom.obj");
let customMesh3 = new Mesh().createFromObj("./assets/testObjs/floor.obj");
let customMesh4 = new Mesh().createFromObj("./assets/testObjs/steve.obj");
let customMesh5 = new Mesh().createFromObj("./assets/testObjs/Videoship.obj");

const gObject1 = new GameObject(new Vector3(0, -200, 30), customMesh1);
const gObject2 = new GameObject(new Vector3(-30, 0, 30), customMesh2);
const gObject3 = new GameObject(new Vector3(0, 10, 20), customMesh3);
gObject3.immovable = true;
const gObject4 = new GameObject(new Vector3(-20, 0, 30), customMesh5);

const cube1 = new MeshCube(10);
const gObject5 = new GameObject(new Vector3(0, -200, 30), cube1);
const cube2 = new MeshCube(10);
const gObject6 = new GameObject(new Vector3(30, -200, 30), cube2);
gObject6.velocity.x = -10;
export const scene = new Scene([gObject5, gObject3, gObject6]);

export function sceneSetTextures() {
  customMesh1.setTexture(Textures["white"]);
  customMesh2.setTexture(Textures["map"]);
  customMesh4.setTexture(Textures["steve"]);
}