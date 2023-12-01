import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import { createPerspectiveMatrix } from "./testfuncs.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";

const FPSElement = document.getElementById("fps-debug");

// const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
// const scene = new Scene([new MeshCube(new Vector3(0, 0, 10), 2)]);
let spaceshipMesh = new Mesh(new Vector3(0, 0, 20));
spaceshipMesh.createFromObj("./assets/VideoShip.obj");
const scene = new Scene([spaceshipMesh]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);
export const camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 1));

const HEIGHT = 400;
const WIDTH = 400;

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;

createPerspectiveMatrix();
let canvas;
export let frame;
let gl;

function setup() {
  canvas = createCanvas(HEIGHT, WIDTH, WEBGL);
  canvas.parent("canvas");

  frame = createGraphics(HEIGHT, WIDTH);
  gl = canvas.GL;
  console.log(gl);
}

function draw() {
  FPSElement.innerHTML = Math.round(frameRate());

  background(0);
  renderer.render(scene);
  renderer.clear();

  if (keyIsDown(32)) {
    scene.update(deltaTime);
  }
}

function keyPressed() {}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
