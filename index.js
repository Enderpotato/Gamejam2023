import Renderer from "./Renderer/Renderer.js";
import Camera from "./Camera.js";
import { cameraControlDebug } from "./Camera.js";
import preloadAssets from "./preload.js";
import { bestShader } from "./preload.js";
import { scene, sceneSetTextures, Lights, player } from "./sceneSetup.js";

const FPSElement = document.getElementById("fps-debug");
const renderer = new Renderer();
export let cameraC;
let cam;

const WIDTH = 800;
const HEIGHT = 450;
const MAP_WIDTH = 400;

const FOV = 60 * (Math.PI / 180);
export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 0.1;
export const ZFAR = 1000;
export const AspectRatio = WIDTH / HEIGHT;
let canvas;
export let frame;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  canvas.parent("canvas");

  cam = createCamera();
  cam.perspective(FOV, AspectRatio, ZNEAR, ZFAR);
  cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 1);
  cameraC = new Camera(cam);
  sceneSetTextures();

  player.setCamera(cameraC);
  scene.addObject(player);
  noStroke();
}

function draw() {
  deltaTime /= 1000;
  deltaTime = Math.min(deltaTime, 1 / 30);
  FPSElement.innerHTML = Math.round(1 / deltaTime);
  background(0);
  clear();
  shader(bestShader);
  noStroke();

  // cameraControlDebug(deltaTime, cameraC);
  player.update(deltaTime);
  cameraC.update(deltaTime);
  scene.update(deltaTime);
  let frustum = cameraC.calcFrustum(FOV, AspectRatio, ZNEAR, ZFAR);

  bestShader.setUniform("uAspectRatio", WIDTH / HEIGHT);
  bestShader.setUniform("uCameraPosition", cameraC.position.toArray());
  bestShader.setUniform("uNumLights", Lights.length);

  let lightPositions = [];
  let lightColors = [];

  Lights.forEach((light) => {
    light.update(deltaTime);
    lightPositions.push(...light.getUPosition());
    lightColors.push(...light.getUColor());
  });
  bestShader.setUniform("uNumLights", Lights.length);
  bestShader.setUniform("uLightPosition", lightPositions);
  bestShader.setUniform("uLightColor", lightColors);

  renderer.render(scene, frustum, bestShader);
  renderer.clear();

  resetShader();
  // draw shit with normal functions
  scene.objects.forEach((gObj) => {
    // gObj.collider.boundingBox.draw();
  });
}

function keyPressed() {
  if (keyCode === 32) frameRate(1);
}

window.preload = preloadAssets;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
