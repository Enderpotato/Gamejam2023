import TextureBuffer from "./graphics/Texture.js";

export const Textures = new TextureBuffer();
export let bestShader;

function loadErrorCallback(err) {
  console.log("error loading image");
}

export default function preloadAssets() {
  Textures.addTexture(loadImage("/assets/textures/bricks.png"), "bricks");
  Textures.addTexture(loadImage("/assets/textures/sand.png"), "sand");
  Textures.addTexture(loadImage("assets/textures/white.png"), "white");
  Textures.addTexture(
    loadImage("assets/textures/diamond_block.png"),
    "diamond"
  );
  Textures.addTexture(loadImage("assets/textures/steve.png"), "steve");
  Textures.addTexture(loadImage("assets/textures/walter.png"), "walter");
  Textures.addTexture(loadImage("assets/textures/trophy.png"), "trophy");

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");
}
