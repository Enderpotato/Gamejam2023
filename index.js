import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";
import { cameraControl } from "./Camera.js";
import Map from "./map.js";
import preloadAssets, { Textures } from "./preload.js";
import { bestShader } from "./preload.js";
import GameObject from "./GameObject.js";
import Player from "./Player.js";

const FPSElement = document.getElementById("fps-debug");

let angle;
let player_pos;
let x_angle = 0; //the player can only angle the camera in the x direction

let customMesh1 = new Mesh().createFromObj("./assets/testObjs/teapot.obj");
let customMesh2 = new Mesh().createFromObj("./assets/testObjs/bedroom.obj");
let customMesh3 = new Mesh().createFromObj("./assets/testObjs/floor.obj");
let customMesh4 = new Mesh().createFromObj("./assets/testObjs/steve.obj");
let customMesh5 = new Mesh().createFromObj("./assets/testObjs/Videoship.obj");

const gObject1 = new GameObject(new Vector3(-30, 0, 30), customMesh1);
const gObject2 = new GameObject(new Vector3(-30, 0, 30), customMesh2);
const gObject3 = new GameObject(new Vector3(0, 10, 20), customMesh3);
gObject3.immovable = true;
const gObject4 = new GameObject(new Vector3(-20, 0, 30), customMesh5);

const cube1 = new MeshCube(10);
const gObject5 = new GameObject(new Vector3(0, -200, 30), cube1);
const cube2 = new MeshCube(10);
const gObject6 = new GameObject(new Vector3(30, -200, 30), cube2);
gObject6.velocity.x = -10;
const scene = new Scene([gObject5, gObject3, gObject6]);
// const scene = new Scene([gObject4]);
// const scene = new Scene([gObject5, gObject2]);
const renderer = new Renderer();
export let camera;
let player;

let cam;

const WIDTH = 600;
const HEIGHT = 450;
const MAP_WIDTH = 400;

const FOV = 60 * (Math.PI / 180);
export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;
var map_ = new Map(50, 40, -WIDTH / 2, -HEIGHT / 2);

export const zBuffer = new Array(WIDTH * HEIGHT).fill(0);

let canvas;
export let frame;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  canvas.parent("canvas");

  cam = createCamera();
  cam.perspective(FOV, AspectRatio, ZNEAR, ZFAR);
  cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 1);
  camera = new Camera(cam);
  customMesh1.setTexture(Textures["white"]);
  customMesh2.setTexture(Textures["map"]);
  customMesh4.setTexture(Textures["steve"]);

  player = new Player(camera);
  // scene.addObject(player);
  noStroke();
}

function draw() {
  FPSElement.innerHTML = Math.round(frameRate());

  background(0);
  clear();
  shader(bestShader);
  deltaTime /= 1000;

  cameraControl(deltaTime);
  camera.update(deltaTime);
  scene.update(deltaTime);

  renderer.render(scene, true);
  renderer.clear();
  noStroke();

  bestShader.setUniform("millis", millis());
  bestShader.setUniform("uAspectRatio", WIDTH / HEIGHT);
  bestShader.setUniform("uCameraPosition", camera.position.toArray());
}

function keyPressed() {
  if (keyCode === 32) {
    gObject5.velocity = new Vector3(0, 100, 0);
  }
}

window.preload = preloadAssets;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
