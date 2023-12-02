import Texture from "./texture/Texture.js";

export const brickTexture = new Texture();

function loadSuccessCallback(img, textureObj) {
  textureObj.image = img;

  //   console.log(textureObj.getPixel(0.5, 0.5));
}

function loadErrorCallback(err) {
  console.log("error loading image");
}

export default function preloadAssets() {
  loadImage(
    "/assets/textures/bricks.png",
    (img) => loadSuccessCallback(img, brickTexture),
    (err) => loadErrorCallback(err)
  );
}
