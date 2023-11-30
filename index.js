import Renderer from "./Renderer.js";
import Scene from "./Scene.js";
import Cube from "./shapes/Cube.js";
import Vector3 from "./Vector3.js";

let canvas;
const scene = new Scene([new Cube(new Vector3(0, 0, 0), 2)]);
const renderer = new Renderer();
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas");
}

function draw() {
  background(0);
  renderer.render(scene);
}

function keyPressed() {}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
