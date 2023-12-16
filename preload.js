import TextureBuffer from "./graphics/Texture.js";
import { setupMeshes } from "./sceneSetup.js";

export const Textures = new TextureBuffer();
export let bestShader;
let trophyImage, darkTrophyImage;

export { trophyImage, darkTrophyImage };

function loadTextures() {
  Textures.addTexture(loadImage("assets/textures/bricks.png"), "bricks");
  Textures.addTexture(loadImage("assets/textures/metal_wall.png"), "wall");
  Textures.addTexture(loadImage("assets/textures/white.png"), "white");
  Textures.addTexture(loadImage("assets/textures/Steve.png"), "steve");
  Textures.addTexture(loadImage("assets/textures/ghost.png"), "ghost");
  Textures.addTexture(loadImage("assets/textures/walter.png"), "walter");
  Textures.addTexture(loadImage("assets/textures/trophy.png"), "trophy");
  Textures.addTexture(loadImage("assets/textures/wood_floor.png"), "floor");
  Textures.addTexture(loadImage("assets/textures/josh.png"), "josh");
}

export default function preloadAssets() {
  loadTextures();
  trophyImage = loadImage("assets/imgs/trophy.png");
  darkTrophyImage = loadImage("assets/imgs/trophy_dark.png");

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");

  setupMeshes();
}
