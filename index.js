import Renderer from "./Renderer/Renderer.js";
import preloadAssets, { bestShader } from "./preload.js";
import Camera from "./Camera.js";
import { player, scene, Lights, restartGame } from "./sceneSetup.js";
import { loadMap } from "./map.js";
import { cameraControlDebug } from "./Camera.js";
import Vector2 from "./structs/Vector2.js";
import { Lobby } from "./lobby.js";

const FPSElement = document.getElementById("fps-debug");
const CurrentTrophiesElement = document.getElementById("current-trophies");
const TotalTrophiesElement = document.getElementById("total-trophies");
document.getElementById("toggle-debug").addEventListener("click", function () {
  var debugScreen = document.getElementById("debug-screen");
  debugScreen.classList.toggle("show");
});

const renderer = new Renderer();
export let cameraC;
let cam;
export let game = {
  running: true,
  win: false,
  numTrophies: 0,
  currentTrophies: 0,
};

const WIDTH = 800;
const HEIGHT = 450;
const MAP_WIDTH = 400;

const RestartButton = new Vector2(WIDTH / 2, HEIGHT / 2 + 100);

const FOV = 60 * (Math.PI / 180);
export const invFov = 1 / Math.tan(FOV / 2);
export const ZNEAR = 0.3;
export const ZFAR = 210;
export const AspectRatio = WIDTH / HEIGHT;


let canvas;
export let graphics;

async function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas");
  canvas.fill(0);
  var gl = document.getElementById("defaultCanvas0").getContext("webgl");

  graphics = createGraphics(WIDTH, HEIGHT, WEBGL);

  cam = graphics.createCamera();
  cam.perspective(FOV, AspectRatio, ZNEAR, ZFAR);
  cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 1);
  cameraC = new Camera(cam);
  player.setCamera(cameraC);
  await restartGame();
}


function draw() {
  deltaTime /= 1000;

  // clamp deltaTime to prevent weird physics (lower fps = higher deltaTime)
  deltaTime = Math.min(deltaTime, 0.1);
  FPSElement.innerHTML = Math.round(1 / deltaTime);
  CurrentTrophiesElement.innerHTML = game.currentTrophies;
  TotalTrophiesElement.innerHTML = game.numTrophies;

  if (!game.running) {
    background(0);
    if (game.win) {
      textSize(32);
      textAlign(CENTER);
      fill(0, 255, 0);
      text("You win!", width / 2, height / 2);
    } else {
      textSize(32);
      textAlign(CENTER);
      fill(255, 0, 0);
      text("You lose!", width / 2, height / 2);
    }
    ellipse(RestartButton.x, RestartButton.y, 100, 100);
    textAlign(CENTER);
    textSize(20);
    fill(255);
    text("Restart", RestartButton.x, RestartButton.y + 10);

    return;
  }

  // GAME GRAPHICS
  graphics.clear();
  graphics.background(0);
  graphics.shader(bestShader);
  graphics.noStroke();

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

  image(graphics, 0, 0, width, height);

  // GAME UI
}
function mousePressed() {
  if (game.running) return;

  if (
    Math.sqrt(
      Math.pow(mouseX - RestartButton.x, 2) +
        Math.pow(mouseY - RestartButton.y, 2)
    ) < 50
  ) {
    restartGame();
  }
}

function keyPressed() {}

window.preload = preloadAssets;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mousePressed = mousePressed;
