import Renderer from "./Renderer.js";
import Scene from "./Scene.js";
import Cube from "./shapes/Cube.js";
import Vector3 from "./structs/Vector3.js";

let canvas;
const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);
export const NEAR = 1 / Math.tan(FOV / 2);

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas");
}

function draw() {
  background(0);
  scene.update(deltaTime);
  renderer.render(scene);
}

function keyPressed() {}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
