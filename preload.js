import TextureBuffer from "./graphics/Texture.js";
import GameObject from "./gameObjects/GameObject.js";
import Vector3 from "./structs/Vector3.js";
import { player, scene, setupMeshes, floorMesh } from "./sceneSetup.js";

export const Textures = new TextureBuffer();
export let bestShader;

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

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");

  setupMeshes();

  const gObject6 = new GameObject(new Vector3(0, 25, 0), floorMesh);
  gObject6.immovable = true;
  scene.addObjects([gObject6, player]);
}
