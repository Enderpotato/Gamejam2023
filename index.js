import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import { createPerspectiveMatrix } from "./testfuncs.js";

const FPSElement = document.getElementById("fps-debug");

let canvas;
// const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
const scene = new Scene([new MeshCube(new Vector3(0, 0, 10), 2)]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);

const HEIGHT = 400;
const WIDTH = 400;

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;

createPerspectiveMatrix();

function setup() {
  canvas = createCanvas(HEIGHT, WIDTH, WEBGL);
  canvas.parent("canvas");
}

function draw() {
  FPSElement.innerHTML = Math.round(frameRate());

  background(0);
  renderer.render(scene);

  if (keyIsDown(32)) {
    scene.update(deltaTime);
  }
}

function keyPressed() {}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
