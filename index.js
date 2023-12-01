import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import { createPerspectiveMatrix } from "./testfuncs.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";
import { cameraControl } from "./Camera.js";

const FPSElement = document.getElementById("fps-debug");

let keyPressed = {};
let angle;
let player_pos;
let x_angle = 0; //the player can only angle the camera in the x direction

// const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
// const scene = new Scene([new MeshCube(new Vector3(0, 0, 10), 2)]);
let spaceshipMesh = new Mesh(new Vector3(0, 0, 20));
spaceshipMesh.createFromObj("./assets/testObjs/axis.obj");
const scene = new Scene([spaceshipMesh]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);
export const camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 1));

const HEIGHT = 500;
const WIDTH = 500;
const MAP_WIDTH = 400;
const upDir = new Vector3(0, 1, 0);
const targetDir = camera.position.add(camera.lookDir);

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;

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
  camera.calcCameraMatrix(camera.position, targetDir, upDir);

  renderer.render(scene);
  renderer.clear();

  if (keyIsDown(32)) {
    scene.update(deltaTime);
  }

  cameraControl();
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
