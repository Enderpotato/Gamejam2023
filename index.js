import Renderer from "./renderer.js";

let canvas;
const renderer = new Renderer();
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas");
}

function draw() {
  background(0);
  renderer.render();
}

function keyPressed() {}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
