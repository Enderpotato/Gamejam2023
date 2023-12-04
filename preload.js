import Texture from "./texture/Texture.js";

export let bestShader;
export let brickTexture = new Texture();
export let sandTexture;
export let whiteTexture;

function loadErrorCallback(err) {
  console.log("error loading image");
}

export default function preloadAssets() {
  brickTexture = loadImage("/assets/textures/bricks.png");
  sandTexture = loadImage("/assets/textures/sand.png");
  whiteTexture = loadImage("/assets/textures/white.png");

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");
}
