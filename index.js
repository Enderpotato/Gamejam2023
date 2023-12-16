import Renderer from "./Renderer/Renderer.js";
import preloadAssets, {
  bestShader,
  trophyImage,
  darkTrophyImage,
} from "./preload.js";
import Camera, { cameraControlDebug } from "./Camera.js";
import {
  player,
  scene,
  Lights,
  restartGame,
  pointerLock,
} from "./sceneSetup.js";
import Vector2 from "./structs/Vector2.js";

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
export const maps = [
  "./assets/maps/gamejam_map1.csv",
  "./assets/maps/gamejam_map2.csv",
  "./assets/maps/gamejam_map3.csv",
];

export let game = {
  running: false,
  win: false,
  numTrophies: 0,
  currentTrophies: 0,
  map: maps[0],
  timer: 0,
  winMessage: null,
};

const WIDTH = 800;
const HEIGHT = 450;

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
  graphics = createGraphics(WIDTH, HEIGHT, WEBGL);

  cam = graphics.createCamera();
  cam.perspective(FOV, AspectRatio, ZNEAR, ZFAR);
  cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 1);
  cameraC = new Camera(cam);
  player.setCamera(cameraC);
  await restartGame();
  game.running = false;
  game.winMessage = "Trophy Haunt";
}

function draw() {
  deltaTime /= 1000;

  // clamp deltaTime to prevent weird physics (lower fps = higher deltaTime)
  deltaTime = Math.min(deltaTime, 0.1);
  FPSElement.innerHTML = Math.round(1 / deltaTime);
  CurrentTrophiesElement.innerHTML = game.currentTrophies;
  TotalTrophiesElement.innerHTML = game.numTrophies;

  if (!game.running) {
    document.exitPointerLock();
    background(0);
    textSize(32);
    textAlign(CENTER);
    fill(255, 255, 255);
    text("Click anywhere to start", RestartButton.x, RestartButton.y - 50);

    if (game.winMessage != null) {
      textSize(32);
      textAlign(CENTER);
      fill(0, 255, 255);
      text(game.winMessage, width / 2, height / 2);

      return;
    }

    if (game.win) {
      textSize(32);
      textAlign(CENTER);
      fill(0, 255, 0);
      text("You win!", width / 2, height / 4);
      textSize(24);
      textAlign(CENTER);
      fill(255, 255, 0);
      text(
        "Time: " + Math.round(game.timer) + " seconds",
        width / 2,
        height / 2
      );
    } else {
      textSize(32);
      textAlign(CENTER);
      fill(255, 0, 0);
      text("You lose!", width / 2, height / 2);
    }
    return;
  }
  game.timer += deltaTime;

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

  if (player.position.y > 100) {
    game.running = false;
    game.win = false;
    game.winMessage = "Screw u stop testing my physics engine!";

    setTimeout(() => {
      // bro i swear this is not me copilot literally generated this
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 2000);
  }

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

  imageMode(CORNER);
  image(graphics, 0, 0, width, height);

  // GAME UI
  noStroke();
  let trophyX = 10;
  let trophyY = 10;
  let trophyW = 40;
  for (let i = 0; i < game.numTrophies; i++) {
    if (i < game.currentTrophies) {
      image(trophyImage, trophyX, trophyY, trophyW, trophyW);
    } else {
      image(darkTrophyImage, trophyX, trophyY, trophyW, trophyW);
    }
    trophyX += trophyW + 10;
  }

  textSize(20);
  textAlign(LEFT);
  fill(255, 255, 0);
  text("Time: " + Math.round(game.timer), width - 110, 40);
}
async function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  if (game.running) return;
  pointerLock();
  await restartGame();
  game.running = true;
}

function keyPressed() {
  // press q to enable pointer lock
  if (keyCode === 81) {
    pointerLock();
  }
}

window.preload = preloadAssets;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mousePressed = mousePressed;
