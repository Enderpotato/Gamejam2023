import TextureBuffer from "./Texture.js";

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
  Textures.addTexture(loadImage("assets/textures/Map.png"), "map");

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");
}
