import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import { createPerspectiveMatrix } from "./helperFuncs/testfuncs.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";
import { cameraControl } from "./Camera.js";
import Map from "./map.js";

const FPSElement = document.getElementById("fps-debug");

let keyPressed = {};
let angle;
let player_pos;
let x_angle = 0; //the player can only angle the camera in the x direction

let customMesh = new Mesh(new Vector3(0, 0, 30));
customMesh.createFromObj("./assets/testObjs/teapot.obj", { flipY: 1 });
// const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
const scene = new Scene([new MeshCube(new Vector3(0, 0, 20), 10)]);
// const scene = new Scene([customMesh]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);
export const camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 1));

const WIDTH = 700;
const HEIGHT = 450;
const MAP_WIDTH = 400;
const upDir = new Vector3(0, 1, 0);

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;
var map_ = new Map(50, 40, -WIDTH / 2, -HEIGHT / 2);

createPerspectiveMatrix();
let canvas;
export let frame;
let gl;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  canvas.parent("canvas");

  frame = createGraphics(WIDTH, HEIGHT);
  gl = canvas.GL;
  console.log(gl);
}

function draw() {
  FPSElement.innerHTML = Math.round(frameRate());

  background(0);
  camera.update(deltaTime);
  let targetDir = Vector3.add(camera.position, camera.lookDir);
  camera.calcCameraMatrix(camera.position, targetDir, upDir);

  renderer.render(scene);
  renderer.clear();
  map_.draw_map();
  map_.draw_obj(camera);

  if (keyIsDown(32)) {
    scene.update(deltaTime);
  }
  cameraControl(deltaTime);
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
