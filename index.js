import Renderer from "./Renderer/Renderer.js";
import preloadAssets, { bestShader } from "./preload.js";
import Camera from "./Camera.js";
import { player, scene } from "./sceneSetup.js";
import { Lights } from "./sceneSetup.js";
import { cameraControlDebug } from "./Camera.js";

const FPSElement = document.getElementById("fps-debug");
const renderer = new Renderer();
export let cameraC;
let cam;
export let game = {running: true, win: false};

const WIDTH = 800;
const HEIGHT = 450;
const MAP_WIDTH = 400;

const FOV = 60 * (Math.PI / 180);
export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 0.3;
export const ZFAR = 210;
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
  player.setCamera(cameraC);
  noStroke();
}

function draw() {
  deltaTime /= 1000;

  // clamp deltaTime to prevent weird physics (lower fps = higher deltaTime)
  deltaTime = Math.min(deltaTime, 0.1);
  FPSElement.innerHTML = Math.round(1 / deltaTime);

  if (!game.running) {
    if (game.win) {
      console.log('you win nigga')
    }
    else {
      console.log('boo hoo nigga')
    }
    return;
  };
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
  let numLights = 0;

  Lights.forEach((light) => {
    light.update(deltaTime);
    if (!light.lit) return;
    numLights++;
    lightPositions.push(...light.getUPosition());
    lightColors.push(...light.getUColor());
  });

  // Clear the light data for unused lights
  for (let i = numLights; i < Lights.length; i++) {
    lightPositions.splice(i * 3, 3, 0, 0, 0);
    lightColors.splice(i * 3, 3, 0, 0, 0);
  }
  bestShader.setUniform("uNumLights", numLights);
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
