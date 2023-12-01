import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import { createPerspectiveMatrix } from "./testfuncs.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";

const FPSElement = document.getElementById("fps-debug");

let canvas;
let keyPressed = {};
let angle;
let player_pos;
let x_angle = 0; //the player can only angle the camera in the x direction

// const scene = new Scene([new Cube(new Vector3(0, 0, 5), 1.5)]);
// const scene = new Scene([new MeshCube(new Vector3(0, 0, 10), 2)]);
let spaceshipMesh = new Mesh(new Vector3(0, 0, 20));
spaceshipMesh.createFromObj("./assets/VideoShip.obj");
console.log(spaceshipMesh);
const scene = new Scene([spaceshipMesh]);
const renderer = new Renderer();
const FOV = 60 * (Math.PI / 180);
export const camera = new Camera(new Vector3(0, 0, 0), new Vector3(0, 0, 1));

const HEIGHT = 400;
const WIDTH = 400;
const MAP_WIDTH = 400

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;

createPerspectiveMatrix();

function setup() {
  canvas = createCanvas(WIDTH + MAP_WIDTH, HEIGHT, WEBGL);
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

document.addEventListener('keypress', function(event){
  keyPressed[event.key] = true;
  if (keyPressed['w']){
    camera.position.z += 10.;
  } 
  else if (keyPressed['s']){
    camera.position.z -= 10.;
  } 
  if (keyPressed['a']){
    camera.position.x += 10.;
  } 
  if (keyPressed['d']){
    camera.position.x -= 10.;
  } 
})
document.addEventListener('keyup', function(event){
  keyPressed[event] = false;
})

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
