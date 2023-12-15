import TextureBuffer from "./graphics/Texture.js";
import { setupMeshes } from "./sceneSetup.js";

export const Textures = new TextureBuffer();
export let bestShader;
let trophyImage, darkTrophyImage, replayImg;

export { trophyImage, darkTrophyImage, replayImg };

function loadTextures() {
  Textures.addTexture(loadImage("/assets/textures/bricks.png"), "bricks");
  Textures.addTexture(loadImage("/assets/textures/sand.png"), "sand");
  Textures.addTexture(loadImage("assets/textures/white.png"), "white");
  Textures.addTexture(
    loadImage("assets/textures/diamond_block.png"),
    "diamond"
  );
  Textures.addTexture(loadImage("assets/textures/Steve.png"), "steve");
  Textures.addTexture(loadImage("assets/textures/ghost.png"), "ghost");
  Textures.addTexture(loadImage("assets/textures/walter.png"), "walter");
  Textures.addTexture(loadImage("assets/textures/trophy.png"), "trophy");
}

export default function preloadAssets() {
  loadTextures();
  trophyImage = loadImage("assets/imgs/trophy.png");
  darkTrophyImage = loadImage("assets/imgs/trophy_dark.png");
  replayImg = loadImage("assets/imgs/replay.png");

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");

  setupMeshes();
}
