import Renderer from "./Renderer/Renderer.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import Cube from "./shapes/TestShapes/Cube.js";
import {
  createPerspectiveMatrix,
  flattenArray,
} from "./helperFuncs/testfuncs.js";
import Camera from "./Camera.js";
import Mesh from "./shapes/Mesh.js";
import { cameraControl } from "./Camera.js";
import Map from "./map.js";
import preloadAssets from "./preload.js";
import { bestShader, brickTexture } from "./preload.js";
import { renderShaderCube } from "./Renderer/renderShader.js";

const FPSElement = document.getElementById("fps-debug");

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
export let camera;

let cam;

const WIDTH = 450;
const HEIGHT = 450;
const MAP_WIDTH = 400;
const upDir = new Vector3(0, 1, 0);

export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 1;
export const ZFAR = 1000;
export const AspectRatio = HEIGHT / WIDTH;
var map_ = new Map(50, 40, -WIDTH / 2, -HEIGHT / 2);

export const zBuffer = new Array(WIDTH * HEIGHT).fill(0);

// const perspectiveMat = createPerspectiveMatrix();
// console.log(flattenArray(perspectiveMat));

let canvas;
export let frame;
let gl;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  canvas.parent("canvas");

  cam = createCamera();
  cam.perspective(FOV, AspectRatio, ZNEAR, ZFAR);
  cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 1);
  camera = new Camera(cam);
  console.log(cam);

  noStroke();
}

function draw() {
  FPSElement.innerHTML = Math.round(frameRate());

  background(0);
  clear();

  shader(bestShader);
  cameraControl(deltaTime);
  camera.update(deltaTime);

  // let targetDir = Vector3.add(camera.position, camera.lookDir);
  // camera.calcCameraMatrix(camera.position, targetDir, upDir);

  box(100);
  bestShader.setUniform("millis", millis());
  // bestShader.setUniform("uCameraViewMatrix", flattenArray(camera.matView));
  bestShader.setUniform("uMatcapTexture", brickTexture.image);

  // // clear zBuffer
  // zBuffer.fill(0);

  // renderer.render(scene);
  // renderer.clear();
  // // map_.draw_map();
  // // map_.draw_obj(camera);

  // if (keyIsDown(32)) {
  //   scene.update(deltaTime);
  // }
}

function keyPressed() {
  // l key
  if (keyCode === 76) {
    console.log(zBuffer);
  }
}

window.preload = preloadAssets;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
